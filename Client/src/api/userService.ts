import axiosInstance from './axiosInstance';

import type { User, CreateUser } from '@/types';

const endpoint = '/users';

// --- CRUD API functions ---
export const getAllUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>(endpoint);
  return data;
};

// Get user by email
export const getUserByEmail = async (email: string): Promise<User> => {
  const { data } = await axiosInstance.get<User>(`${endpoint}/email/${email}`);
  return data;
};

// Get user by regex
export const getUserRegex = async (regex: string): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>(`${endpoint}/regex/${regex}`);
  return data;
};

// Create user
export const createUser = async (user: CreateUser): Promise<User> => {
  const { data } = await axiosInstance.post<User>(endpoint, user);
  return data;
};

// Update user
export const updateUser = async (user: User): Promise<User> => {
  const { data } = await axiosInstance.put<User>(`${endpoint}/${user._id}`, user);
  return data;
};

// Request editor role
export const requestEditorRole = async (userId: string, reason: string) => {
  const { data } = await axiosInstance.post(`${endpoint}/${userId}/request-editor`, { reason });
  return data;
};

// Get all pending editor role requests (admin)
export const getRoleRequests = async () => {
  const { data } = await axiosInstance.get(`${endpoint}/role-requests`);
  return data;
};

// Approve editor role request (admin)
export const approveEditorRole = async (userId: string, adminId: string) => {
  const { data } = await axiosInstance.post(`${endpoint}/${userId}/approve-editor`, { adminId });
  return data;
};

// Reject editor role request (admin)
export const rejectEditorRole = async (userId: string, reason: string, adminId: string) => {
  const { data } = await axiosInstance.post(`${endpoint}/${userId}/reject-editor`, { reason, adminId });
  return data;
}; 