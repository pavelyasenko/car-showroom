import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../foto/logo.png";

export function Header() {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    }
  };

  return (
    <header className="header">
      <div className="header__logo">
        <Link to="/" className="header__logo-link">
          <img src={logo} alt="Logo" className="header__logo-img"/>
        </Link>
      </div>
      <form onSubmit={handleSearch} className="header__search">
        <input 
          type="text" 
          placeholder="Поиск..." 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Найти</button>
      </form>
    </header>
  );
}