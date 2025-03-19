import { useMutation, useQuery } from "react-query";

interface MutationProps {
  retry?: boolean;
  onSuccess?: (data?: any) => void;
  onError?: () => void;
}

interface FetchProps extends MutationProps {
  name: any;
  dependant?: string;
  fn: () => void;
  enabled?: any;
  cacheTime?: number;
  refetchOnMount?: boolean;
  refetchOnWindowFocus?: boolean;
}

export const useFetch = ({
  name,
  dependant,
  fn,
  enabled,
  cacheTime = 30000,
  refetchOnMount = false,
  refetchOnWindowFocus = false,
  retry = true,
  onSuccess = () => {},
  onError = () => {},
}: FetchProps) => {
  const shouldRetry = retry;

  const query = useQuery([name, dependant], () => fn(), {
    enabled,
    cacheTime,
    staleTime: 60000,
    retry: (failureCount, error: any) => {
      if (error.status === 401 && shouldRetry) {
        if (failureCount > 2) {
          return false;
        }
        return true;
      }
      return false;
    },
    onSuccess,
    onError,
    keepPreviousData: true,
    refetchOnMount,
    refetchOnWindowFocus,
  });

  return query;
};

export const useMutationWrapper = (
  fn: (...params: any) => any,
  { retry = true, onSuccess = () => {}, onError = () => {} }: MutationProps
) => {
  const shouldRetry = retry;
  const query = useMutation(
    fn,
    {
      onSuccess,
      onError,
    },
    {
      retry: (failureCount, error: any) => {
        if (error?.status === 401 && shouldRetry) {
          if (failureCount > 2) {
            return false;
          }
          return true;
        }
        return false;
      },
    }
  );

  return query;
};
