import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav}>
      <span className={styles.logo}>Pantry</span>
      <div className={styles.links}>
        <NavLink to="/" end className={styles.link}>
          My pantry
        </NavLink>
        <NavLink to="/AddProduct" className={styles.link}>
          Add product
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
