import { useQuery, useMutation } from '@tanstack/react-query';
import { getShelters, getShelterResults, postContribution } from '@/lib/api/shelters';
import type { ContributePayload } from '@/types/api';

export const shelterKeys = {
  all: ['shelters'] as const,
  list: (search?: string) => [...shelterKeys.all, { search }] as const,
  results: ['shelters', 'results'] as const,
};

export function useShelters(search?: string) {
  return useQuery({
    queryKey: shelterKeys.list(search),
    queryFn: () => getShelters(search),
    staleTime: 5 * 60 * 1000,
  });
}

export function useShelterResults() {
  return useQuery({
    queryKey: shelterKeys.results,
    queryFn: getShelterResults,
    staleTime: 60 * 1000,
  });
}

export function useContribute() {
  return useMutation({
    mutationFn: (payload: ContributePayload) => postContribution(payload),
  });
}
