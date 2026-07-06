import axios from "axios";
import type { Movie } from "../types/movie";
axios.defaults.baseURL = "https://api.themoviedb.org/3/search";
interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

export default async function fetchMovies(
  query: string,
  page: number,
): Promise<MoviesResponse> {
  const response = await axios.get<MoviesResponse>(`/movie`, {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return response.data;
}
