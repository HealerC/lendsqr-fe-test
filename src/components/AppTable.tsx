import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAppContext } from "../context/context";
import { UserDetails } from "../context/interfaces";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import eyeMenuIcon from "../assets/icons/eye-menu.svg";
import sortIcon from "../assets/icons/sort-results-button.svg";
import moreActionsIcon from "../assets/icons/more-actions.svg";
import userTimesMenuIcon from "../assets/icons/user-times-menu.svg";
import userCheckMenuIcon from "../assets/icons/user-check-menu.svg";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import FilterModal from "./FilterModal";
import TableLimiterComponent from "./TableLimiterComponent";
import TablePagination from "./TablePagination";
import Skeleton from "@mui/material/Skeleton";
import "./AppTable.scss";
import { limitResultCount, sorter } from "../utils";
import dayjs from "dayjs";

// The data on the table should mirror that in `UserDetails` state
// but should omit some properties
type Data = Omit<
  UserDetails,
  | "accountBalance"
  | "accountNumber"
  | "profile"
  | "guarantor"
  | "socials"
  | "education"
>;

// The table header string that is displayed in the table and the
// property variable name as it is in the state
type TableHeader = [string, keyof Data];
const tableHeaderList: TableHeader[] = [
  ["organization", "orgName"],
  ["username", "userName"],
  ["email", "email"],
  ["phone number", "phoneNumber"],
  ["date joined", "createdAt"],
  ["status", "status"],
];

// Map the entire userlist and get only that
// needed to be rendered on the table
function getTableData(list: UserDetails[]): Data[] {
  const rows = list.map((value) => ({
    orgName: value.orgName,
    userName: value.userName,
    email: value.email,
    phoneNumber: value.phoneNumber,
    createdAt: value.createdAt,
    status: value.status,
    id: value.id,
  }));
  return rows;
}

/**
 * Format date to conform to that given in the design
 */
function getDateString(dateString: string): string {
  return dayjs(dateString).format("MMM D, YYYY hh:mm A");
}

/*
 * The table doesn't render the state `userList` directly but the `filter.result`
 * This equals userList completely when there isn't any filtering going on but
 * it could change if the user is filtering the table by any or all of it's properties
 * e.g. username, organization, email etc.
 */
export default function BasicTable() {
  const {
    blacklistUser,
    activateUser,
    toggleFilterModal,
    sortUsers,
    sort,
    filter: { result },
    pagination: { page, usersPerPage },
    loading,
  } = useAppContext();
  const navigate = useNavigate();

  // The sorting directive is triggered by the icon on the table headers
  // and saved in the state and by the value saved in state, the filtered result
  // is sorted to be displayed
  let displayedResult = sort.by ? sorter(result, sort.by, sort.desc) : result;

  // The filtered and sorted result is then spliced to the particular results
  // that should be on a specified page saved in state also
  let splicedResult = limitResultCount(displayedResult, page, usersPerPage);

  // filtered, sorted and limited result mapped only to contain values that
  // will be rendered by the table
  const rows = getTableData(splicedResult);

  // The menu rendered by clicking the 'three dotted icon' is anchored
  // to the particular table/cell in which it is clicked which corresponds to
  // `element` below. The `userId` corresponds to the user id of the row
  const [anchorData, setAnchorData] = useState<null | {
    element: HTMLElement;
    userId: string;
  }>(null);

  // Handle opening the extra actions menu as defined above
  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: string
  ) => {
    setAnchorData({ element: event.currentTarget, userId });
  };

  // Handle closing the extra actions menu
  const handleClose = () => {
    setAnchorData(null);
  };

  return (
    <div style={{ position: "relative" }} className="app-table-wrapper">
      <TableContainer component={Paper} className="app-table-container">
        {/* The toolbar contains a button which triggers the filter modal. However
        it only displays in small screen devices/mobile as the search bar search button
        at the menu bar triggers the filter modal for larger screens. */}
        <Toolbar className="filter-button-mobile">
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={toggleFilterModal}
          >
            Filter users
          </Button>
        </Toolbar>

        {/* App Table */}
        <Table sx={{ minWidth: 650 }} className="app-table">
          <TableHead>
            <TableRow>
              {/* `spacers` role is just to create a bottom line that does not span the 
              entire length of the table  */}
              <TableCell className="spacers"></TableCell>

              {/* Table header. Displaying [0], while the property in the state is [1] */}
              {tableHeaderList.map((thItem) => (
                <TableCell key={thItem + "x1"} className="theader">
                  {thItem[0]}

                  {/* Gives it classes to display the icon appropriately if table
                  is not being sorted by it, or it is being sorted ascending
                  or descending order */}
                  <IconButton
                    className={
                      sort.by === thItem[1] && sort.desc
                        ? "sort-icon sorted-desc"
                        : sort.by === thItem[1] && !sort.desc
                        ? "sort-icon sorted-asc"
                        : "sort-icon"
                    }
                    // Sort the table by the property
                    onClick={() => sortUsers(thItem[1])}
                  >
                    <img src={sortIcon} alt="sort-table-icon" />
                  </IconButton>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render skeleton component for each cell (9 cells) for each 10 rows
            if data hasn't yet been fetched and saved in state */}
            {loading &&
              Array(10)
                .fill(undefined)
                .map((_value, index) => (
                  <TableRow key={"row" + index}>
                    {Array(9)
                      .fill(undefined)
                      .map((_value2, index2) => (
                        <TableCell key={"cell" + index2}>
                          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        </TableCell>
                      ))}
                  </TableRow>
                ))}

            {/* If loading is false and rows exist, show rows */}
            {!loading &&
              rows &&
              rows.map((row) => (
                <TableRow
                  key={row.userName}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* Just to prevent the bottom horizontal line of each row
                  from spanning the entire width of the table */}
                  <TableCell className="spacers"></TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    className="first-row-cell"
                  >
                    {row.orgName}
                  </TableCell>
                  <TableCell>{row.userName}</TableCell>
                  <TableCell className="email">
                    <a
                      href={`mailto:${row.email}`}
                      // Enable `@<domain-name>.com` to break to the next line
                      dangerouslySetInnerHTML={{
                        __html: row.email.replace("@", "<wbr/>@"),
                      }}
                    ></a>
                  </TableCell>
                  <TableCell className="phone-number">
                    <a href={`tel:${row.phoneNumber}`}>{row.phoneNumber}</a>
                  </TableCell>
                  <TableCell className="date">
                    {getDateString(row.createdAt)}
                  </TableCell>
                  <TableCell className="status">
                    <Chip label={row.status} className={row.status} />
                  </TableCell>
                  {/* The three dots at the end of every row which opens a menu
                  where the user can perform extra actions (see more details,
                  activate/blacklist a user) */}
                  <TableCell>
                    <IconButton
                      onClick={(event) => {
                        handleOpen(event, row.id);
                      }}
                    >
                      <img src={moreActionsIcon} alt="extra actions" />
                    </IconButton>
                  </TableCell>
                  <TableCell className="spacers"></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* The filter modal that is displayed only when the search button at 
        the menu bar OR the filter users button on the table on small devices is clicked */}
        <FilterModal />
      </TableContainer>

      {/* Select input to set the users to show per page and Pagination */}
      <Toolbar className="table-bottom-toolbar">
        <TableLimiterComponent />
        <TablePagination />
      </Toolbar>

      {/* Menu that shows extra actions the user (more details, 
          activate/blacklist user) */}
      <Menu
        anchorEl={anchorData?.element}
        open={Boolean(anchorData)}
        onClose={handleClose}
        className="extra-actions"
      >
        {/* Navigate to the necessary route to see more details about a user */}
        <MenuItem
          onClick={() => {
            if (!anchorData || !anchorData.userId) {
              throw new Error("UserId is invalid");
            }
            navigate(`/users/${anchorData.userId}`);
            handleClose();
          }}
        >
          <ListItemIcon>
            <img src={eyeMenuIcon} alt="View more details about user" />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>

        {/* Blacklist user on the given row*/}
        <MenuItem
          onClick={() => {
            if (!anchorData || !anchorData.userId) {
              throw new Error("UserId is invalid");
            }
            blacklistUser(anchorData.userId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <img src={userTimesMenuIcon} alt="blacklist a user" />
          </ListItemIcon>
          <ListItemText>Blacklist User</ListItemText>
        </MenuItem>

        {/* Activate user */}
        <MenuItem
          onClick={() => {
            if (!anchorData || !anchorData.userId) {
              throw new Error("UserId is invalid");
            }
            activateUser(anchorData.userId);
            handleClose();
          }}
        >
          <ListItemIcon>
            <img src={userCheckMenuIcon} alt="activate a user" />
          </ListItemIcon>
          <ListItemText>Activate User</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
