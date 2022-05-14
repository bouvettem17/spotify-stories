import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography';
import Box from '@mui/material/Box';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/slices/userSlice';
import { AppBar, Grid, Paper, StylesProvider, Tab, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, useTheme } from '@material-ui/core';
import { getTrackDataMonth, getTrackDataSixMonth, getTrackDataAllTime } from '../redux/slices/trackDataSlice';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views/lib/SwipeableViews';

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
`

const CustomGridItem = styled(Grid)`
  min-height: 400px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const WelcomeTitle = styled(Typography)`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 550;
  padding-top: 40px;
  background-color: black;
`

const TopDescriptionText = styled(Typography)`
color: rgb(176, 38, 255);
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 30px;
  padding-bottom: 40px;
`

const TopDescriptionData = styled(Typography)`
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 30px;
`

const TopDescriptionArtist = styled(Typography)`
  color: rgb(176, 38, 255);
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 22px;
  padding-bottom: 20px;
`

const CustomLargeAlbumCoverImg = styled.img`
  width: 350px;
  border-radius: 30px;
`

const CustomBoxForDivider = styled(Box)`
  border-top: 2px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`
const TableBox = styled(Box)`
  padding-top: 40px;
`

const CustomTabs = styled(Tabs)`
  background-color: black;
  text-color: rgb(176, 38, 255);
  & .PrivateTabIndicator-root-1 {
    background-color: rgb(176, 38, 255) !important
  }
`

const CustomTab = styled(Tab)`
  color: rgb(176, 38, 255);
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 18px;
`

const CustomTableBody = styled(TableBody)`
  background-color: rgba(0, 0, 0, 1);
`

const CustomTableCell = styled(TableCell)`
  border: none;
  font-family: 'Montserrat', sans-serif;
  color: white;
  font-size: 25px;

  
`

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <CustomTableBody>
              {props.songs.map((song, idx) => (
                <TableRow
                  key={song.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <CustomTableCell align="center">{idx + 1}</CustomTableCell>
                  <CustomTableCell align="left">
                    <img src={song.album.images[2].url} alt="img cover"/>
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {song.name}
                  </CustomTableCell>
                  <CustomTableCell align="right">{song.artists[0].name}</CustomTableCell>
                </TableRow>
              ))}
            </CustomTableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const MainPage = () => {
  const topMonthTracks = useSelector((state) => state.trackData.topMonthlyTracks)
  const topSixMonthTracks = useSelector((state) => state.trackData.topSixMonthTracks)
  const topAllTimeTracks = useSelector((state) => state.trackData.topAllTimeTracks)
  const topMonthTrack = useSelector((state) => state.trackData.topMonthTrack)
  const topSixMonthTrack = useSelector((state) => state.trackData.topSixMonthTrack)
  const topAllTimeTrack = useSelector((state) => state.trackData.topAllTimeTrack)
  const monthDataStatus = useSelector((state) => state.trackData.monthDataStatus)
  const sixMonthDataStatus = useSelector((state) => state.trackData.sixMonthDataStatus)
  const allTimeDataStatus = useSelector((state) => state.trackData.allTimeDataStatus)
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const dispatch = useDispatch()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    if (monthDataStatus === 'failed' || sixMonthDataStatus === "failed" || allTimeDataStatus === "failed") {
      localStorage.removeItem("access_token")
      dispatch(logOut())
    }
  }, [monthDataStatus, sixMonthDataStatus, allTimeDataStatus, dispatch])

  useEffect(() => {
    dispatch(getTrackDataMonth())
    dispatch(getTrackDataSixMonth())
    dispatch(getTrackDataAllTime())
  }, [dispatch])

  const artistsNameFormatting = (artists) => {
    if (artists.length === 1) {
      return artists[0]
    } else {
      let returnString = ""
      console.log(artists.length)
      artists.map((artist, idx) => {
        if (idx < artists.length - 1) {
          returnString += artist + ", "
        } else {
          returnString += "and " + artist
        }
        return null;
      })
      return returnString;
    }
  }

  const artistsForTopChartsMonth = artistsNameFormatting(topMonthTrack.artists)
  const artistsForTopChartsSixMonth = artistsNameFormatting(topSixMonthTrack.artists)
  const artistsForTopChartsAllTime = artistsNameFormatting(topAllTimeTrack.artists)

  return (
    <>
      <StylesProvider injectFirst>
        <StyledWrapper>
          <WelcomeTitle variant="h1">
            Your Top Tracks
          </WelcomeTitle>
          <Box sx={{ bgcolor: 'black', width: '60%' }}>
            <CustomGrid container >
              <CustomGridItem item style={{ borderBottom: '2px solid white' }} xs={6}>
                <TopDescriptionText variant="h6">Your Top Track of the Last Month is:</TopDescriptionText>
                <TopDescriptionData variant="h6">{topMonthTrack.name}</TopDescriptionData>
                <TopDescriptionArtist variant="h6">{artistsForTopChartsMonth}</TopDescriptionArtist>
              </CustomGridItem>
              <CustomGridItem item style={{ borderBottom: '2px solid white' }} xs={6}>
                <CustomLargeAlbumCoverImg src={topMonthTrack.albumImgUrl} />
              </CustomGridItem>
              <CustomGridItem item style={{ borderBottom: '2px solid white' }} xs={6}>
                <TopDescriptionText variant="h6">Your Top Track of the Last 6 Months is:</TopDescriptionText>
                <TopDescriptionData variant="h6">{topSixMonthTrack.name}</TopDescriptionData>
                <TopDescriptionArtist variant="h6">{artistsForTopChartsSixMonth}</TopDescriptionArtist>
              </CustomGridItem>
              <CustomGridItem item style={{ borderBottom: '2px solid white' }} xs={6}>
                <CustomLargeAlbumCoverImg src={topSixMonthTrack.albumImgUrl} />
              </CustomGridItem>
              <CustomGridItem item xs={6}>
                <TopDescriptionText variant="h6">Your Top Track of All Time is:</TopDescriptionText>
                <TopDescriptionData variant="h6">{topAllTimeTrack.name}</TopDescriptionData>
                <TopDescriptionArtist variant="h6">{artistsForTopChartsAllTime}</TopDescriptionArtist>
              </CustomGridItem>
              <CustomGridItem item xs={6}>
                <CustomLargeAlbumCoverImg src={topAllTimeTrack.albumImgUrl} />
              </CustomGridItem>
            </CustomGrid>
          </Box>
          <CustomBoxForDivider sx={{ bgcolor: 'black', width: '100%' }} >
            <WelcomeTitle variant="h1">
              Your Leaderboard
            </WelcomeTitle>
            <TableBox sx={{ bgcolor: 'black', width: '60%' }}>
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
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} songs={topMonthTracks} index={0} dir={theme.direction}>
                  {value}
                </TabPanel>
                <TabPanel value={value} songs={topSixMonthTracks} index={1} dir={theme.direction}>
                  {value}
                </TabPanel>
                <TabPanel value={value} songs={topAllTimeTracks} index={2} dir={theme.direction}>
                  {value}
                </TabPanel>
              </SwipeableViews>
            </TableBox>
          </CustomBoxForDivider>
        </StyledWrapper>
      </StylesProvider>
    </>
  )
}

export default MainPage