import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ user, updateUser, handleNewAlert }) => {
  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" })
      .then(() => updateUser(null))
      .catch(handleNewAlert);
  };

  return (
    <nav className="navbar">
      <div>
        <NavLink className="link" to={`/users/${user.id}/dashboard`}>
          Dashboard
        </NavLink>
        <NavLink className="link" to={`/users/${user.id}/journals`}>
          Journal Entries
        </NavLink>
        <NavLink className="link" to={`/users/${user.id}/profile`}>
          View Profile
        </NavLink>
        <NavLink className="link" to={"/communities"}>
          Communities
        </NavLink>
      </div>
      <div>
        <NavLink className="link logout" to={"/"} onClick={handleLogout}>
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
