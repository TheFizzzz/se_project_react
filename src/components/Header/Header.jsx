import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import UserAvatar from "../UserAvatar/UserAvatar";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({
  weatherData,
  handleOpenAddGarmentModal,
  isLoggedIn,
  onOpenLogin,
  onOpenRegister,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__link">
          <img className="header__logo" src={logo} alt="WTWR logo" />
        </Link>
        <p className="header__date-location">
          {currentDate}, {weatherData.city || "..."}
        </p>
      </div>
      <div className="header__right">
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            type="button"
            className="header__add-clothes-btn"
            onClick={handleOpenAddGarmentModal}
          >
            + Add clothes
          </button>
        )}
        {isLoggedIn ? (
          <Link to="/profile" className="header__link header__profile-link">
            <p className="header__user">{currentUser?.name}</p>
            <UserAvatar user={currentUser} className="header__avatar" />
          </Link>
        ) : (
          <>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onOpenRegister}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__auth-btn"
              onClick={onOpenLogin}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
