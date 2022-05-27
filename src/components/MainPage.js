import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logOut } from "../redux/slices/userSlice";
import "react-toastify/dist/ReactToastify.css"
import {
  Grid,
  StylesProvider,
  useTheme,
} from "@material-ui/core";
import {
  getTrackDataMonth,
  getTrackDataSixMonth,
  getTrackDataAllTime,
  makePlaylist,
  addSongsToPlaylist,
} from "../redux/slices/trackDataSlice";
import { TabPanel, artistsNameFormatting } from "../helpers/TracksTableHelper";
import { GreenButton } from "./LoginPage";
import { ToastContainer, toast} from 'react-toastify';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  flex-direction: column;
`;

const CustomGrid = styled(Grid)`
  background-color: black;
`;

const CustomGridItem = styled(Grid)`
  min-height: 200px;
  color: white;
  padding-top: 40px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const WelcomeTitle = styled(Typography)`
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 550;
  padding-top: 40px;
  padding-bottom: 50px;
  background-color: black;
`;

const TopDescriptionText = styled(Typography)`
  color: rgb(176, 38, 255);
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 30px;
`;

const TopDescriptionData = styled(Typography)`
  color: white;
  font-family: "Montserrat", sans-serif;
  font-weight: 700;
  font-size: 30px;
`;

const TopDescriptionArtist = styled(Typography)`
  color: rgb(176, 38, 255);
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 22px;
  padding-bottom: 20px;
`;

const CustomLargeAlbumCoverImg = styled.img`
  width: 350px;
  border-radius: 30px;
`;

const TableBox = styled(Box)`
  padding-top: 40px;
`;


const AlbumWrapper = styled.div`
    transform: ${props => props.active ? "scale(1.1)" : "scale(0.5)"};
    transition: transform 300ms;
    opacity: ${props => props.active ? 1 : 0.5}

`

const MainPage = () => {
  const topMonthTracks = useSelector(
    (state) => state.trackData.topMonthlyTracks
  );
  const topSixMonthTracks = useSelector(
    (state) => state.trackData.topSixMonthTracks
  );
  const topAllTimeTracks = useSelector(
    (state) => state.trackData.topAllTimeTracks
  );
  const topMonthTrack = useSelector((state) => state.trackData.topMonthTrack);
  const topSixMonthTrack = useSelector(
    (state) => state.trackData.topSixMonthTrack
  );
  const topAllTimeTrack = useSelector(
    (state) => state.trackData.topAllTimeTrack
  );
  const monthDataStatus = useSelector(
    (state) => state.trackData.monthDataStatus
  );
  const sixMonthDataStatus = useSelector(
    (state) => state.trackData.sixMonthDataStatus
  );
  const allTimeDataStatus = useSelector(
    (state) => state.trackData.allTimeDataStatus
  );
  const playListCreationStatus = useSelector(
    (state) => state.trackData.playlistCreationStatus
  );
  const addSongsStatus = useSelector(
    (state) => state.trackData.addSongsStatus
  )

  const createdPlayListId = useSelector((state) => state.trackData.playlistId);
  const userId = useSelector((state) => state.user.userProfile.userId);
  const theme = useTheme();
  const dispatch = useDispatch();



  useEffect(() => {
    if (
      monthDataStatus === "failed" ||
      sixMonthDataStatus === "failed" ||
      allTimeDataStatus === "failed"
    ) {
      localStorage.removeItem("access_token");
      dispatch(logOut());
    }
  }, [monthDataStatus, sixMonthDataStatus, allTimeDataStatus, dispatch]);

  useEffect(() => {
    dispatch(getTrackDataMonth());
    dispatch(getTrackDataSixMonth());
    dispatch(getTrackDataAllTime());
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (playListCreationStatus === "success") {
      let songUris = [];
      const playlistId = createdPlayListId;
      if (imageIndex === 0) {
        songUris = topMonthTracks.map((song, idx) => song.uri);
      } else if (imageIndex === 1) {
        songUris = topSixMonthTracks.map((song, idx) => song.uri);
      } else {
        songUris = topAllTimeTracks.map((song, idx) => song.uri);
      }
      dispatch(addSongsToPlaylist({ playlistId, songUris }));
    }else if (playListCreationStatus === "failed") {
      toast.warn("This site is still in development mode, contact creator for playlist creation functionality", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }, [playListCreationStatus]);

  useEffect(() => {
    if (addSongsStatus === 'success') {
      toast.success("Your playlist is created. Check your Spotify!", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      }) 
    }
  }, [addSongsStatus])

  const artistsForTopChartsMonth = artistsNameFormatting(topMonthTrack.artists);
  const artistsForTopChartsSixMonth = artistsNameFormatting(
    topSixMonthTrack.artists
  );
  const artistsForTopChartsAllTime = artistsNameFormatting(
    topAllTimeTrack.artists
  );


  const [imageIndex, setImageIndex] = useState(1)

  return (
    <>
      <StylesProvider injectFirst>
        <StyledWrapper>
          <WelcomeTitle variant="h1">Your Top Tracks</WelcomeTitle>
          <Box sx={{ bgcolor: "black", width: "60%" }}>
            <CustomGrid container>
              <CustomGridItem item xs={4}>
                <AlbumWrapper active={imageIndex === 0}>
                  <CustomLargeAlbumCoverImg onClick={() => setImageIndex(0)} src={topMonthTrack.albumImgUrl} />
                  <TopDescriptionText variant="h6">
                    Month
                  </TopDescriptionText>
                </AlbumWrapper>
              </CustomGridItem>
              <CustomGridItem item xs={4}>
                <AlbumWrapper active={imageIndex === 1}>
                  <CustomLargeAlbumCoverImg onClick={() => setImageIndex(1)} src={topSixMonthTrack.albumImgUrl} />
                  <TopDescriptionText variant="h6">
                    Six Months
                  </TopDescriptionText>
                </AlbumWrapper>
              </CustomGridItem>
              <CustomGridItem item xs={4}>
                <AlbumWrapper active={imageIndex === 2}>
                  <CustomLargeAlbumCoverImg onClick={() => setImageIndex(2)} src={topAllTimeTrack.albumImgUrl} />
                  <TopDescriptionText variant="h6">
                    All Time
                  </TopDescriptionText>
                </AlbumWrapper>
              </CustomGridItem>
            </CustomGrid>
            <CustomGrid container>
              {imageIndex === 0 ?
                <CustomGridItem
                  item
                  xs={12}
                >
                  <TopDescriptionText variant="h6">
                    Your Top Track of the Last Month
                  </TopDescriptionText>
                  <TopDescriptionData variant="h6">
                    {topMonthTrack.name}
                  </TopDescriptionData>
                  <TopDescriptionArtist variant="h6">
                    {artistsForTopChartsMonth}
                  </TopDescriptionArtist>
                </CustomGridItem> :
                imageIndex === 1 ?
                  <CustomGridItem
                    item
                    xs={12}
                  >
                    <TopDescriptionText variant="h6">
                      Your Top Track of the Last 6 Months
                    </TopDescriptionText>
                    <TopDescriptionData variant="h6">
                      {topSixMonthTrack.name}
                    </TopDescriptionData>
                    <TopDescriptionArtist variant="h6">
                      {artistsForTopChartsSixMonth}
                    </TopDescriptionArtist>
                  </CustomGridItem> :
                  <CustomGridItem item xs={12}>
                    <TopDescriptionText variant="h6">
                      Your Top Track of All Time
                    </TopDescriptionText>
                    <TopDescriptionData variant="h6">
                      {topAllTimeTrack.name}
                    </TopDescriptionData>
                    <TopDescriptionArtist variant="h6">
                      {artistsForTopChartsAllTime}
                    </TopDescriptionArtist>
                  </CustomGridItem>
              }
            </CustomGrid>
          </Box>
            <WelcomeTitle variant="h1">Your {imageIndex === 0 ? "Monthly" : imageIndex === 1 ? "Six Month" : "All Time"} Leaderboard</WelcomeTitle>
            <GreenButton
              onClick={() => dispatch(makePlaylist({ userId, imageIndex }))}
            >
              Make Playlist
            </GreenButton>
            <TableBox sx={{ bgcolor: "black", width: "60%" }}>
                <TabPanel
                  value={imageIndex}
                  songs={topMonthTracks}
                  index={0}
                  dir={theme.direction}
                >
                  {imageIndex}
                </TabPanel>
                <TabPanel
                  value={imageIndex}
                  songs={topSixMonthTracks}
                  index={1}
                  dir={theme.direction}
                >
                  {imageIndex}
                </TabPanel>
                <TabPanel
                  value={imageIndex}
                  songs={topAllTimeTracks}
                  index={2}
                  dir={theme.direction}
                >
                  {imageIndex}
                </TabPanel>
            </TableBox>
        </StyledWrapper>
      </StylesProvider>
      <ToastContainer/>
    </>
  );
};

export default MainPage;
