import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/Profile.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ weatherData, handleOpenAddGarmentModal }) {
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
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleOpenAddGarmentModal}
        >
          + Add clothes
        </button>
        <Link to="/profile" className="header__link header__profile-link">
          <p className="header__user">Terrence Tegegne</p>
          <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
