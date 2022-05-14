import React from 'react';
import { Buffer } from 'buffer'
import { useDispatch } from 'react-redux';
import { logIn, loading } from '../redux/slices/userSlice';
import styled from 'styled-components';
import { StylesProvider, Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LoginPageBackgroundImg from "../resources/LoginPageBackground.png"


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: black;
    align-content: center;
    background-image: url(${LoginPageBackgroundImg});
    height: 100vh;
    background-size: 150%;
    background-repeat: no-repeat;
    background-position: 67% 55%
`;

const LoginButton = styled(Button)`
  min-width: 13%;
  align-self: center;
  border-radius: 30px;
  padding: 14px 32px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 15px;
  background-color: #7CFC00;
  &: hover {
    background-color: #00FF7F;
    transform:scale(1.1, 1.1);
  }
`

const WelcomeTitle = styled(Typography)`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  padding-bottom: 40px;
`

const DescriptionSubtitle = styled(Typography)`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 18px;
  padding-bottom: 40px
`

const TOKEN = "https://accounts.spotify.com/api/token";


const clientId = '0da1e15ef2214d378e018ec78ef99f7d'
const clientSecret = 'f83a6a44a9064a97adea9fadd7adb246'

var access_token = null;
var refresh_token = null

var redirectUri = 'https://bouvettem17.github.io/spotify-stories'


const LoginPage = () => {
  const dispatch = useDispatch()

  const requestAuthorization = () => {
    let url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}/&show_dialog=true&scope=user-top-read`
    window.location.href = url
  }

  function fetchAccessToken(code) {
    let body = "grant_type=authorization_code";
    body += "&code=" + code;
    body += "&redirect_uri=" + encodeURI('https://bouvettem17.github.io/spotify-stories/');
    body += "&client_id=" + clientId;
    body += "&client_secret=" + clientSecret;
    callAuthorizationApi(body);
  }

  function callAuthorizationApi(body) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TOKEN, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader('Authorization', 'Basic ' + Buffer.from(clientId + ":" + clientSecret).toString('base64'));
    xhr.send(body);
    xhr.onload = handleAuthorizationResponse;
  }

  function onPageLoad() {
    
    if (window.location.search.length > 0) {
      handleRedirect();
    }
    else {
      access_token = localStorage.getItem("access_token");
      if(access_token != null) {
        dispatch(logIn())
      }
    }
  }

  function handleRedirect() {
    dispatch(loading(true))
    let code = getCode();
    fetchAccessToken(code);
    window.history.pushState("", "", redirectUri); // remove param from url
  }

  function getCode() {
    let code = null;
    const queryString = window.location.search;
    if (queryString.length > 0) {
      const urlParams = new URLSearchParams(queryString);
      code = urlParams.get('code')
    }
    return code;
  }

  function handleAuthorizationResponse() {
    if (this.status === 200) {
      var data = JSON.parse(this.responseText);
      if (data.access_token !== undefined) {
        access_token = data.access_token;
        localStorage.setItem("access_token", access_token);
      }
      if (data.refresh_token !== undefined) {
        refresh_token = data.refresh_token;
        localStorage.setItem("refresh_token", refresh_token);
      }
      onPageLoad();
      console.log(localStorage.getItem("access_token"))
      dispatch(logIn())
      dispatch(loading(false))
    }
    else {
      console.log(this.responseText);
    }
  }

  return (
    <StylesProvider injectFirst>
      <StyledWrapper onLoad={onPageLoad()}>
        <WelcomeTitle variant="h1">
          Spotify Stories
        </WelcomeTitle>
        <DescriptionSubtitle>
          Learn more about your history on spotify.
        </DescriptionSubtitle>
        <LoginButton onClick={() => requestAuthorization()}>Login With Spotify</LoginButton>
      </StyledWrapper>
    </StylesProvider>
  )
}

export default LoginPage