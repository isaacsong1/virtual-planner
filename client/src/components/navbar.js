import { NavLink, useOutletContext } from "react-router-dom";

const Navbar = ({user, updateUser, handleNewAlert}) => {
  // const { user } = useOutletContext();

  const handleLogout = () => {
    fetch("/logout", {method: "DELETE"})
    .then(() => updateUser(null))
    .catch(handleNewAlert)
  }

  return (
    <nav className="navbar">
      <div>
        <NavLink to={`/users/${user.id}/dashboard`}>Dashboard</NavLink>
        <NavLink to={`/users/${user.id}/journals`}>Journal Entries</NavLink>
        <NavLink to={"/communities"}>Communities</NavLink>
      </div>
      <div>
        <NavLink to={`/users/${user.id}/profile`}>Profile</NavLink>
        <NavLink to={"/"} onClick={handleLogout} >Logout</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
