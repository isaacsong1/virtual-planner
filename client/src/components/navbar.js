import { NavLink, useOutletContext } from "react-router-dom";

const Navbar = () => {
  // const { user } = useOutletContext();
  return (
    <nav className="navbar">
      <NavLink to={`/users/${12}/dashboard`}>Dashboard</NavLink>
      <NavLink to={`/users/${12}/journals`}>Journal Entries</NavLink>
      <NavLink to={`/users/${12}/profile`}>Profile</NavLink>
      <NavLink to={"/communities"}>Communities</NavLink>
    </nav>
  );
};

export default Navbar;
