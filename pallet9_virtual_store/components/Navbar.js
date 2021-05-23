import React from "react";
import Link from "next/link"
import navbarStyles from "../styles/Navbar.module.css";
const Navbar = ({}) => {
  return (
    <nav className={navbarStyles.nav}>
      <ul>
        <Link href="/">Home</Link>
      </ul>
      <ul>
        <Link href="/shop">Shop</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
