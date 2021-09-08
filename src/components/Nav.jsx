import React from "react";
import { useHistory, Link } from "react-router-dom";
import styles from "./nav.module.css"

export const Nav = () => {
  const redirect = useHistory();
  if (!window.localStorage.getItem("alkemyToken") && window.location.href!=="http://localhost:3000/login") redirect.push("/login");
  const logOut = () => {
    window.localStorage.removeItem("alkemyToken");
    redirect.push("/login");
  };

  return (
    <div className={styles.container}>
      <Link to="/home" className={styles.logo}>
      <div className={styles.logo}>
      <h1 className={styles.heros}>Heros</h1>
      <h1 className={styles.app}>App</h1>

      </div>
      </Link>
      {window.localStorage.getItem("alkemyToken")?<button onClick={() => logOut()} className={styles.button}>log out</button>:null}
      
    </div>
  );
};
