import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import clsx from "clsx";

const Header: React.FC = () => {
  const buildLinkClass = ({ isActive }: { isActive: boolean }) =>
    clsx(s.link, isActive && s.active);

  return (
    <header className={s.header}>
      <nav className={s.navList}>
        <NavLink className={buildLinkClass} to="/">
          Shop
        </NavLink>
        <NavLink className={buildLinkClass} to="/cart">
          Shopping Cart
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
