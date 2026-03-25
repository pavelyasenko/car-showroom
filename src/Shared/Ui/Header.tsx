import { Link } from "react-router-dom";
import { Input } from "./input";
import logo from "../../foto/logo.png";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export const Header = ({ onSearch }: HeaderProps) => (
  <header className="header">
    <Link to="/" className="header__logo-link">
      <img src={logo} alt="Logo" className="header__logo-img"/>
      </Link>
    <Input onSearch={onSearch} /> 
  </header>
);