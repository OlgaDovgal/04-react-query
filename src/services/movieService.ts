import axios from "axios";
import type { Movie } from "../types/movie";
axios.defaults.baseURL = "https://api.themoviedb.org/3/search";

export default async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get<{ results: Movie[] }>(`/movie`, {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    },
  });
  return response.data.results;
}
