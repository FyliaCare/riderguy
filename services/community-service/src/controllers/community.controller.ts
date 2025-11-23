import { Request, Response, NextFunction } from 'express';
import { CommunityService } from '../services/community.service';
import { ApiError } from '../utils/api-error';

export class CommunityController {
  private communityService: CommunityService;

  constructor() {
    this.communityService = new CommunityService();
  }

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { channelId, content, images } = req.body;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const post = await this.communityService.createPost(riderId, channelId, content, images);

      res.status(201).json({
        success: true,
        data: post,
        message: 'Post created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { channelId, riderId, limit, offset } = req.query;

      const posts = await this.communityService.getPosts({
        channelId: channelId as string,
        riderId: riderId as string,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined
      });

      res.json({ success: true, data: posts });
    } catch (error) {
      next(error);
    }
  };

  getPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const post = await this.communityService.getPost(postId);

      if (!post) {
        throw new ApiError(404, 'Post not found');
      }

      res.json({ success: true, data: post });
    } catch (error) {
      next(error);
    }
  };

  likePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const result = await this.communityService.likePost(postId, riderId);

      res.json({
        success: true,
        data: result,
        message: result.liked ? 'Post liked' : 'Post unliked'
      });
    } catch (error) {
      next(error);
    }
  };

  addComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const { content } = req.body;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      const comment = await this.communityService.addComment(postId, riderId, content);

      res.status(201).json({
        success: true,
        data: comment,
        message: 'Comment added successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  getComments = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const { limit, offset } = req.query;

      const comments = await this.communityService.getComments(
        postId,
        limit ? Number(limit) : undefined,
        offset ? Number(offset) : undefined
      );

      res.json({ success: true, data: comments });
    } catch (error) {
      next(error);
    }
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { postId } = req.params;
      const riderId = req.user?.riderId;

      if (!riderId) {
        throw new ApiError(401, 'Authentication required');
      }

      await this.communityService.deletePost(postId, riderId);

      res.json({
        success: true,
        message: 'Post deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  getChannels = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const channels = await this.communityService.getChannels();
      res.json({ success: true, data: channels });
    } catch (error) {
      next(error);
    }
  };
}
