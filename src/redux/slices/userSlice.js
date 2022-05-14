import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import styled from 'styled-components'



export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    loggedLoading: false
  },
  reducers: {
    logIn: state => {
      state.loggedIn = true
    },
    logOut: state => {
      state.loggedIn = false
      state.loggedLoading = false
    },
    loading: (state, action) => {
      console.log(action)
      state.loggedLoading = action.payload
    } 

  }
})

export const { logIn, logOut, loading } = userSlice.actions

export default userSlice.reducer