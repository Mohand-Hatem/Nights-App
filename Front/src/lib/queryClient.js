import { QueryClient } from '@tanstack/react-query';

const FIVE_MINUTES = 1000 * 60 * 5;
const TEN_MINUTES = 1000 * 60 * 10;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 2,
      gcTime: FIVE_MINUTES,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const cacheTimes = {
  books: { staleTime: 1000 * 60 * 2, gcTime: TEN_MINUTES },
  categories: { staleTime: 1000 * 60 * 10, gcTime: TEN_MINUTES },
  profile: { staleTime: 1000 * 60 * 5, gcTime: TEN_MINUTES },
  cartCount: { staleTime: 1000 * 30, gcTime: FIVE_MINUTES },
  cart: { staleTime: 1000 * 30, gcTime: FIVE_MINUTES },
  singleBook: { staleTime: 1000 * 60 * 5, gcTime: TEN_MINUTES },
  news: { staleTime: 1000 * 60 * 15, gcTime: TEN_MINUTES },
};
