import logo from "../../assets/logo.svg";
import avatar from "../../assets/Profile.png";
import "./Header.css";

function Header({ handleOpenAddGarmentModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <img className="header__logo" src={logo} alt="WTWR logo" />
        <p className="header__date-location">{currentDate}, Bristol, UK</p>
      </div>
      <div className="header__right">
        <button
          type="button"
          className="header__add-clothes-btn"
          onClick={handleOpenAddGarmentModal}
        >
          + Add clothes
        </button>
        <p className="header__user">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}

export default Header;
