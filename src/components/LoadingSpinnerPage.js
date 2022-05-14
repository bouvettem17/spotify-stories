import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';
import { StylesProvider } from '@material-ui/core';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  background-color: black;
  height: 100vh;
`

const StyledSpinner = styled(CircularProgress)`
  align-self: center;
  size: 100;
  color: rgb(176, 38, 255)
`


const LoadingSpinnerPage = () => {
  return (
    <StylesProvider injectFirst>
      <StyledWrapper>
        <StyledSpinner size={100}/>
      </StyledWrapper>
    </StylesProvider>
  )
}

export default LoadingSpinnerPage