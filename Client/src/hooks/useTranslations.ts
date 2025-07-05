import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPendingTranslations, approveTranslation, rejectTranslation } from '@/api/chapterService';
import type { Chapter } from '@/types';
import { toast } from 'sonner';

interface PendingChapter extends Omit<Chapter, 'bookId' | 'submittedBy'> {
  bookId: {
    _id: string;
    title: string;
    slug: string;
  };
  submittedBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  submittedAt: string;
}

interface UseTranslationsOptions {
  enabled?: boolean;
}

export function useTranslations({ enabled = true }: UseTranslationsOptions = {}) {
  const queryClient = useQueryClient();

  const {
    data: pendingTranslations = [],
    isLoading,
    error
  } = useQuery<PendingChapter[]>({
    queryKey: ['pendingTranslations'],
    queryFn: async () => {
      const response = await getPendingTranslations();
      return response.data;
    },
    enabled
  });

  const approveMutation = useMutation({
    mutationFn: approveTranslation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingTranslations'] });
      toast.success('Translation approved successfully');
    },
    onError: (error: Error) => {
      toast.error(`Failed to approve translation: ${error.message}`);
    }
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => 
      rejectTranslation(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingTranslations'] });
      toast.success('Translation rejected');
    },
    onError: (error: Error) => {
      toast.error(`Failed to reject translation: ${error.message}`);
    }
  });

  return {
    pendingTranslations,
    isLoading,
    error,
    approveTranslation: approveMutation.mutate,
    rejectTranslation: rejectMutation.mutate,
    isApproving: approveMutation.isPending,
    isRejecting: rejectMutation.isPending
  };
} 