import { NavLink } from "react-router";
function Navbar() {
  return (
    <div>
      <NavLink to="/">My Pantry</NavLink>
      <NavLink to="/AddProduct">Add Product</NavLink>
    </div>
  );
}

export default Navbar;
