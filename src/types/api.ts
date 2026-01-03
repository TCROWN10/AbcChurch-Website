// API Types based on Swagger Documentation

// Base API Response
export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  message?: string;
}

// Authentication Types
export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  lastName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
  };
  message: string;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  gender?: string;
  dob?: string;
  role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  isEmailVerified?: boolean;
}

export interface UpdateProfileRequest {
  name?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  gender?: string;
  dob?: string;
}

// User Management Types
export interface GetAllUsersParams {
  role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  isEmailVerified?: boolean;
  limit?: number;
  offset?: number;
}

export interface UpdateUserRequest {
  email?: string;
  role?: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
  isEmailVerified?: boolean;
}

export interface UpdateUserDetailsRequest {
  name?: string;
  lastName?: string;
  phoneNumber?: string;
}

// Donation Types
export type DonationType = 'TITHE' | 'OFFERING' | 'DONATION';

export interface CreateCheckoutRequest {
  amount: number;
  type: DonationType;
  currency?: string;
  isRecurring?: boolean;
}

export interface CreateCheckoutResponse {
  url: string;
  sessionId: string;
}

export interface Donation {
  id: string;
  userId: string;
  amount: number;
  type: DonationType;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  isRecurring: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyDonationsParams {
  type?: DonationType;
  status?: string;
}

export interface GetAllDonationsParams {
  type?: DonationType;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface DonationStats {
  total: number;
  count: number;
  byType: Record<DonationType, number>;
  byStatus: Record<string, number>;
}

// Message Types
export type MessageType = 'SUNDAY' | 'WEEKDAY';

export interface Message {
  id: string;
  title: string;
  content: string;
  type: MessageType;
  videoUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetMessagesParams {
  type?: MessageType;
  published?: string;
  limit?: number;
  offset?: number;
}

export interface CreateMessageRequest {
  title: string;
  content: string;
  type: MessageType;
  videoUrl?: string;
}

export interface UpdateMessageRequest {
  title?: string;
  content?: string;
  type?: MessageType;
  videoUrl?: string;
  published?: boolean;
}

// Newsletter Types
export interface NewsletterPreferences {
  messageUpdates?: boolean;
  newsUpdates?: boolean;
}

export interface SubscribeRequest {
  preferences?: NewsletterPreferences;
}

export interface SubscribeByEmailRequest {
  email: string;
  preferences?: NewsletterPreferences;
}

export interface UnsubscribeByEmailRequest {
  email: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  preferences: NewsletterPreferences;
  subscribed: boolean;
  createdAt: string;
}

// Prayer Request Types
export type PrayerRequestStatus = 'PENDING' | 'READ' | 'ARCHIVED';

export interface PrayerRequest {
  id: string;
  requesterName: string;
  requesterEmail: string;
  title: string;
  content: string;
  isPublic: boolean;
  status: PrayerRequestStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePrayerRequestRequest {
  requesterName: string;
  requesterEmail: string;
  title: string;
  content: string;
  isPublic: boolean;
}

export interface GetPrayerRequestsParams {
  status?: PrayerRequestStatus;
  public?: string;
  limit?: number;
  offset?: number;
}

export interface AddNotesRequest {
  notes: string;
}

// Financial Types
export interface FinancialSummaryParams {
  type?: DonationType;
  startDate?: string;
  endDate?: string;
  today?: boolean;
  status?: string;
}

export interface FinancialSummary {
  total: number;
  count: number;
  byType: Record<DonationType, number>;
  byStatus: Record<string, number>;
  byDate: Array<{
    date: string;
    total: number;
    count: number;
  }>;
}

export interface ExportExcelRequest {
  type?: DonationType;
  startDate?: string;
  endDate?: string;
  today?: boolean;
  status?: string;
  recipientEmail: string;
}

export interface ExportPDFRequest {
  type?: DonationType;
  startDate?: string;
  endDate?: string;
  today?: boolean;
  status?: string;
  recipientEmail: string;
}

// Analytics Types
export interface BirthdayAnalyticsParams {
  date?: string;
}

export interface BirthdayAnalytics {
  date: string;
  birthdays: Array<{
    id: string;
    name: string;
    lastName: string;
    email: string;
    dob: string;
  }>;
  count: number;
}

