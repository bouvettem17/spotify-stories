import styled from "styled-components";
import {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import PropTypes from "prop-types";

const CustomTableBody = styled(TableBody)`
  background-color: rgba(0, 0, 0, 1);
`;

const CustomTableCell = styled(TableCell)`
  border: none;
  font-family: "Montserrat", sans-serif;
  color: white;
  font-size: 25px;
`;

export function TabPanel(props) {
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
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <CustomTableCell align="center">{idx + 1}</CustomTableCell>
                  <CustomTableCell align="left">
                    <img src={song.album.images[2].url} alt="img cover" />
                  </CustomTableCell>
                  <CustomTableCell component="th" scope="row">
                    {song.name}
                  </CustomTableCell>
                  <CustomTableCell align="right">
                    {song.artists[0].name}
                  </CustomTableCell>
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

export const artistsNameFormatting = (artists) => {
  if (artists.length === 1) {
    return artists[0];
  } else {
    let returnString = "";
    artists.map((artist, idx) => {
      if (idx < artists.length - 1) {
        returnString += artist + ", ";
      } else {
        returnString += "and " + artist;
      }
      return null;
    });
    return returnString;
  }
};
