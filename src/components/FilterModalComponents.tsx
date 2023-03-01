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
import { useAppContext } from "../context/context";
import { UserDetails } from "../context/interfaces";
import { Status } from "../context/interfaces";

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

function getOrgNameList(userList: UserDetails[]) {
  let nonDuplicatedOrgSet = new Set(userList.map((user) => user.orgName));
  const orgList = Array.from(nonDuplicatedOrgSet, (orgName) => ({
    value: orgName,
    component: orgName,
  }));
  return orgList;
}

function getStatusList(): {
  value: Status;
  component: string;
}[] {
  return ["blacklisted", "pending", "inactive", "active"].map((item) => ({
    value: item as Status,
    component: item,
  }));
}
export default function FilterModalComponents() {
  const { filter, userList, handleFilter } = useAppContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <SelectSimple
        name="orgName"
        label="Organization"
        value={filter.values.orgName}
        items={getOrgNameList(userList)}
        handleChange={handleFilter}
      />
      <InputSimple
        name="userName"
        label="Username"
        autoComplete="username"
        value={filter.values.userName}
        handleChange={handleFilter}
      />
      <InputSimple
        name="email"
        label="Email"
        autoComplete="email"
        value={filter.values.email}
        handleChange={handleFilter}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          value={filter.values.createdAt}
          label="Date"
          onChange={handleFilter}
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
        name="phoneNumber"
        value={filter.values.phoneNumber}
        handleChange={handleFilter}
      />
      <SelectSimple
        name="status"
        label="Status"
        value={filter.values.status}
        items={getStatusList()}
        handleChange={handleFilter}
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
