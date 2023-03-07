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
import "./FilterModalComponents.scss";

/* Get a list of all the available organizations the users belongs 
to be displayed in a custom select input field which require the {value, component}
props to be passed in */
function getOrgNameList(userList: UserDetails[]) {
  let nonDuplicatedOrgSet = new Set(userList.map((user) => user.orgName));
  const orgList = Array.from(nonDuplicatedOrgSet, (orgName) => ({
    value: orgName,
    component: orgName,
  }));
  return orgList;
}

/* Get a list of all the available status of the users 
to be displayed in a select input field */
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
  const { filter, userList, handleFilter, clearFilter, toggleFilterModal } =
    useAppContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form">
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
      {/* All the weird inline styling was done in order to use 
      the custom calendar icon */}
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
          // Use a custom calendar icon
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
      <div className="action-buttons">
        <Button
          variant="outlined"
          color="secondary"
          type="reset"
          className="reset"
          onClick={clearFilter}
        >
          Reset
        </Button>
        <Button
          variant="contained"
          type="submit"
          className="submit"
          onClick={toggleFilterModal}
        >
          Filter
        </Button>
      </div>
    </form>
  );
}
