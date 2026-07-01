import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import toast from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleSubmit = async (value: string) => {
    try {
      setMovies([]);
      setIsLoading(true);
      setIsError(false);
      const result = await fetchMovies(value);
      if (result.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }
      setMovies(result);
    } catch {
      toast.error("Oop. Something wrong..");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {movies.length !== 0 && (
        <MovieGrid
          movies={movies}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {selectedMovie && (
        <MovieModal
          onClose={() => setSelectedMovie(null)}
          movie={selectedMovie}
        />
      )}
    </>
  );
}
