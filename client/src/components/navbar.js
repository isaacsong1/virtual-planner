import { NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar">
      <NavLink to={`/users/${user.id}/dashboard`}>Dashboard</NavLink>
      <NavLink to={`/users/${user.id}/journals`}>Journal Entries</NavLink>
      <NavLink to={`/users/${user.id}/profile`}>Profile</NavLink>
      <NavLink to={"/communities"}>Communities</NavLink>
    </nav>
  );
};

export default Navbar;
