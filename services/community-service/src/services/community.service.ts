import { Pool } from 'pg';
import { MongoClient, Db } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { CommunityPost } from '@riderguy/shared-types';
import { ApiError } from '../utils/api-error';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

let mongoDb: Db;
const mongoClient = new MongoClient(process.env.MONGODB_URL || 'mongodb://localhost:27017/riderguy');

mongoClient.connect().then(client => {
  mongoDb = client.db('riderguy');
  console.log('Connected to MongoDB');
});

export class CommunityService {
  async createPost(riderId: string, channelId: string, content: string, images?: string[]) {
    const postId = uuidv4();

    const result = await pool.query(
      `INSERT INTO community_posts (post_id, rider_id, channel_id, content, images, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING *`,
      [postId, riderId, channelId, content, JSON.stringify(images || [])]
    );

    // Also store in MongoDB for flexible querying
    if (mongoDb) {
      await mongoDb.collection('posts').insertOne({
        postId,
        riderId,
        channelId,
        content,
        images: images || [],
        likes: 0,
        comments: 0,
        createdAt: new Date()
      });
    }

    return result.rows[0];
  }

  async getPosts(filters: { channelId?: string; riderId?: string; limit?: number; offset?: number }) {
    const { channelId, riderId, limit = 50, offset = 0 } = filters;

    let query = `
      SELECT cp.*, r.full_name as author_name, r.profile_picture_url as author_avatar,
             (SELECT COUNT(*) FROM post_likes WHERE post_id = cp.post_id) as likes_count,
             (SELECT COUNT(*) FROM post_comments WHERE post_id = cp.post_id) as comments_count
      FROM community_posts cp
      JOIN riders r ON cp.rider_id = r.rider_id
      WHERE 1=1
    `;

    const values: any[] = [];
    let paramCount = 1;

    if (channelId) {
      query += ` AND cp.channel_id = $${paramCount++}`;
      values.push(channelId);
    }

    if (riderId) {
      query += ` AND cp.rider_id = $${paramCount++}`;
      values.push(riderId);
    }

    query += ` ORDER BY cp.created_at DESC LIMIT $${paramCount++} OFFSET $${paramCount}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    return result.rows;
  }

  async getPost(postId: string) {
    const result = await pool.query(
      `SELECT cp.*, r.full_name as author_name, r.profile_picture_url as author_avatar,
              (SELECT COUNT(*) FROM post_likes WHERE post_id = cp.post_id) as likes_count,
              (SELECT COUNT(*) FROM post_comments WHERE post_id = cp.post_id) as comments_count
       FROM community_posts cp
       JOIN riders r ON cp.rider_id = r.rider_id
       WHERE cp.post_id = $1`,
      [postId]
    );

    return result.rows[0] || null;
  }

  async likePost(postId: string, riderId: string) {
    // Toggle like
    const existing = await pool.query(
      'SELECT * FROM post_likes WHERE post_id = $1 AND rider_id = $2',
      [postId, riderId]
    );

    if (existing.rows.length > 0) {
      // Unlike
      await pool.query(
        'DELETE FROM post_likes WHERE post_id = $1 AND rider_id = $2',
        [postId, riderId]
      );
      return { liked: false };
    } else {
      // Like
      await pool.query(
        'INSERT INTO post_likes (post_id, rider_id, created_at) VALUES ($1, $2, NOW())',
        [postId, riderId]
      );
      return { liked: true };
    }
  }

  async addComment(postId: string, riderId: string, content: string) {
    const commentId = uuidv4();

    const result = await pool.query(
      `INSERT INTO post_comments (comment_id, post_id, rider_id, content, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [commentId, postId, riderId, content]
    );

    return result.rows[0];
  }

  async getComments(postId: string, limit = 50, offset = 0) {
    const result = await pool.query(
      `SELECT pc.*, r.full_name as author_name, r.profile_picture_url as author_avatar
       FROM post_comments pc
       JOIN riders r ON pc.rider_id = r.rider_id
       WHERE pc.post_id = $1
       ORDER BY pc.created_at DESC
       LIMIT $2 OFFSET $3`,
      [postId, limit, offset]
    );

    return result.rows;
  }

  async deletePost(postId: string, riderId: string) {
    const result = await pool.query(
      'DELETE FROM community_posts WHERE post_id = $1 AND rider_id = $2 RETURNING *',
      [postId, riderId]
    );

    if (result.rows.length === 0) {
      throw new ApiError(404, 'Post not found or unauthorized');
    }

    // Delete from MongoDB
    if (mongoDb) {
      await mongoDb.collection('posts').deleteOne({ postId });
    }

    return result.rows[0];
  }

  async getChannels() {
    const result = await pool.query(
      `SELECT c.*, 
              (SELECT COUNT(*) FROM community_posts WHERE channel_id = c.channel_id) as post_count
       FROM community_channels c
       ORDER BY c.order_index`
    );

    return result.rows;
  }
}
