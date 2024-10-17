import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { authActions } from "reduxStore";
import { local } from "common";
import NavItems from "./NavItems";
import Loader from "../Loader";
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

  const toggleSideNav = () => {
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
              <div className="hamburger-icon" onClick={toggleSideNav}>
                <MenuIcon />
              </div>
              <NavItems isNutritionist={isNutritionist} handleLogout={handleLogout} isSideNav={false} />
            </div>
          </div>

          <div className={`sidenav ${isSideNavOpen ? "open" : ""}`}>
            <NavItems
              isNutritionist={isNutritionist}
              toggleSideNav={toggleSideNav}
              handleLogout={handleLogout}
              isSideNav={true}
            />
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;

