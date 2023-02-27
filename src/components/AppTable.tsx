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
import Modal from "@mui/material/Modal";
// import FilterModal from "./TestModalComponents";
import FilterModal from "./FilterModal";
import LimiterComponent from "./LimiterComponent";
import TablePagination from "./TablePagination";

interface Data {
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: Date;
  status: Status;
  id: string;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
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
function getDateString(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleDateString(undefined, options);
}

export default function BasicTable() {
  const { userList, blacklistUser, activateUser, toggleFilterModal } =
    useAppContext();
  const navigate = useNavigate();
  const rows = getTableData(userList);

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
    <div style={{ position: "relative" }}>
      <TableContainer component={Paper} sx={{ position: "relative" }}>
        <Toolbar>
          <Button variant="outlined" onClick={toggleFilterModal}>
            Filter users
          </Button>
        </Toolbar>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                organization{" "}
                <IconButton>
                  <img src={sortIcon} />
                </IconButton>
              </TableCell>
              <TableCell>
                username
                <IconButton>
                  <img src={sortIcon} />
                </IconButton>
              </TableCell>
              <TableCell>
                email
                <IconButton>
                  <img src={sortIcon} />
                </IconButton>
              </TableCell>
              <TableCell>
                phone number
                <IconButton>
                  <img src={sortIcon} />
                </IconButton>
              </TableCell>
              <TableCell>
                date joined
                <IconButton>
                  <img src={sortIcon} />
                </IconButton>
              </TableCell>
              <TableCell>
                status
                <IconButton>
                  <img src={sortIcon} />
                </IconButton>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.userName}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.orgName}
                </TableCell>
                <TableCell>{row.userName}</TableCell>
                <TableCell>
                  <a href={`mailto:${row.email}`}>{row.email}</a>
                </TableCell>
                <TableCell>
                  <a href={`tel:${row.phoneNumber}`}>{row.phoneNumber}</a>
                </TableCell>
                <TableCell>{getDateString(row.createdAt)}</TableCell>
                <TableCell>
                  <Chip label={row.status} />
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <FilterModal />
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <LimiterComponent />
          <TablePagination />
        </Toolbar>
      </TableContainer>
      <Menu
        anchorEl={anchorData?.element}
        open={Boolean(anchorData)}
        onClose={handleClose}
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