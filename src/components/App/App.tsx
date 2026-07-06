import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import ReactPaginateModule from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./App.module.css";
import toast, { Toaster } from "react-hot-toast";

type ModuleWithDefault<T> = { default: T };

const ReactPaginate = (
  ReactPaginateModule as unknown as ModuleWithDefault<
    ComponentType<ReactPaginateProps>
  >
).default;

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: ["movies", value, page],
    queryFn: () => fetchMovies(value, page),
    placeholderData: keepPreviousData,
  });
  useEffect(() => {
    if (data?.results.length === 0) {
      toast.error("Фільми за таким пошуковим словом не знайдено");
    }
  });
  const handleSubmit = (value: string) => {
    setValue(value);
    setPage(1);
  };
  const totalPages = data?.total_pages ?? 0;

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
      {data?.results.length > 0 && (
        <MovieGrid
          movies={data?.results}
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
      <Toaster />
    </>
  );
}
