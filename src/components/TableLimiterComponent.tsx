import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuItem from "@mui/material/MenuItem";
import { useAppContext } from "../context/context";
import "./TableLimiterComponent.scss";

/*
 * Show a limiter under a table... A text with a select input beside it
 * and another text beside the select
 */
export default function LimiterComponent() {
  const {
    pagination: { usersPerPage },
    setUsersPerPage,
  } = useAppContext();

  return (
    <FormControl
      sx={{ flexDirection: "row", alignItems: "center" }}
      className="table-limiter"
    >
      <InputLabel
        id="limiter-label"
        shrink={true}
        sx={{
          position: "relative",
          transformOrigin: "initial",
          transform: "initial",
        }}
      >
        Showing
      </InputLabel>
      <Select
        labelId="limiter-label"
        id="limiter"
        value={usersPerPage}
        onChange={(event) => setUsersPerPage(event)}
        IconComponent={KeyboardArrowDownRounded}
        variant="filled"
        disableUnderline={true}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
      <InputLabel
        id="limiter-label"
        shrink={true}
        sx={{
          position: "relative",
          transformOrigin: "initial",
          transform: "initial",
        }}
      >
        out of 100
      </InputLabel>
    </FormControl>
  );
}
