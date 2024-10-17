import { useInfiniteQuery } from "@tanstack/react-query";

export const useCustomInfiniteQuery = ({ queryKey, queryFn, options = {} }) => {
  return useInfiniteQuery({
    queryKey,
    queryFn,
    getNextPageParam: (lastPage) => {
      const nextPageUrl = lastPage?.next ? new URL(lastPage.next) : null;
      return nextPageUrl ? nextPageUrl.searchParams.get("page") : null;
    },
    ...options,
  });
};

