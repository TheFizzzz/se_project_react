import avatar from "../../assets/Profile.png";
import "./SideBar.css";

function SideBar() {
  return (
    <section className="sidebar">
      <div className="sidebar__user-info">
        <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegne" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </section>
  );
}

export default SideBar;
