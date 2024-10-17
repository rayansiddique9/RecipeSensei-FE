import React from "react";
import { NavLink } from "react-router-dom";
import { routes } from "common";
import "./navbar.css";

const NavItems = ({isNutritionist, toggleSideNav, handleLogout, isSideNav}) => {
  const listClass = !isSideNav ? "nav-items" : "";
  
  return (
    <>
      {isNutritionist === "false" && (
        <ul className={listClass}>
          <li>
            <NavLink to={routes.HOME_USER} onClick={toggleSideNav} className="nav-link">
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.BLOGS_USER} onClick={toggleSideNav} className="nav-link">
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.RECIPE_GENERATOR} onClick={toggleSideNav} className="nav-link">
              AI Recipe
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.USER_PROFILE} onClick={toggleSideNav} className="nav-link">
              Profile
            </NavLink>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
      {isNutritionist === "true" && (
        <ul className={listClass}>
          <li>
            <NavLink to={routes.HOME_NUTRITIONIST} onClick={toggleSideNav} className="nav-link">
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.NUTRITIONIST_PROFILE} onClick={toggleSideNav} className="nav-link">
              Profile
            </NavLink>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
      {isNutritionist === "null" && (
        <ul className={listClass}>
          <li>
            <NavLink to={routes.RECIPES_ADMIN} onClick={toggleSideNav} className="nav-link">
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.BLOGS_ADMIN} onClick={toggleSideNav} className="nav-link">
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to={routes.USER_LIST_ADMIN} onClick={toggleSideNav} className="nav-link">
              Users
            </NavLink>
          </li>
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavItems;

