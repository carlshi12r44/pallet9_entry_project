import React from "react";
import Head from "next/head";
import Nav from "./Navbar";
import layoutStyles from "../styles/Layout.module.css";
const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className={layoutStyles.container}>
        <main className={layoutStyles.main}>{children}</main>
      </div>
    </>
  );
};

export default Layout;
