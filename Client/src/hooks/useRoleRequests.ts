import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getRoleRequests, approveEditorRole, rejectEditorRole } from '@/api/userService';
import { toast } from 'sonner';

// Define the base user shape we need for filtering
interface BaseUser {
  _id: string;
  firstName: string;
  email: string;
  roleRequest?: {
    status: 'pending' | 'approved' | 'rejected' | null;
    reason: string;
    requestedAt?: string;
    reviewedAt?: string;
    reviewedBy?: string;
    rejectionReason?: string;
  } | null;
}

// Define the shape of a role request as returned by the server
interface RoleRequest {
  _id: string;
  firstName: string;
  email: string;
  roleRequest: {
    status: 'pending';
    reason: string;
    requestedAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    rejectionReason?: string;
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
  } = useQuery({
    queryKey: ['pendingRoleRequests'],
    queryFn: async () => {
      console.log('Fetching pending role requests...');
      const data = await getRoleRequests();
      console.log('Received role requests:', data);
      // Filter and transform the data to match our RoleRequest interface
      return data.filter((user: BaseUser): user is RoleRequest => {
        if (!user.roleRequest || user.roleRequest.status !== 'pending') return false;
        return (
          typeof user._id === 'string' &&
          typeof user.firstName === 'string' &&
          typeof user.email === 'string' &&
          typeof user.roleRequest.reason === 'string' &&
          typeof user.roleRequest.requestedAt === 'string'
        );
      });
    },
    enabled
  });

  const approveMutation = useMutation({
    mutationFn: ({ userId, forceDirect = false }: { userId: string; forceDirect?: boolean }) => 
      approveEditorRole(userId, adminId, forceDirect),
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
    approveRequest: (userId: string, forceDirect: boolean = false) => 
      approveMutation.mutate({ userId, forceDirect }),
    rejectRequest: rejectMutation.mutate,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending
  };
} 