import React from "react";
import { Link } from "react-router-dom";
import Icon from "./img/logo-icon.svg";

function NavigationBar({ user, onLogout }) {
  const isGuest = !user;

  return (
    <nav className="navbar">
      <Link to="/" className="logo__container">
        <img
          alt="CookiJar Logo"
          src={Icon}
          className="logo"
        />
        <p className="logo__text">CookiJar</p>
      </Link>

      <ul className="nav__links">
        <li>
          <Link to="/tasks" className="text-blue-700 hover:text-purple-700 transition-colors">
            Tasks
          </Link>
        </li>
        <li>
          <Link to="/rewards" className="text-blue-700 hover:text-purple-700 transition-colors">
            Rewards
          </Link>
        </li>

        {isGuest ? (
          <>
            <li>
              <Link to="/login" className="hover:text-blue-600 transition-colors">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={onLogout}
              className="transition-colors font-medium"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;