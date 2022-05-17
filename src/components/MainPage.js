import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, logOut } from "../redux/slices/userSlice";
import {
  AppBar,
  Grid,
  StylesProvider,
  Tab,
  Tabs,
  useTheme,
} from "@material-ui/core";
import {
  getTrackDataMonth,
  getTrackDataSixMonth,
  getTrackDataAllTime,
  makePlaylist,
  addSongsToPlaylist,
} from "../redux/slices/trackDataSlice";
import SwipeableViews from "react-swipeable-views/lib/SwipeableViews";
import { TabPanel, artistsNameFormatting } from "../helpers/TracksTableHelper";
import { GreenButton } from "./LoginPage";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  flex-direction: column;
`;

const CustomGrid = styled(Grid)`
  background-color: black;
  padding-top: 40px;
`;

const CustomGridItem = styled(Grid)`
  min-height: 400px;
  color: white;
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
  background-color: black;
`;

const TopDescriptionText = styled(Typography)`
  color: rgb(176, 38, 255);
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 30px;
  padding-bottom: 40px;
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

const CustomBoxForDivider = styled(Box)`
  border-top: 2px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`;
const TableBox = styled(Box)`
  padding-top: 40px;
`;

const CustomTabs = styled(Tabs)`
  background-color: black;
  text-color: rgb(176, 38, 255);
  & .PrivateTabIndicator-root-1 {
    background-color: rgb(176, 38, 255) !important;
  }
`;

const CustomTab = styled(Tab)`
  color: rgb(176, 38, 255);
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 18px;
`;

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

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
  const createdPlayListId = useSelector((state) => state.trackData.playlistId);
  const userId = useSelector((state) => state.user.userProfile.userId);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

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
      if (value === 0) {
        songUris = topMonthTracks.map((song, idx) => song.uri);
      } else if (value === 1) {
        songUris = topSixMonthTracks.map((song, idx) => song.uri);
      } else {
        songUris = topAllTimeTracks.map((song, idx) => song.uri);
      }
      dispatch(addSongsToPlaylist({ playlistId, songUris }));
    }
  }, [playListCreationStatus]);

  const artistsForTopChartsMonth = artistsNameFormatting(topMonthTrack.artists);
  const artistsForTopChartsSixMonth = artistsNameFormatting(
    topSixMonthTrack.artists
  );
  const artistsForTopChartsAllTime = artistsNameFormatting(
    topAllTimeTrack.artists
  );

  return (
    <>
      <StylesProvider injectFirst>
        <StyledWrapper>
          <WelcomeTitle variant="h1">Your Top Tracks</WelcomeTitle>
          <Box sx={{ bgcolor: "black", width: "60%" }}>
            <CustomGrid container>
              <CustomGridItem
                item
                style={{ borderBottom: "2px solid white" }}
                xs={6}
              >
                <TopDescriptionText variant="h6">
                  Your Top Track of the Last Month is:
                </TopDescriptionText>
                <TopDescriptionData variant="h6">
                  {topMonthTrack.name}
                </TopDescriptionData>
                <TopDescriptionArtist variant="h6">
                  {artistsForTopChartsMonth}
                </TopDescriptionArtist>
              </CustomGridItem>
              <CustomGridItem
                item
                style={{ borderBottom: "2px solid white" }}
                xs={6}
              >
                <CustomLargeAlbumCoverImg src={topMonthTrack.albumImgUrl} />
              </CustomGridItem>
              <CustomGridItem
                item
                style={{ borderBottom: "2px solid white" }}
                xs={6}
              >
                <TopDescriptionText variant="h6">
                  Your Top Track of the Last 6 Months is:
                </TopDescriptionText>
                <TopDescriptionData variant="h6">
                  {topSixMonthTrack.name}
                </TopDescriptionData>
                <TopDescriptionArtist variant="h6">
                  {artistsForTopChartsSixMonth}
                </TopDescriptionArtist>
              </CustomGridItem>
              <CustomGridItem
                item
                style={{ borderBottom: "2px solid white" }}
                xs={6}
              >
                <CustomLargeAlbumCoverImg src={topSixMonthTrack.albumImgUrl} />
              </CustomGridItem>
              <CustomGridItem item xs={6}>
                <TopDescriptionText variant="h6">
                  Your Top Track of All Time is:
                </TopDescriptionText>
                <TopDescriptionData variant="h6">
                  {topAllTimeTrack.name}
                </TopDescriptionData>
                <TopDescriptionArtist variant="h6">
                  {artistsForTopChartsAllTime}
                </TopDescriptionArtist>
              </CustomGridItem>
              <CustomGridItem item xs={6}>
                <CustomLargeAlbumCoverImg src={topAllTimeTrack.albumImgUrl} />
              </CustomGridItem>
            </CustomGrid>
          </Box>
          <CustomBoxForDivider sx={{ bgcolor: "black", width: "100%" }}>
            <WelcomeTitle variant="h1">Your Leaderboard</WelcomeTitle>
            <TableBox sx={{ bgcolor: "black", width: "60%" }}>
              <AppBar position="static">
                <CustomTabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="inherit"
                  variant="fullWidth"
                  aria-label="full width tabs example"
                >
                  <CustomTab label="Last Month" {...a11yProps(0)} />
                  <CustomTab label="Last 6 Months" {...a11yProps(1)} />
                  <CustomTab label="All Time" {...a11yProps(2)} />
                </CustomTabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel
                  value={value}
                  songs={topMonthTracks}
                  index={0}
                  dir={theme.direction}
                >
                  {value}
                </TabPanel>
                <TabPanel
                  value={value}
                  songs={topSixMonthTracks}
                  index={1}
                  dir={theme.direction}
                >
                  {value}
                </TabPanel>
                <TabPanel
                  value={value}
                  songs={topAllTimeTracks}
                  index={2}
                  dir={theme.direction}
                >
                  {value}
                </TabPanel>
              </SwipeableViews>
            </TableBox>
            <GreenButton
              onClick={() => dispatch(makePlaylist({ userId, value }))}
            >
              Make Playlist
            </GreenButton>
          </CustomBoxForDivider>
        </StyledWrapper>
      </StylesProvider>
    </>
  );
};

export default MainPage;
