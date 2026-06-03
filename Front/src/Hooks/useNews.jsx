import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { cacheTimes } from '../lib/queryClient';
import { queryKeys } from '../lib/queryKeys';

const TMDB_UPCOMING_URL =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=e776029a0090458349a40650701fda97";

function useNews() {
  return useQuery({
    queryKey: queryKeys.news,
    queryFn: async () => {
      const res = await axios.get(TMDB_UPCOMING_URL);
      return res?.data?.results;
    },
    ...cacheTimes.news,
  });
}

export default useNews;
