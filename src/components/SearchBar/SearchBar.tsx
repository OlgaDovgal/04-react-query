import css from "./SearchBar.module.css";
import toast from "react-hot-toast";
interface SearchBarProps {
  onSubmit: (value: string) => void;
}
export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = (formData: FormData) => {
    const value = (formData.get("query") as string).trim();
    if (value !== "") {
      onSubmit(value);
    } else {
      toast.error("Please enter your search query.");
      return;
    }
  };
  return (
    <header className={css.header}>
      <div className={css.container}>
        <a
          className={css.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={css.form} action={handleSubmit}>
          <input
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={css.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
