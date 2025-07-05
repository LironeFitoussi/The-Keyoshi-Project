import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoleRequests, approveEditorRole, rejectEditorRole } from '@/api/userService';
import type { User as UserType } from '@/types';
import { toast } from 'sonner';

interface RoleRequest extends Pick<UserType, '_id' | 'firstName' | 'email'> {
  roleRequest: NonNullable<UserType['roleRequest']> & {
    status: 'pending';
    requestedAt: string;
  };
}

interface UseRoleRequestsOptions {
  enabled?: boolean;
  adminId: string;
}

export function useRoleRequests({ enabled = true, adminId }: UseRoleRequestsOptions) {
  const queryClient = useQueryClient();

  const {
    data: pendingRequests = [],
    isLoading,
    error
  } = useQuery<RoleRequest[]>({
    queryKey: ['pendingRoleRequests'],
    queryFn: async () => {
      console.log('Fetching pending role requests...');
      const data = await getRoleRequests();
      console.log('Received role requests:', data);
      return data;
    },
    enabled
  });

  const approveMutation = useMutation({
    mutationFn: (userId: string) => approveEditorRole(userId, adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingRoleRequests'] });
      toast.success('Editor role approved');
    },
    onError: (error: Error) => {
      toast.error(`Failed to approve editor role: ${error.message}`);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: ({ userId, reason }: { userId: string; reason: string }) => 
      rejectEditorRole(userId, reason, adminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingRoleRequests'] });
      toast.success('Editor role request rejected');
    },
    onError: (error: Error) => {
      toast.error(`Failed to reject editor role: ${error.message}`);
    }
  });

  return {
    pendingRequests,
    isLoading,
    error,
    approveRequest: approveMutation.mutate,
    rejectRequest: rejectMutation.mutate,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending
  };
} 