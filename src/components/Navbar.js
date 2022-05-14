import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { StylesProvider } from '@material-ui/core'
import { LibraryMusic } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { logOut } from '../redux/slices/userSlice'


const CustomToolbar = styled(Toolbar)`
  position: static;
  display: flex;
  justify-content: space-between;
  margin-left: 15%;
  margin-right: 15%;
`

const CustomAppBar = styled(AppBar)`
  background-color: rgba(0, 0, 0, 0.9);
`

const WebsiteTitleAndIconWrapper = styled.div`
  display: flex;
  min-width: 5%;
  justify-content: center;
  align-items: center;
  padding: '2px'
`

const WebsiteTitleTypography = styled(Typography)`
  padding: 5px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
`

const NavBarButton = styled(Button)`
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 700;
  &: hover {
    color: rgb(176, 38, 255)
  }
`



const Navbar = () => {
  const dispatch = useDispatch();

  const loginOut = () => {
    dispatch(logOut())
    localStorage.removeItem("access_token")
  }
  return (
    <StylesProvider injectFirst>
      <CustomAppBar position='static'>
        <CustomToolbar>
          <WebsiteTitleAndIconWrapper>
            <LibraryMusic />
            <WebsiteTitleTypography variant="h6">
              Spotify Stories
            </WebsiteTitleTypography>
          </WebsiteTitleAndIconWrapper>
          <NavBarButton onClick={() => loginOut()}>logOut</NavBarButton>
        </CustomToolbar>
      </CustomAppBar>
    </StylesProvider>
  )
}

export default Navbar