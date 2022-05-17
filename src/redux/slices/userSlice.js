import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserProfile = createAsyncThunk("user/profile", async () => {
  let token = localStorage.getItem("access_token");

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  return axios.get("https://api.spotify.com/v1/me", config).then((res) => {
    return res.data;
  });
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedIn: false,
    loggedLoading: false,
    userProfileStatus: "",
    userProfile: {
      displayName: "",
      userId: "",
      uri: "",
    },
  },
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
      state.loggedLoading = false;
    },
    loading: (state, action) => {
      state.loggedLoading = action.payload;
    },
  },
  extraReducers: {
    [getUserProfile.pending]: (state) => {
      state.userProfileStatus = "loading";
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.userProfileStatus = "fulfilled";
      state.userProfile.displayName = action.payload.display_name;
      state.userProfile.userId = action.payload.id;
      state.userProfile.uri = action.payload.uri;
    },
    [getUserProfile.rejected]: (state) => {
      state.userProfileStatus = "failed";
    },
  },
});

export const { logIn, logOut, loading } = userSlice.actions;

export default userSlice.reducer;

