import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import CalendarIconComponent from "./CalendarIconComponent";
import Button from "@mui/material/Button";
import SelectSimple from "./input/SelectSimple";
import InputSimple from "./input/InputSimple";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";

// import CalendarIcon from "../assets/icons/calendar.svg";
// import ArrowDownSvgIcon from "./ArrowDownSvgIcon";
// import arrowDownFilterIcon from "../assets/icons/arrow-down-filter.svg";
// import ArrowDownComponent from "./ArrowDownComponent";
// import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

// import CalendarSvgIcon from "./CalendarSvgIcon";
// import IconButton from "@mui/material/IconButton";

// import OutlinedInput from "@mui/material/OutlinedInput";
export default function FilterModalComponents() {
  const [age, setAge] = useState("");
  const [text, setText] = useState<string>("");
  const [value, setValue] = useState<Dayjs | null>(null);

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectSimple
        name="organization"
        label="Organization"
        value={age}
        items={[
          { value: 10, component: "Ten" },
          { value: 20, component: "Twenty" },
          { value: 30, component: "Thirty" },
        ]}
        handleChange={handleChange}
      />
      <InputSimple
        name="text"
        label="Username"
        autoComplete="username"
        value={text}
        handleChange={(event) => {
          setText(event.target.value);
        }}
      />
      <InputSimple
        name="email"
        label="Email"
        autoComplete="email"
        value={text}
        handleChange={(event) => {
          setText(event.target.value);
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={value}
          label="Date"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...{
                ...params,
                id: "datepicker",
                sx: {
                  "& legend span": { display: "none" },
                },
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                  sx: {
                    position: "relative",
                    transformOrigin: "initial",
                    transform: "initial",
                  },
                },
              }}
            />
          )}
          components={{ OpenPickerIcon: CalendarIconComponent }}
        />
      </LocalizationProvider>
      <InputSimple
        type="tel"
        autoComplete="tel"
        label="Telephone"
        name="telephone"
        value={text}
        handleChange={(event) => {
          setText(event.target.value);
        }}
      />
      <SelectSimple
        name="status"
        label="Status"
        value={age}
        items={[
          { value: 10, component: "Ten" },
          { value: 20, component: "Twenty" },
          { value: 30, component: "Thirty" },
        ]}
        handleChange={handleChange}
      />
      <Button variant="outlined" color="secondary" type="reset">
        Reset
      </Button>
      <Button variant="contained" type="submit">
        Filter
      </Button>
    </form>
  );
}
