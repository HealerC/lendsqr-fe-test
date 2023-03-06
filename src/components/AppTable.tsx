import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useAppContext } from "../context/context";
import { UserDetails, Status } from "../context/interfaces";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Toolbar from "@mui/material/Toolbar";
import sortIcon from "../assets/icons/sort-results-button.svg";
import moreActionsIcon from "../assets/icons/more-actions.svg";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import eyeMenuIcon from "../assets/icons/eye-menu.svg";
import userTimesMenuIcon from "../assets/icons/user-times-menu.svg";
import userCheckMenuIcon from "../assets/icons/user-check-menu.svg";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import FilterModal from "./FilterModal";
import TableLimiterComponent from "./TableLimiterComponent";
import TablePagination from "./TablePagination";
import "./AppTable.scss";

type Data = Omit<
  UserDetails,
  | "accountBalance"
  | "accountNumber"
  | "profile"
  | "guarantor"
  | "socials"
  | "education"
>;
type TableHeader = [string, keyof Data];
const tableHeaderList: TableHeader[] = [
  ["organization", "orgName"],
  ["username", "userName"],
  ["email", "email"],
  ["phone number", "phoneNumber"],
  ["date joined", "createdAt"],
  ["status", "status"],
];

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
function getDateString(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

export default function BasicTable() {
  const {
    userList,
    blacklistUser,
    activateUser,
    toggleFilterModal,
    sortUsers,
    sort,
    filter: { result },
    pagination: { page, usersPerPage },
  } = useAppContext();
  const navigate = useNavigate();
  let displayedResult = sort.by ? sorter(result, sort.by, sort.desc) : result;
  let splicedResult = limitResultCount(displayedResult, page, usersPerPage);
  const rows = getTableData(splicedResult);

  const [anchorData, setAnchorData] = useState<null | {
    element: HTMLElement;
    userId: string;
  }>(null);

  const handleOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userId: string
  ) => {
    setAnchorData({ element: event.currentTarget, userId });
  };
  const handleClose = () => {
    setAnchorData(null);
  };
  return (
    <div style={{ position: "relative" }} className="app-table-wrapper">
      <TableContainer component={Paper} className="app-table-container">
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
        <Table sx={{ minWidth: 650 }} className="app-table">
          <TableHead>
            <TableRow>
              <TableCell className="spacers"></TableCell>
              {tableHeaderList.map((thItem) => (
                <TableCell key={thItem + "x1"} className="theader">
                  {thItem[0]}
                  <IconButton
                    className={
                      sort.by === thItem[1] && sort.desc
                        ? "sort-icon sorted-desc"
                        : sort.by === thItem[1] && !sort.desc
                        ? "sort-icon sorted-asc"
                        : "sort-icon"
                    }
                    onClick={() => sortUsers(thItem[1])}
                  >
                    <img src={sortIcon} />
                  </IconButton>
                </TableCell>
              ))}
              {/* <TableCell></TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.userName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
                <TableCell>
                  <IconButton
                    onClick={(event) => {
                      handleOpen(event, row.id);
                    }}
                  >
                    <img src={moreActionsIcon} />
                  </IconButton>
                </TableCell>
                <TableCell className="spacers"></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <FilterModal />
      </TableContainer>
      <Toolbar className="table-bottom-toolbar">
        <TableLimiterComponent />
        <TablePagination />
      </Toolbar>
      <Menu
        anchorEl={anchorData?.element}
        open={Boolean(anchorData)}
        onClose={handleClose}
        className="extra-actions"
      >
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
            <img src={eyeMenuIcon} />
          </ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
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
            <img src={userTimesMenuIcon} />
          </ListItemIcon>
          <ListItemText>Blacklist User</ListItemText>
        </MenuItem>
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
            <img src={userCheckMenuIcon} />
          </ListItemIcon>
          <ListItemText>Activate User</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

function sorter(
  list: UserDetails[],
  by: keyof UserDetails,
  desc: boolean = true
): UserDetails[] {
  switch (by) {
    case "orgName":
    case "userName":
    case "email":
    case "phoneNumber":
    case "createdAt":
      return list.sort((a, b) => {
        if (a[by] < b[by]) {
          if (!desc) return -1;
          return +1;
        }
        if (a[by] > b[by]) {
          if (!desc) return +1;
          return -1;
        }
        return 0;
      });
    case "status":
      return list.sort((a, b) => {
        if (a.status === b.status) {
          return 0;
        }
        const orderedStatusValues = [
          "blacklisted",
          "pending",
          "inactive",
          "active",
        ];
        if (!desc)
          return (
            orderedStatusValues.indexOf(a.status) -
            orderedStatusValues.indexOf(b.status)
          );
        return (
          orderedStatusValues.indexOf(b.status) -
          orderedStatusValues.indexOf(a.status)
        );
      });
    default:
      return list;
  }
}

function limitResultCount(
  list: UserDetails[],
  page: number,
  itemsPerPage: number
) {
  let start = page * itemsPerPage - itemsPerPage;
  let tempEnd = start + itemsPerPage;
  let end = tempEnd >= list.length ? list.length + 1 : tempEnd;

  return list.slice(start, end);
}
