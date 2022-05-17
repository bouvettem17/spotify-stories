import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrackDataMonth = createAsyncThunk(
  "/user/tracks/month",
  async () => {
    let token = localStorage.getItem("access_token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        time_range: "short_term",
        limit: "30",
      },
    };

    return axios
      .get(`https://api.spotify.com/v1/me/top/tracks`, config)
      .then((res) => {
        return res.data;
      });
  }
);

export const getTrackDataSixMonth = createAsyncThunk(
  "/user/tracks/sixMonth",
  async () => {
    let token = localStorage.getItem("access_token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        time_range: "medium_term",
        limit: "30",
      },
    };

    return axios
      .get(`https://api.spotify.com/v1/me/top/tracks`, config)
      .then((res) => {
        return res.data;
      });
  }
);

export const getTrackDataAllTime = createAsyncThunk(
  "/user/tracks/allTime",
  async () => {
    let token = localStorage.getItem("access_token");
    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
      params: {
        time_range: "long_term",
        limit: "30",
      },
    };

    return axios
      .get(`https://api.spotify.com/v1/me/top/tracks`, config)
      .then((res) => {
        return res.data;
      });
  }
);

export const makePlaylist = createAsyncThunk(
  "user/playlist/create",
  async (requestData) => {
    let token = localStorage.getItem("access_token");
    let { userId, value } = requestData;
    let name = "";
    let description = "";

    if (value === 0) {
      name = "Your Monthly Top Tracks";
      description =
        "Enjoy a playlist composed of your top songs from the last month! (Courtesy of Spotify Stories)";
    } else if (value === 1) {
      name = "Your Six Month's Top Tracks";
      description =
        "Enjoy a playlist composed of your top songs from the last six months! (Courtesy of Spotify Stories)";
    } else {
      name = "Your All Time Top Tracks";
      description =
        "Enjoy a playlist composed of your top songs of all time! (Courtesy of Spotify Stories)";
    }

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let body = {
      name: name,
      description: description,
      public: true,
    };

    return axios
      .post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        body,
        config
      )
      .then((res) => {
        return res.data;
      });
  }
);

export const addSongsToPlaylist = createAsyncThunk(
  "user/playlist/add/songs",
  async (requestData) => {
    let token = localStorage.getItem("access_token");
    let { playlistId, songUris } = requestData;

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let body = {
      uris: songUris,
    };

    return axios
      .post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        body,
        config
      )
      .then((res) => {
        return res.data;
      });
  }
);

export const trackDataSlice = createSlice({
  name: "trackData",
  initialState: {
    topMonthlyTracks: [],
    topSixMonthTracks: [],
    topAllTimeTracks: [],
    topMonthTrack: {
      name: null,
      albumImgUrl: null,
      artists: [],
    },
    topSixMonthTrack: {
      name: null,
      albumImgUrl: null,
      artists: [],
    },
    topAllTimeTrack: {
      name: null,
      albumImgUrl: null,
      artists: [],
    },
    monthDataStatus: "",
    sixMonthDataStatus: "",
    allTimeDataStatus: "",
    playlistCreationStatus: "",
    playlistId: "",
    addSongsStatus: "",
  },
  extraReducers: {
    [getTrackDataMonth.pending]: (state) => {
      state.monthDataStatus = "loading";
    },
    [getTrackDataMonth.fulfilled]: (state, action) => {
      state.monthDataStatus = "success";
      state.topMonthlyTracks = action.payload.items;
      state.topMonthTrack.name = action.payload.items[0].name;
      state.topMonthTrack.albumImgUrl =
        action.payload.items[0].album.images[0].url;
      state.topMonthTrack.artists = action.payload.items[0].artists.map(
        (artist) => artist.name
      );
    },
    [getTrackDataMonth.rejected]: (state) => {
      state.monthDataStatus = "failed";
    },
    [getTrackDataSixMonth.pending]: (state) => {
      state.sixMonthDataStatus = "loading";
    },
    [getTrackDataSixMonth.fulfilled]: (state, action) => {
      state.sixMonthDataStatus = "success";
      state.topSixMonthTracks = action.payload.items;
      state.topSixMonthTrack.name = action.payload.items[0].name;
      state.topSixMonthTrack.albumImgUrl =
        action.payload.items[0].album.images[0].url;
      state.topSixMonthTrack.artists = action.payload.items[0].artists.map(
        (artist) => artist.name
      );
    },
    [getTrackDataSixMonth.rejected]: (state) => {
      state.sixMonthDataStatus = "failed";
    },
    [getTrackDataAllTime.pending]: (state) => {
      state.allTimeDataStatus = "loading";
    },
    [getTrackDataAllTime.fulfilled]: (state, action) => {
      state.allTimeDataStatus = "success";
      state.topAllTimeTracks = action.payload.items;
      state.topAllTimeTrack.name = action.payload.items[0].name;
      state.topAllTimeTrack.albumImgUrl =
        action.payload.items[0].album.images[0].url;
      state.topAllTimeTrack.artists = action.payload.items[0].artists.map(
        (artist) => artist.name
      );
    },
    [getTrackDataAllTime.rejected]: (state) => {
      state.allTimeDataStatus = "failed";
    },
    [makePlaylist.pending]: (state) => {
      state.playlistCreationStatus = "loading";
    },
    [makePlaylist.fulfilled]: (state, action) => {
      state.playlistCreationStatus = "success";
      state.playlistId = action.payload.id;
    },
    [makePlaylist.rejected]: (state) => {
      state.playListCreationStatus = "failed";
    },
    [addSongsToPlaylist.pending]: (state) => {
      state.addSongsStatus = "loading";
    },
    [addSongsToPlaylist.fulfilled]: (state, action) => {
      state.addSongsStatus = "success";
      state.playListCreationStatus = "";
      state.playlistId = "";
    },
    [addSongsToPlaylist.rejected]: (state) => {
      state.addSongsStatus = "failed";
    },
  },
});

export const { setMonthDataStatus } = trackDataSlice.actions;

export default trackDataSlice.reducer;

