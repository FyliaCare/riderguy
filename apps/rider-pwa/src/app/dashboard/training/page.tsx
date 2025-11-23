'use client';

import { SEOHead } from '@/components/seo-head';
import { useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  Award,
  Play,
  CheckCircle2,
  Lock,
  Clock,
  Users,
  Star,
  TrendingUp,
  Target,
  Video,
  FileText,
  Headphones,
  ChevronRight,
  Download,
  Share2,
  Calendar,
  Trophy,
  Zap,
  BarChart3,
  Brain,
  Shield,
  MessageSquare,
  ThumbsUp,
  AlertCircle,
  Search,
  Filter,
} from 'lucide-react';

export default function TrainingPage() {
  const [selectedTab, setSelectedTab] = useState<'courses' | 'certifications' | 'progress' | 'library'>('courses');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Training stats
  const trainingStats = {
    coursesCompleted: 12,
    totalCourses: 24,
    certificationsEarned: 5,
    hoursSpent: 38.5,
    currentStreak: 7,
    skillLevel: 'Advanced',
    completionRate: 87,
  };

  // Course categories
  const categories = [
    { id: 'all', name: 'All Courses', count: 24 },
    { id: 'safety', name: 'Safety', count: 6, icon: Shield },
    { id: 'skills', name: 'Riding Skills', count: 8, icon: Target },
    { id: 'service', name: 'Customer Service', count: 5, icon: MessageSquare },
    { id: 'tech', name: 'Technology', count: 5, icon: Brain },
  ];

  // Courses data
  const courses = [
    {
      id: 1,
      title: 'Advanced Road Safety',
      category: 'safety',
      level: 'Advanced',
      duration: '3h 45m',
      modules: 12,
      progress: 75,
      rating: 4.8,
      reviews: 342,
      instructor: 'John Mensah',
      thumbnail: '🛡️',
      enrolled: 1240,
      xp: 300,
      certification: true,
      status: 'in-progress',
      description: 'Master advanced safety techniques and defensive riding strategies',
      topics: ['Defensive Riding', 'Weather Conditions', 'Emergency Response', 'Traffic Navigation'],
      nextLesson: 'Module 9: Night Riding Safety',
    },
    {
      id: 2,
      title: 'Customer Service Excellence',
      category: 'service',
      level: 'Intermediate',
      duration: '2h 30m',
      modules: 8,
      progress: 100,
      rating: 4.9,
      reviews: 567,
      instructor: 'Ama Osei',
      thumbnail: '⭐',
      enrolled: 2100,
      xp: 250,
      certification: true,
      status: 'completed',
      description: 'Deliver exceptional service and build customer relationships',
      topics: ['Communication', 'Conflict Resolution', 'Cultural Sensitivity', 'Professionalism'],
      completedDate: '2024-11-15',
    },
    {
      id: 3,
      title: 'Efficient Route Planning',
      category: 'skills',
      level: 'Intermediate',
      duration: '1h 45m',
      modules: 6,
      progress: 0,
      rating: 4.7,
      reviews: 289,
      instructor: 'Kwame Boateng',
      thumbnail: '🗺️',
      enrolled: 980,
      xp: 200,
      certification: false,
      status: 'not-started',
      description: 'Optimize delivery routes and maximize efficiency',
      topics: ['GPS Navigation', 'Traffic Patterns', 'Time Management', 'Fuel Efficiency'],
    },
    {
      id: 4,
      title: 'Mobile App Mastery',
      category: 'tech',
      level: 'Beginner',
      duration: '1h 15m',
      modules: 5,
      progress: 100,
      rating: 4.6,
      reviews: 721,
      instructor: 'Abena Darko',
      thumbnail: '📱',
      enrolled: 3200,
      xp: 150,
      certification: false,
      status: 'completed',
      description: 'Master all features of the RiderGuy app',
      topics: ['Order Management', 'Navigation', 'Earnings', 'Support Features'],
      completedDate: '2024-10-28',
    },
    {
      id: 5,
      title: 'First Aid & Emergency Response',
      category: 'safety',
      level: 'Essential',
      duration: '4h 00m',
      modules: 15,
      progress: 40,
      rating: 4.9,
      reviews: 445,
      instructor: 'Dr. Kofi Annan',
      thumbnail: '🚑',
      enrolled: 1560,
      xp: 400,
      certification: true,
      status: 'in-progress',
      description: 'Life-saving skills every rider should know',
      topics: ['CPR', 'Wound Care', 'Emergency Protocol', 'Accident Management'],
      nextLesson: 'Module 7: Handling Severe Injuries',
    },
    {
      id: 6,
      title: 'Vehicle Maintenance Basics',
      category: 'skills',
      level: 'Beginner',
      duration: '2h 00m',
      modules: 7,
      progress: 0,
      rating: 4.5,
      reviews: 234,
      instructor: 'Yaw Asante',
      thumbnail: '🔧',
      enrolled: 890,
      xp: 180,
      certification: false,
      status: 'not-started',
      description: 'Keep your vehicle in top condition',
      topics: ['Regular Checks', 'Basic Repairs', 'Tire Maintenance', 'Engine Care'],
    },
    {
      id: 7,
      title: 'Peak Performance Strategies',
      category: 'skills',
      level: 'Advanced',
      duration: '3h 15m',
      modules: 10,
      progress: 60,
      rating: 4.8,
      reviews: 312,
      instructor: 'Ernest Owusu',
      thumbnail: '🎯',
      enrolled: 670,
      xp: 350,
      certification: true,
      status: 'in-progress',
      description: 'Maximize earnings and efficiency during peak hours',
      topics: ['Peak Hour Tactics', 'Order Selection', 'Multi-Tasking', 'Stress Management'],
      nextLesson: 'Module 7: Advanced Multi-Order Handling',
    },
    {
      id: 8,
      title: 'Cultural Sensitivity Training',
      category: 'service',
      level: 'Intermediate',
      duration: '1h 30m',
      modules: 6,
      progress: 0,
      rating: 4.7,
      reviews: 198,
      instructor: 'Akua Frimpong',
      thumbnail: '🌍',
      enrolled: 540,
      xp: 200,
      certification: false,
      status: 'locked',
      requiredLevel: 10,
      description: 'Navigate diverse cultural contexts professionally',
      topics: ['Cultural Awareness', 'Communication Styles', 'Religious Sensitivity', 'Local Customs'],
    },
  ];

  // Certifications
  const certifications = [
    {
      id: 1,
      name: 'Professional Rider Certification',
      description: 'Complete mastery of riding fundamentals',
      icon: '🏆',
      level: 'Gold',
      earnedDate: '2024-09-15',
      validUntil: '2025-09-15',
      courses: ['Advanced Road Safety', 'Customer Service Excellence'],
      benefits: ['+15% Priority Orders', 'Gold Badge', 'Premium Support'],
      status: 'earned',
    },
    {
      id: 2,
      name: 'Safety Expert',
      description: 'Advanced safety and emergency response',
      icon: '🛡️',
      level: 'Platinum',
      progress: 75,
      requiredCourses: 4,
      completedCourses: 3,
      courses: ['Advanced Road Safety', 'First Aid & Emergency Response', 'Defensive Riding', 'Risk Management'],
      benefits: ['+20% Insurance Discount', 'Safety Ambassador Role', 'Mentorship Opportunities'],
      status: 'in-progress',
    },
    {
      id: 3,
      name: 'Service Excellence Badge',
      description: 'Exceptional customer service skills',
      icon: '⭐',
      level: 'Gold',
      earnedDate: '2024-10-20',
      validUntil: '2025-10-20',
      courses: ['Customer Service Excellence', 'Communication Mastery'],
      benefits: ['5-Star Guarantee', 'Premium Customer Access', 'Service Trainer Role'],
      status: 'earned',
    },
    {
      id: 4,
      name: 'Tech Proficiency',
      description: 'Master digital tools and platforms',
      icon: '💻',
      level: 'Silver',
      earnedDate: '2024-11-01',
      validUntil: '2025-11-01',
      courses: ['Mobile App Mastery', 'Digital Safety'],
      benefits: ['Beta Features Access', 'Tech Support Priority'],
      status: 'earned',
    },
    {
      id: 5,
      name: 'Elite Rider Certification',
      description: 'The highest level of rider excellence',
      icon: '👑',
      level: 'Diamond',
      progress: 30,
      requiredCourses: 10,
      completedCourses: 3,
      courses: ['All Advanced Courses', 'Leadership Training', 'Business Management'],
      benefits: ['+30% Earnings Boost', 'Diamond Badge', 'Leadership Role', 'Exclusive Events'],
      status: 'locked',
      requiredLevel: 15,
    },
  ];

  // Learning resources
  const resources = [
    { id: 1, title: 'Rider Safety Manual 2024', type: 'PDF', size: '2.3 MB', downloads: 1240, icon: FileText },
    { id: 2, title: 'Quick Reference Guide', type: 'PDF', size: '890 KB', downloads: 3400, icon: FileText },
    { id: 3, title: 'Safety Checklist', type: 'PDF', size: '450 KB', downloads: 2100, icon: FileText },
    { id: 4, title: 'Emergency Contacts', type: 'PDF', size: '120 KB', downloads: 4500, icon: FileText },
    { id: 5, title: 'Customer Service Scripts', type: 'Audio', size: '5.6 MB', downloads: 890, icon: Headphones },
    { id: 6, title: 'Route Optimization Video', type: 'Video', size: '45 MB', downloads: 670, icon: Video },
  ];

  // Achievements
  const achievements = [
    { id: 1, name: 'Fast Learner', description: 'Complete 5 courses in a week', icon: '⚡', earned: true },
    { id: 2, name: 'Perfect Score', description: 'Ace a course with 100%', icon: '💯', earned: true },
    { id: 3, name: 'Dedicated Student', description: '30-day learning streak', icon: '🔥', earned: false, progress: 7 },
    { id: 4, name: 'Knowledge Sharer', description: 'Help 10 other riders', icon: '🤝', earned: true },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const CourseModal = ({ course, onClose }: { course: any; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 text-white rounded-t-3xl">
          <div className="flex items-start justify-between mb-4">
            <div className="text-6xl">{course.thumbnail}</div>
            <button onClick={onClose} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              ✕
            </button>
          </div>
          <h2 className="text-3xl font-black mb-2">{course.title}</h2>
          <p className="text-green-100 mb-4">{course.description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              {course.level}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              {course.duration}
            </span>
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              {course.modules} Modules
            </span>
            {course.certification && (
              <span className="px-3 py-1 bg-yellow-400/90 text-yellow-900 rounded-full text-sm font-semibold">
                🏆 Certification
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Progress or Status */}
          {course.status === 'in-progress' && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-blue-900">Your Progress</span>
                <span className="text-sm font-bold text-blue-900">{course.progress}%</span>
              </div>
              <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${course.progress}%` }}></div>
              </div>
              <p className="text-sm text-blue-700 mt-2">Next: {course.nextLesson}</p>
            </div>
          )}

          {course.status === 'completed' && (
            <div className="p-4 bg-green-50 rounded-xl border border-green-200 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">Completed</p>
                <p className="text-sm text-green-700">Finished on {course.completedDate}</p>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Rating</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{course.rating}</p>
              <p className="text-xs text-gray-600">{course.reviews} reviews</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-600">Enrolled</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{course.enrolled}</p>
              <p className="text-xs text-gray-600">riders</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-gray-600">Earn XP</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{course.xp}</p>
              <p className="text-xs text-gray-600">points</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-1">
                <GraduationCap className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-600">Instructor</span>
              </div>
              <p className="text-sm font-bold text-gray-900">{course.instructor}</p>
            </div>
          </div>

          {/* Topics Covered */}
          <div>
            <h3 className="font-bold text-gray-900 mb-3">Topics Covered</h3>
            <div className="grid grid-cols-2 gap-3">
              {course.topics.map((topic: string, index: number) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-900">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            {course.status === 'in-progress' && (
              <button className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Continue Learning
              </button>
            )}
            {course.status === 'not-started' && (
              <button className="flex-1 px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                Start Course
              </button>
            )}
            {course.status === 'completed' && (
              <>
                <button className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Review Course
                </button>
                <button className="px-6 py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Certificate
                </button>
              </>
            )}
            <button className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SEOHead
        title="Training Center"
        description="Access courses, earn certifications, and enhance your professional skills"
        keywords={['training', 'courses', 'certifications', 'skills', 'learning']}
        canonicalPath="/dashboard/training"
      />
      <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900">Training Center</h1>
        <p className="text-gray-600 mt-1">Enhance your skills and earn certifications</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-5 text-white">
          <BookOpen className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{trainingStats.coursesCompleted}</p>
          <p className="text-sm opacity-90">Completed</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-5 text-white">
          <Target className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{trainingStats.completionRate}%</p>
          <p className="text-sm opacity-90">Completion Rate</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl p-5 text-white">
          <Award className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{trainingStats.certificationsEarned}</p>
          <p className="text-sm opacity-90">Certifications</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-2xl p-5 text-white">
          <Clock className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{trainingStats.hoursSpent}h</p>
          <p className="text-sm opacity-90">Learning Time</p>
        </div>
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-5 text-white">
          <Trophy className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{trainingStats.currentStreak}</p>
          <p className="text-sm opacity-90">Day Streak</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-2xl p-5 text-white">
          <TrendingUp className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">{trainingStats.skillLevel}</p>
          <p className="text-sm opacity-90">Skill Level</p>
        </div>
        <div className="bg-gradient-to-br from-pink-600 to-pink-700 rounded-2xl p-5 text-white">
          <Star className="w-8 h-8 mb-2 opacity-90" />
          <p className="text-3xl font-black">4.8</p>
          <p className="text-sm opacity-90">Avg. Score</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-2">
        <div className="grid grid-cols-4 gap-2">
          {[
            { id: 'courses', label: 'My Courses', icon: BookOpen },
            { id: 'certifications', label: 'Certifications', icon: Award },
            { id: 'progress', label: 'Progress', icon: BarChart3 },
            { id: 'library', label: 'Library', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  selectedTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'courses' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-green-300'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{category.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    selectedCategory === category.id ? 'bg-white/20' : 'bg-gray-100'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => course.status !== 'locked' && setSelectedCourse(course)}
                className={`bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-all ${
                  course.status === 'locked'
                    ? 'opacity-60 cursor-not-allowed'
                    : 'hover:shadow-lg hover:border-green-300 cursor-pointer'
                }`}
              >
                {/* Course Header */}
                <div className={`p-6 ${
                  course.status === 'completed' ? 'bg-gradient-to-br from-green-50 to-green-100' :
                  course.status === 'in-progress' ? 'bg-gradient-to-br from-blue-50 to-blue-100' :
                  'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-5xl">{course.thumbnail}</div>
                    {course.status === 'completed' && (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                    )}
                    {course.status === 'locked' && (
                      <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                      course.level === 'Advanced' ? 'bg-red-100 text-red-700' :
                      course.level === 'Intermediate' ? 'bg-blue-100 text-blue-700' :
                      course.level === 'Essential' ? 'bg-purple-100 text-purple-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {course.level}
                    </span>
                    {course.certification && (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-semibold">
                        🏆 Cert
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{course.description}</p>

                  {/* Progress Bar */}
                  {course.status === 'in-progress' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-700">Progress</span>
                        <span className="text-xs font-bold text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {course.status === 'locked' && (
                    <div className="flex items-center gap-2 p-2 bg-gray-200 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-gray-600" />
                      <span className="text-xs text-gray-700">Unlock at Level {course.requiredLevel}</span>
                    </div>
                  )}
                </div>

                {/* Course Footer */}
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.modules}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold text-gray-900">{course.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'certifications' && (
        <div className="space-y-6">
          {/* Certifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden ${
                  cert.status === 'earned' ? 'border-green-300' :
                  cert.status === 'in-progress' ? 'border-blue-300' :
                  'border-gray-200 opacity-70'
                }`}
              >
                {/* Certification Header */}
                <div className={`p-6 ${
                  cert.status === 'earned' ? 'bg-gradient-to-br from-green-50 to-green-100' :
                  cert.status === 'in-progress' ? 'bg-gradient-to-br from-blue-50 to-blue-100' :
                  'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-6xl">{cert.icon}</div>
                    {cert.status === 'earned' && (
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        cert.level === 'Diamond' ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white' :
                        cert.level === 'Platinum' ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900' :
                        cert.level === 'Gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900' :
                        'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                      }`}>
                        {cert.level}
                      </div>
                    )}
                    {cert.status === 'locked' && (
                      <Lock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  
                  <h3 className="text-xl font-black text-gray-900 mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{cert.description}</p>

                  {/* Progress */}
                  {cert.status === 'in-progress' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-700">Progress</span>
                        <span className="text-sm font-bold text-gray-900">
                          {cert.completedCourses}/{cert.requiredCourses} courses
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all"
                          style={{ width: `${cert.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {cert.status === 'earned' && (
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <p className="text-gray-600">Earned</p>
                        <p className="font-semibold text-gray-900">{cert.earnedDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-600">Valid Until</p>
                        <p className="font-semibold text-gray-900">{cert.validUntil}</p>
                      </div>
                    </div>
                  )}

                  {cert.status === 'locked' && (
                    <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700">Requires Level {cert.requiredLevel}</span>
                    </div>
                  )}
                </div>

                {/* Certification Details */}
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-3">Benefits</h4>
                  <div className="space-y-2 mb-4">
                    {cert.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {cert.status === 'earned' && (
                    <button className="w-full px-4 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                      <Download className="w-5 h-5" />
                      Download Certificate
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedTab === 'progress' && (
        <div className="space-y-6">
          {/* Learning Streak */}
          <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-4xl">🔥</div>
                  <div>
                    <h2 className="text-3xl font-black">{trainingStats.currentStreak} Days</h2>
                    <p className="text-sm opacity-90">Learning Streak</p>
                  </div>
                </div>
                <p className="text-sm opacity-90 mt-3">Keep it up! Complete a lesson today to maintain your streak.</p>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Best Streak</p>
                <p className="text-4xl font-black">14</p>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-5 rounded-xl border-2 ${
                    achievement.earned
                      ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300'
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`text-4xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{achievement.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                      {!achievement.earned && achievement.progress !== undefined && (
                        <div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${(achievement.progress / 30) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{achievement.progress}/30 days</p>
                        </div>
                      )}
                    </div>
                    {achievement.earned && (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Progress */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Skill Progress</h2>
            <div className="space-y-4">
              {[
                { skill: 'Road Safety', level: 92, color: 'blue' },
                { skill: 'Customer Service', level: 88, color: 'green' },
                { skill: 'Route Planning', level: 75, color: 'purple' },
                { skill: 'Technical Skills', level: 68, color: 'orange' },
                { skill: 'Emergency Response', level: 54, color: 'red' },
              ].map((skill) => (
                <div key={skill.skill}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{skill.skill}</span>
                    <span className="text-sm font-bold text-gray-900">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-${skill.color}-600 rounded-full transition-all`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'library' && (
        <div className="space-y-6">
          {/* Resource Library */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <div
                    key={resource.id}
                    className="p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer border border-gray-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-900 mb-1 truncate">{resource.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <span>{resource.type}</span>
                          <span>•</span>
                          <span>{resource.size}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {resource.downloads}
                          </span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 whitespace-nowrap">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
      )}
    </div>
    </>
  );
}
