import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { StylesProvider, Divider } from "@material-ui/core";
import { LibraryMusic } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/slices/userSlice";

const CustomToolbar = styled(Toolbar)`
  position: static;
  display: flex;
  justify-content: space-between;
  margin-left: 15%;
  margin-right: 15%;
`;

const CustomAppBar = styled(AppBar)`
  background-color: rgba(0, 0, 0, 0.9);
`;

const WebsiteTitleAndIconWrapper = styled.div`
  display: flex;
  min-width: 5%;
  justify-content: center;
  align-items: center;
  padding: "2px";
`;

const WebsiteTitleTypography = styled(Typography)`
  padding: 5px;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
`;

const NavBarButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const NavBarButton = styled(Button)`
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  padding-left: 1rem;
  padding-right: 1rem;
  font-weight: 700;
  &: hover {
    color: rgb(176, 38, 255);
  }
`;

const NavBarDivider = styled(Divider)`
  background-color: white;
  align-self: center;
  height: 25px;
  margin-left: 1rem;
  margin-right: 1rem;
`;

const Navbar = () => {
  const dispatch = useDispatch();

  const loginOut = () => {
    dispatch(logOut());
    localStorage.removeItem("access_token");
  };
  return (
    <StylesProvider injectFirst>
      <CustomAppBar position="static">
        <CustomToolbar>
          <WebsiteTitleAndIconWrapper>
            <LibraryMusic />
            <WebsiteTitleTypography variant="h6">
              Spotify Stories
            </WebsiteTitleTypography>
          </WebsiteTitleAndIconWrapper>
          <NavBarButtonWrapper>
            <NavBarButton onClick={() => {}}>Tracks</NavBarButton>
            <NavBarButton onClick={() => {}}>Artists</NavBarButton>
            <NavBarButton onClick={() => {}}>Genres</NavBarButton>
            <NavBarDivider orientation="vertical" flexItem />
            <NavBarButton onClick={() => loginOut()}>logOut</NavBarButton>
          </NavBarButtonWrapper>
        </CustomToolbar>
      </CustomAppBar>
    </StylesProvider>
  );
};

export default Navbar;

