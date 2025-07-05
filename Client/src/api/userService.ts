import axiosInstance from './axiosInstance';
import type { User, CreateUser } from '@/types';

const endpoint = '/users';

// --- CRUD API functions ---
export async function getAllUsers(page: number = 1, limit: number = 10): Promise<{ users: User[], total: number }> {
  const response = await axiosInstance.get('/users', {
    params: { page, limit }
  });
  return response.data;
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User> {
  const response = await axiosInstance.get(`/users/email/${email}`);
  return response.data;
}

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
export async function requestEditorRole(userId: string, reason: string): Promise<User> {
  const response = await axiosInstance.post(`/users/${userId}/request-editor`, { reason });
  return response.data;
}

// Get all pending editor role requests (admin)
export async function getRoleRequests(): Promise<User[]> {
  const response = await axiosInstance.get('/users/role-requests');
  return response.data;
}

// Approve editor role request (admin)
export async function approveEditorRole(userId: string, adminId: string, forceDirect: boolean = false): Promise<User> {
  const response = await axiosInstance.post(`/users/${userId}/approve-editor`, { adminId, forceDirect });
  return response.data;
}

// Reject editor role request (admin)
export async function rejectEditorRole(userId: string, reason: string, adminId: string): Promise<User> {
  const response = await axiosInstance.post(`/users/${userId}/reject-editor`, { reason, adminId });
  return response.data;
}

export async function revokeEditorRole(userId: string, adminId: string): Promise<User> {
  const response = await axiosInstance.post(`/users/${userId}/revoke-editor`, { adminId });
  return response.data;
}

export async function deleteUser(userId: string): Promise<void> {
  await axiosInstance.delete(`/users/${userId}`);
}

export async function getActiveEditors(): Promise<User[]> {
  const response = await axiosInstance.get('/users', {
    params: { role: 'editor' }
  });
  return response.data;
} 