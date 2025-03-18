import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const logoutHandler = () => {
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className={`navbar navbar-expand-lg sticky-top ${isScrolled ? "navbar-scrolled" : "navbar-transparent"}`}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Expense Management System
        </Link>
        <span className="ms-auto">
          <span className="username">Welcome, {loginUser && loginUser.name}</span>
          <Link className="text-decoration-none text-light bg-danger p-2 rounded-3 fs-6 ms-3" to="/login" onClick={logoutHandler}>
            Logout
          </Link>
        </span>
      </div>
    </nav>
  );
};

export default Header;
