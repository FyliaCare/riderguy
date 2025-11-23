'use client';

import { SEOHead } from '@/components/seo-head';
import { useState } from 'react';
import {
  Users,
  MessageSquare,
  Trophy,
  TrendingUp,
  Heart,
  Share2,
  Send,
  Search,
  Filter,
  MoreVertical,
  ThumbsUp,
  MessageCircle,
  Award,
  Star,
  MapPin,
  Calendar,
  UserPlus,
  Bell,
  Zap,
  Crown,
  Medal,
  Target,
  Smile,
  Image as ImageIcon,
  AtSign,
} from 'lucide-react';
import Image from 'next/image';

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState<'feed' | 'chat' | 'leaderboard' | 'groups'>('feed');
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [postContent, setPostContent] = useState('');

  // Mock data
  const posts = [
    {
      id: 1,
      author: {
        name: 'Kwame Mensah',
        avatar: '/avatars/kwame.jpg',
        level: 12,
        badge: 'Pro Rider',
        location: 'Accra',
      },
      content: 'Just completed my 1000th delivery! 🎉 Thank you to all the amazing customers and fellow riders who made this journey incredible. Here\'s to the next milestone!',
      image: null,
      timestamp: '2 hours ago',
      likes: 145,
      comments: 23,
      shares: 8,
      isLiked: false,
      tags: ['milestone', 'achievement'],
    },
    {
      id: 2,
      author: {
        name: 'Ama Frimpong',
        avatar: '/avatars/ama.jpg',
        level: 8,
        badge: 'Rising Star',
        location: 'Kumasi',
      },
      content: 'Pro tip for new riders: Always confirm the delivery address before leaving the pickup point. Saved me so much time today! 📍',
      image: null,
      timestamp: '4 hours ago',
      likes: 89,
      comments: 15,
      shares: 12,
      isLiked: true,
      tags: ['tips', 'advice'],
    },
    {
      id: 3,
      author: {
        name: 'Yaw Boateng',
        avatar: '/avatars/yaw.jpg',
        level: 15,
        badge: 'Elite Rider',
        location: 'Takoradi',
      },
      content: 'Beautiful sunset during today\'s last delivery. This is why I love this job! 🌅',
      image: '/posts/sunset.jpg',
      timestamp: '6 hours ago',
      likes: 234,
      comments: 31,
      shares: 5,
      isLiked: false,
      tags: ['lifestyle', 'motivation'],
    },
  ];

  const chats = [
    {
      id: 'group-accra',
      name: 'Accra Riders Hub',
      type: 'group',
      avatar: null,
      lastMessage: 'Yaw: Anyone near Osu right now?',
      timestamp: '5 mins ago',
      unread: 3,
      members: 248,
      online: 45,
    },
    {
      id: 'user-kwame',
      name: 'Kwame Mensah',
      type: 'direct',
      avatar: '/avatars/kwame.jpg',
      lastMessage: 'Thanks for the advice bro!',
      timestamp: '15 mins ago',
      unread: 1,
      online: true,
    },
    {
      id: 'group-pro-riders',
      name: 'Pro Riders Elite',
      type: 'group',
      avatar: null,
      lastMessage: 'Ama: Check out the new training module',
      timestamp: '1 hour ago',
      unread: 0,
      members: 89,
      online: 12,
    },
    {
      id: 'user-ama',
      name: 'Ama Frimpong',
      type: 'direct',
      avatar: '/avatars/ama.jpg',
      lastMessage: 'See you at the meetup!',
      timestamp: '2 hours ago',
      unread: 0,
      online: false,
    },
  ];

  const chatMessages = [
    {
      id: 1,
      sender: 'Kwame Mensah',
      avatar: '/avatars/kwame.jpg',
      content: 'Hey everyone! Traffic is heavy on Oxford Street right now',
      timestamp: '10:45 AM',
      isOwn: false,
    },
    {
      id: 2,
      sender: 'You',
      avatar: '/avatars/you.jpg',
      content: 'Thanks for the heads up! Taking Ring Road instead',
      timestamp: '10:46 AM',
      isOwn: true,
    },
    {
      id: 3,
      sender: 'Yaw Boateng',
      avatar: '/avatars/yaw.jpg',
      content: 'Good call! Ring Road is clear',
      timestamp: '10:47 AM',
      isOwn: false,
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      name: 'Kwame Mensah',
      avatar: '/avatars/kwame.jpg',
      level: 12,
      deliveries: 1247,
      rating: 4.9,
      earnings: 12450,
      badge: 'Legend',
      trend: 'up',
    },
    {
      rank: 2,
      name: 'Ama Frimpong',
      avatar: '/avatars/ama.jpg',
      level: 11,
      deliveries: 1189,
      rating: 4.9,
      earnings: 11890,
      badge: 'Elite',
      trend: 'up',
    },
    {
      rank: 3,
      name: 'Yaw Boateng',
      avatar: '/avatars/yaw.jpg',
      level: 15,
      deliveries: 1156,
      rating: 4.8,
      earnings: 11560,
      badge: 'Elite',
      trend: 'same',
    },
    {
      rank: 4,
      name: 'Kofi Asante',
      avatar: '/avatars/kofi.jpg',
      level: 9,
      deliveries: 987,
      rating: 4.8,
      earnings: 9870,
      badge: 'Pro',
      trend: 'down',
    },
    {
      rank: 5,
      name: 'Abena Osei',
      avatar: '/avatars/abena.jpg',
      level: 10,
      deliveries: 945,
      rating: 4.7,
      earnings: 9450,
      badge: 'Pro',
      trend: 'up',
    },
  ];

  const groups = [
    {
      id: 1,
      name: 'Accra Riders Hub',
      members: 248,
      category: 'Regional',
      description: 'Connect with riders in the Greater Accra Region',
      icon: '🏙️',
      isJoined: true,
    },
    {
      id: 2,
      name: 'Pro Riders Elite',
      members: 89,
      category: 'Exclusive',
      description: 'For riders with 500+ deliveries and 4.8+ rating',
      icon: '👑',
      isJoined: true,
    },
    {
      id: 3,
      name: 'New Riders Support',
      members: 456,
      category: 'Support',
      description: 'Help and guidance for new riders',
      icon: '🌱',
      isJoined: false,
    },
    {
      id: 4,
      name: 'Night Shift Warriors',
      members: 134,
      category: 'Interest',
      description: 'For riders who prefer night deliveries',
      icon: '🌙',
      isJoined: false,
    },
  ];

  const achievements = [
    { name: '1000 Deliveries', icon: Trophy, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { name: '5-Star Master', icon: Star, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { name: 'Speed Demon', icon: Zap, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { name: 'Top 10 Rider', icon: Crown, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  return (
    <>
      <SEOHead
        title="Community"
        description="Connect with fellow riders, share experiences, and engage with the community"
        keywords={['community', 'social', 'riders', 'network', 'connect']}
        canonicalPath="/dashboard/community"
      />
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Community</h1>
          <p className="text-gray-600 mt-1">Connect with fellow riders across Ghana</p>
        </div>

        <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl">
          <UserPlus className="w-5 h-5" />
          Invite Riders
        </button>
      </div>

      {/* Community Highlights Banner */}
      <div className="bg-gradient-to-br from-green-500 via-green-600 to-cyan-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-6 h-6" />
            <h2 className="text-2xl font-black">Community Pulse</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black">2,847</p>
                <p className="text-sm opacity-90">Active Riders</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                <MessageSquare className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black">456</p>
                <p className="text-sm opacity-90">Online Now</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                <Trophy className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black">12</p>
                <p className="text-sm opacity-90">Active Groups</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                <Heart className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black">5.2K</p>
                <p className="text-sm opacity-90">Posts Today</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'feed'
                ? 'bg-green-50 text-green-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Feed</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-6 py-3 rounded-xl font-medium transition-all relative ${
              activeTab === 'chat'
                ? 'bg-green-50 text-green-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageCircle className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Chat</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-green-50 text-green-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Trophy className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Leaderboard</span>
          </button>
          <button
            onClick={() => setActiveTab('groups')}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'groups'
                ? 'bg-green-50 text-green-600 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Groups</span>
          </button>
        </div>
      </div>

      {/* Feed Tab */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                  R
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Share your experience, tips, or milestones..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl resize-none focus:ring-2 focus:ring-green-500 transition-colors"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ImageIcon className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Smile className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <AtSign className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                    <button className="px-6 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors">
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                      {post.author.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{post.author.name}</h3>
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          {post.author.badge}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Level {post.author.level}</span>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span>{post.author.location}</span>
                        <span>•</span>
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Post Content */}
                <p className="text-gray-900 mb-4 leading-relaxed">{post.content}</p>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <img src={post.image} alt="Post" className="w-full h-auto" />
                  </div>
                )}

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                  <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      post.isLiked
                        ? 'bg-green-50 text-green-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <ThumbsUp className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                    <span className="font-medium">{post.likes}</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="font-medium">{post.comments}</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="font-medium">{post.shares}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Riders */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top Riders This Week</h2>
              <div className="space-y-4">
                {leaderboard.slice(0, 5).map((rider) => (
                  <div key={rider.rank} className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                        {rider.name[0]}
                      </div>
                      {rider.rank <= 3 && (
                        <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                          rider.rank === 1 ? 'bg-yellow-400' : rider.rank === 2 ? 'bg-gray-300' : 'bg-orange-400'
                        }`}>
                          <span className="text-xs font-bold text-white">{rider.rank}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 truncate">{rider.name}</p>
                      <p className="text-xs text-gray-500">{rider.deliveries} deliveries</p>
                    </div>
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                ))}
              </div>
            </div>

            {/* Your Achievements */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Achievements</h2>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div key={achievement.name} className={`${achievement.bgColor} rounded-xl p-4 text-center`}>
                    <achievement.icon className={`w-8 h-8 ${achievement.color} mx-auto mb-2`} />
                    <p className="text-xs font-semibold text-gray-700">{achievement.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Groups */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Suggested Groups</h2>
              <div className="space-y-3">
                {groups.slice(2, 4).map((group) => (
                  <div key={group.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl">{group.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{group.name}</h3>
                        <p className="text-xs text-gray-600">{group.members} members</p>
                      </div>
                    </div>
                    <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors text-sm">
                      Join Group
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Tab */}
      {activeTab === 'chat' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-20rem)]">
          {/* Chat List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-0 rounded-xl text-sm focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id ? 'bg-green-50' : ''
                  }`}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                      {chat.type === 'group' ? <Users className="w-6 h-6" /> : chat.name[0]}
                    </div>
                    {chat.type === 'direct' && chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                      {chat.unread > 0 && (
                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                      <span>{chat.timestamp}</span>
                      {chat.type === 'group' && (
                        <>
                          <span>•</span>
                          <span>{chat.online} online</span>
                        </>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Accra Riders Hub</h3>
                      <p className="text-sm text-gray-500">248 members • 45 online</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex gap-3 ${msg.isOwn ? 'flex-row-reverse' : ''}`}
                    >
                      {!msg.isOwn && (
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {msg.sender[0]}
                        </div>
                      )}
                      <div className={`flex flex-col ${msg.isOwn ? 'items-end' : ''}`}>
                        {!msg.isOwn && (
                          <span className="text-xs font-semibold text-gray-700 mb-1">
                            {msg.sender}
                          </span>
                        )}
                        <div
                          className={`px-4 py-2 rounded-2xl max-w-md ${
                            msg.isOwn
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p>{msg.content}</p>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{msg.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors">
                      <Smile className="w-5 h-5 text-gray-600" />
                    </button>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 px-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500"
                    />
                    <button className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-semibold">Select a chat to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Leaderboard Tab */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          {/* Filter */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex gap-3">
              <button className="px-6 py-2 bg-green-50 text-green-600 rounded-xl font-medium">
                This Week
              </button>
              <button className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                This Month
              </button>
              <button className="px-6 py-2 text-gray-600 hover:bg-gray-50 rounded-xl font-medium">
                All Time
              </button>
            </div>
          </div>

          {/* Top 3 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leaderboard.slice(0, 3).map((rider, index) => (
              <div
                key={rider.rank}
                className={`bg-gradient-to-br ${
                  index === 0
                    ? 'from-yellow-400 to-yellow-500'
                    : index === 1
                    ? 'from-gray-300 to-gray-400'
                    : 'from-orange-400 to-orange-500'
                } rounded-2xl p-6 text-white text-center`}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  {index === 0 ? (
                    <Crown className="w-10 h-10" />
                  ) : index === 1 ? (
                    <Medal className="w-10 h-10" />
                  ) : (
                    <Award className="w-10 h-10" />
                  )}
                </div>
                <h3 className="text-2xl font-black mb-2">{rider.name}</h3>
                <p className="text-sm opacity-90 mb-4">Level {rider.level} • {rider.badge}</p>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-3xl font-black mb-1">{rider.deliveries}</p>
                  <p className="text-sm opacity-90">Deliveries</p>
                </div>
              </div>
            ))}
          </div>

          {/* Full Leaderboard */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rider</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Level</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Deliveries</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Earnings</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((rider) => (
                  <tr key={rider.rank} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-gray-900">#{rider.rank}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                          {rider.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{rider.name}</p>
                          <span className="text-xs text-gray-500">{rider.badge}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{rider.level}</td>
                    <td className="px-6 py-4 text-gray-900 font-medium">{rider.deliveries}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium text-gray-900">{rider.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900 font-semibold">
                      GH₵{rider.earnings.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {rider.trend === 'up' ? (
                        <TrendingUp className="w-5 h-5 text-green-500" />
                      ) : rider.trend === 'down' ? (
                        <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Groups Tab */}
      {activeTab === 'groups' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search groups..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Groups Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {groups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-3xl">
                      {group.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.category}</p>
                    </div>
                  </div>
                  {group.isJoined && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Joined
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4">{group.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{group.members} members</span>
                  </div>
                  <button
                    className={`px-6 py-2 rounded-xl font-semibold transition-colors ${
                      group.isJoined
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {group.isJoined ? 'View Group' : 'Join Group'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
