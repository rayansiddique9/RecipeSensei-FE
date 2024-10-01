import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { authActions } from "reduxStore";
import { routes, local } from "common";
import Loader from "../Loader";
import LogoutButton from "./LogoutButton";
import MenuIcon from "@mui/icons-material/Menu";
import "./navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const { data: isNutritionist, isLoading } = useQuery({
    queryKey: ["isNutritionistStatus"],
    queryFn: async () => {
      return local.getIsNutritionist();
    },
  });

  const [isSideNavOpen, setIsSideNavOpen] = useState(false);

  const toggleSidenav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  const handleLogout = async () => {
    dispatch(authActions.logoutUser());
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <nav className="navbar">
          <div className="navbar-container">
            <div className="navbar-logo">Recipe Sensei</div>
            <div className="navbar-menu">
              <div className="hamburger-icon" onClick={toggleSidenav}>
                <MenuIcon />
              </div>
              {isNutritionist === "false" && (
                <ul className="nav-items">
                  <li>
                    <NavLink to={routes.HOME_USER} className="nav-link">
                      Recipes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={routes.BLOGS_USER} className="nav-link">
                      Blogs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={routes.RECIPE_GENERATOR} className="nav-link">
                      AI Recipe
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={routes.USER_PROFILE} className="nav-link">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <LogoutButton handleLogout={handleLogout} /> 
                  </li>
                </ul>
              )}
              {isNutritionist === "true" && (
                <ul className="nav-items">
                  <li>
                    <NavLink to={routes.HOME_NUTRITIONIST} className="nav-link">
                      Recipes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={routes.NUTRITIONIST_PROFILE} className="nav-link">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                    <LogoutButton handleLogout={handleLogout} />
                  </li>
                </ul>
              )}
              {isNutritionist === "null" && (
                <ul className="nav-items">
                  <li>
                    <NavLink to={routes.RECIPES_ADMIN} className="nav-link">
                      Recipes
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={routes.BLOGS_ADMIN} className="nav-link">
                      Blogs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={routes.USER_LIST_ADMIN} className="nav-link">
                      Users
                    </NavLink>
                  </li>
                  <li>
                    <LogoutButton handleLogout={handleLogout} />
                  </li>
                </ul>
              )}
            </div>
          </div>

          <div className={`sidenav ${isSideNavOpen ? "open" : ""}`}>
            {isNutritionist === "false" && (
              <ul>
                <li>
                  <NavLink to={routes.HOME_USER} onClick={toggleSidenav} className="nav-link">
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={routes.BLOGS_USER} onClick={toggleSidenav} className="nav-link">
                    Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink to={routes.RECIPE_GENERATOR} onClick={toggleSidenav} className="nav-link">
                    AI Recipe
                  </NavLink>
                </li>
                <li>
                  <NavLink to={routes.USER_PROFILE} onClick={toggleSidenav} className="nav-link">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <LogoutButton handleLogout={handleLogout} />
                </li>
              </ul>
            )}
            {isNutritionist === "true" && (
              <ul>
                <li>
                  <NavLink to={routes.HOME_NUTRITIONIST} onClick={toggleSidenav} className="nav-link">
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={routes.NUTRITIONIST_PROFILE} onClick={toggleSidenav} className="nav-link">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <LogoutButton handleLogout={handleLogout} />
                </li>
              </ul>
            )}
            {isNutritionist === "null" && (
              <ul>
                <li>
                  <NavLink to={routes.RECIPES_ADMIN} className="nav-link">
                    Recipes
                  </NavLink>
                </li>
                <li>
                  <NavLink to={routes.BLOGS_ADMIN} className="nav-link">
                    Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink to={routes.USER_LIST_ADMIN} className="nav-link">
                    Users
                  </NavLink>
                </li>
                <li>
                  <LogoutButton handleLogout={handleLogout} />
                </li>
              </ul>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;

