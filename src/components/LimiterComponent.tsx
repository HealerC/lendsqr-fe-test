import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import KeyboardArrowDownRounded from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuItem from "@mui/material/MenuItem";

export default function LimiterComponent() {
  return (
    <FormControl sx={{ flexDirection: "row", alignItems: "center" }}>
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
        value={5}
        onChange={() => console.log("hello")}
        IconComponent={KeyboardArrowDownRounded}
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
