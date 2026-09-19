import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import UserAvatar from "../UserAvatar/UserAvatar";
import "./SideBar.css";

function SideBar({ onSignOut, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="sidebar">
      <div className="sidebar__user-info">
        <UserAvatar user={currentUser} className="sidebar__avatar" />
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <button className="sidebar__button" type="button" onClick={onEditProfile}>
        Change profile data
      </button>
      <button className="sidebar__button" type="button" onClick={onSignOut}>
        Log out
      </button>
    </section>
  );
}

export default SideBar;
