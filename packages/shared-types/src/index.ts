// ===== RIDER TYPES =====

export interface Rider {
  id: string;
  name: string;
  email: string;
  phone: string;
  regionId: string;
  status: RiderStatus;
  rating: number;
  level: number;
  xp: number;
  isAvailable: boolean;
  createdAt: Date;
  lastActive: Date;
  profileImage?: string;
  address?: Address;
  emergencyContact?: EmergencyContact;
}

export enum RiderStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
}

export interface RiderDocument {
  id: string;
  riderId: string;
  documentType: DocumentType;
  fileKey: string;
  status: DocumentStatus;
  verifiedAt?: Date;
  expiresAt?: Date;
  metadata?: Record<string, any>;
}

export enum DocumentType {
  ID_CARD = 'id_card',
  DRIVERS_LICENSE = 'drivers_license',
  VEHICLE_REGISTRATION = 'vehicle_registration',
  INSURANCE = 'insurance',
  PROFILE_PHOTO = 'profile_photo',
  BACKGROUND_CHECK = 'background_check',
}

export enum DocumentStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
  EXPIRED = 'expired',
}

// ===== TASK/ORDER TYPES =====

export interface Task {
  id: string;
  merchantId: string;
  pickupAddress: Address;
  dropoffAddress: Address;
  assignedRiderId?: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimatedTime: number; // minutes
  distance: number; // meters
  earnings: number;
  createdAt: Date;
  acceptedAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  canceledAt?: Date;
  proofOfDelivery?: ProofOfDelivery;
  metadata?: TaskMetadata;
}

export enum TaskStatus {
  CREATED = 'created',
  ASSIGNED = 'assigned',
  ACCEPTED = 'accepted',
  IN_PROGRESS = 'in_progress',
  ARRIVED_PICKUP = 'arrived_pickup',
  PICKED_UP = 'picked_up',
  ARRIVED_DROPOFF = 'arrived_dropoff',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
  FAILED = 'failed',
}

export enum TaskPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

export interface ProofOfDelivery {
  type: PODType;
  signature?: string; // base64 or URL
  photo?: string[]; // URLs
  otp?: string;
  notes?: string;
  timestamp: Date;
  location: Location;
}

export enum PODType {
  PHOTO = 'photo',
  SIGNATURE = 'signature',
  OTP = 'otp',
  CONTACTLESS = 'contactless',
}

export interface TaskMetadata {
  packageType?: string;
  weight?: number;
  dimensions?: { length: number; width: number; height: number };
  specialInstructions?: string;
  contactName?: string;
  contactPhone?: string;
  requirements?: string[];
}

// ===== WALLET & TRANSACTION TYPES =====

export interface Wallet {
  id: string;
  riderId: string;
  balance: number;
  currency: string;
  pendingHold: number;
  totalEarnings: number;
  totalWithdrawals: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  walletId: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  description: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  completedAt?: Date;
}

export enum TransactionType {
  EARNING = 'earning',
  BONUS = 'bonus',
  PENALTY = 'penalty',
  WITHDRAWAL = 'withdrawal',
  REFUND = 'refund',
  ADJUSTMENT = 'adjustment',
  TIP = 'tip',
}

export enum TransactionStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELED = 'canceled',
}

// ===== TRAINING & CERTIFICATION TYPES =====

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  level: number;
  requiredForLevels?: number[];
  mandatory: boolean;
  category: CourseCategory;
  thumbnailUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum CourseCategory {
  SAFETY = 'safety',
  NAVIGATION = 'navigation',
  CUSTOMER_SERVICE = 'customer_service',
  VEHICLE_MAINTENANCE = 'vehicle_maintenance',
  REGULATIONS = 'regulations',
  ADVANCED_SKILLS = 'advanced_skills',
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  contentType: LessonContentType;
  contentRef: string; // URL or file key
  duration: number; // minutes
  sortOrder: number;
  quiz?: Quiz;
}

export enum LessonContentType {
  VIDEO = 'video',
  TEXT = 'text',
  INTERACTIVE = 'interactive',
  QUIZ = 'quiz',
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passingScore: number; // percentage
  timeLimit?: number; // minutes
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
}

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  MULTI_SELECT = 'multi_select',
  SHORT_ANSWER = 'short_answer',
}

export interface TrainingProgress {
  id: string;
  riderId: string;
  courseId: string;
  status: ProgressStatus;
  score?: number;
  completedAt?: Date;
  certificateUrl?: string;
  expiresAt?: Date;
}

export enum ProgressStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
  EXPIRED = 'expired',
}

// ===== XP & GAMIFICATION TYPES =====

export interface XPEvent {
  id: string;
  riderId: string;
  eventType: XPEventType;
  xpAmount: number;
  metadata?: Record<string, any>;
  createdAt: Date;
}

export enum XPEventType {
  TASK_COMPLETED = 'task_completed',
  TRAINING_COMPLETED = 'training_completed',
  PERFECT_DELIVERY = 'perfect_delivery',
  STREAK_BONUS = 'streak_bonus',
  REFERRAL = 'referral',
  MILESTONE = 'milestone',
  COMMUNITY_CONTRIBUTION = 'community_contribution',
}

export interface Level {
  id: number;
  name: string;
  xpThreshold: number;
  privileges: LevelPrivilege[];
  badgeUrl?: string;
  color?: string;
}

export interface LevelPrivilege {
  type: PrivilegeType;
  value: any;
  description: string;
}

export enum PrivilegeType {
  PRIORITY_TASKS = 'priority_tasks',
  HIGHER_EARNINGS = 'higher_earnings',
  INSTANT_PAYOUT = 'instant_payout',
  PREMIUM_SUPPORT = 'premium_support',
  EXCLUSIVE_TRAINING = 'exclusive_training',
  MENTOR_ACCESS = 'mentor_access',
}

// ===== COMMUNITY TYPES =====

export interface CommunityPost {
  id: string;
  authorId: string;
  channelId: string;
  content: string;
  attachments?: string[];
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  replyCount: number;
  isPinned: boolean;
}

export enum PostStatus {
  PUBLISHED = 'published',
  DRAFT = 'draft',
  MODERATION = 'moderation',
  REMOVED = 'removed',
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  type: ChannelType;
  regionId?: string;
  isPrivate: boolean;
  memberCount: number;
  createdAt: Date;
}

export enum ChannelType {
  GENERAL = 'general',
  REGIONAL = 'regional',
  HELP = 'help',
  ANNOUNCEMENTS = 'announcements',
  TRAINING = 'training',
}

// ===== WELFARE TYPES =====

export interface InsuranceEnrollment {
  id: string;
  riderId: string;
  planId: string;
  status: InsuranceStatus;
  enrolledAt: Date;
  expiresAt: Date;
  premium: number;
  coverage: InsuranceCoverage[];
}

export enum InsuranceStatus {
  ACTIVE = 'active',
  PENDING = 'pending',
  EXPIRED = 'expired',
  CANCELED = 'canceled',
}

export interface InsuranceCoverage {
  type: CoverageType;
  limit: number;
  deductible: number;
}

export enum CoverageType {
  ACCIDENT = 'accident',
  HEALTH = 'health',
  VEHICLE = 'vehicle',
  LIABILITY = 'liability',
  DISABILITY = 'disability',
}

export interface LoanApplication {
  id: string;
  riderId: string;
  amount: number;
  purpose: LoanPurpose;
  status: LoanStatus;
  approvedAmount?: number;
  interestRate?: number;
  repaymentPeriod?: number; // months
  appliedAt: Date;
  approvedAt?: Date;
}

export enum LoanPurpose {
  VEHICLE_PURCHASE = 'vehicle_purchase',
  VEHICLE_REPAIR = 'vehicle_repair',
  EQUIPMENT = 'equipment',
  EMERGENCY = 'emergency',
  EDUCATION = 'education',
}

export enum LoanStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  DISBURSED = 'disbursed',
  REPAYING = 'repaying',
  COMPLETED = 'completed',
  DEFAULTED = 'defaulted',
}

// ===== INCIDENT & SAFETY TYPES =====

export interface Incident {
  id: string;
  riderId: string;
  taskId?: string;
  type: IncidentType;
  severity: IncidentSeverity;
  description: string;
  evidenceKeys: string[];
  location: Location;
  status: IncidentStatus;
  escalatedTo?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export enum IncidentType {
  ACCIDENT = 'accident',
  HARASSMENT = 'harassment',
  THEFT = 'theft',
  VEHICLE_BREAKDOWN = 'vehicle_breakdown',
  CUSTOMER_DISPUTE = 'customer_dispute',
  SAFETY_CONCERN = 'safety_concern',
  OTHER = 'other',
}

export enum IncidentSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum IncidentStatus {
  REPORTED = 'reported',
  INVESTIGATING = 'investigating',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  ESCALATED = 'escalated',
}

// ===== COMMON TYPES =====

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  placeId?: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp: Date;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
  timestamp: Date;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// ===== EVENT TYPES (Kafka) =====

export interface TaskEvent {
  eventType: 'task.created' | 'task.assigned' | 'task.completed' | 'task.canceled';
  taskId: string;
  riderId?: string;
  timestamp: Date;
  payload: Partial<Task>;
}

export interface RiderEvent {
  eventType: 'rider.online' | 'rider.offline' | 'rider.location.update';
  riderId: string;
  timestamp: Date;
  payload: Record<string, any>;
}

export interface TrainingEvent {
  eventType: 'training.started' | 'training.completed' | 'training.failed';
  riderId: string;
  courseId: string;
  timestamp: Date;
  payload: Record<string, any>;
}

export interface XPAwardedEvent {
  eventType: 'xp.awarded' | 'level.upgraded';
  riderId: string;
  amount?: number;
  newLevel?: number;
  timestamp: Date;
}

export interface WalletEvent {
  eventType: 'wallet.transaction.created' | 'wallet.transaction.completed';
  walletId: string;
  transactionId: string;
  timestamp: Date;
  payload: Partial<Transaction>;
}
