import React, { useState } from "react";

interface InputProps {
  onSearch: (query: string) => void;
}

export const Input = ({ onSearch }: InputProps) => {
  const [query, setQuery] = useState<string>("");
  const [searched, setSearched] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setSearched(true);
    }
  };

  const handleReset = () => {
    setQuery("");
    onSearch("");
    setSearched(false);
  };

  return (
    <form onSubmit={handleSubmit} className="header__search">
      <input
        type="text"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
        placeholder="Search car..."
      />

      {query && !searched && (
        <button type="submit" className="header__search-button">
          Найти
        </button>
      )}

      {searched && (
        <button
          type="button"
          onClick={handleReset}
          className="header__search-button-reset"
        >
          Сброс
        </button>
      )}
    </form>
  );
};