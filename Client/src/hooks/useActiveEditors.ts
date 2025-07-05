import { useQuery } from '@tanstack/react-query';
import { getActiveEditors } from '@/api/userService';
import type { User } from '@/types';

interface UseActiveEditorsOptions {
  enabled?: boolean;
}

export function useActiveEditors({ enabled = true }: UseActiveEditorsOptions = {}) {
  const {
    data: editors = [],
    isLoading,
    error
  } = useQuery<User[]>({
    queryKey: ['activeEditors'],
    queryFn: async () => {
      console.log('Fetching active editors...');
      const data = await getActiveEditors();
      console.log('Received active editors:', data);
      return data;
    },
    enabled
  });

  return {
    editors,
    isLoading,
    error
  };
} 