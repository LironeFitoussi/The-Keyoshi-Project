import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllUsers, revokeEditorRole, approveEditorRole, deleteUser } from '@/api/userService';
import { toast } from 'sonner';

interface UseUsersOptions {
  enabled?: boolean;
  adminId: string;
  page?: number;
  limit?: number;
}

export function useUsers({ enabled = true, adminId, page = 1, limit = 10 }: UseUsersOptions) {
  const queryClient = useQueryClient();

  const {
    data = { users: [], total: 0 },
    isLoading,
    error
  } = useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => getAllUsers(page, limit),
    enabled
  });

  const revokeEditorMutation = useMutation({
    mutationFn: (userId: string) => revokeEditorRole(userId, adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Editor role revoked');
    },
    onError: (error: Error) => {
      toast.error(`Failed to revoke editor role: ${error.message}`);
    }
  });

  const approveEditorMutation = useMutation({
    mutationFn: (userId: string) => approveEditorRole(userId, adminId, true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Editor role granted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to grant editor role: ${error.message}`);
    }
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User deleted');
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete user: ${error.message}`);
    }
  });

  return {
    users: data.users,
    total: data.total,
    isLoading,
    error,
    revokeEditorRole: revokeEditorMutation.mutate,
    approveEditorRole: approveEditorMutation.mutate,
    deleteUser: deleteUserMutation.mutate,
    isRevoking: revokeEditorMutation.isPending,
    isApproving: approveEditorMutation.isPending,
    isDeleting: deleteUserMutation.isPending
  };
} 