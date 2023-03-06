import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { Dayjs } from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useAppContext } from "../context/context";
import FilterModalComponents from "./FilterModalComponents";
import "./FilterModal.scss";

export default function FilterModal() {
  const { isFilterModalOpen, toggleFilterModal } = useAppContext();

  return (
    <Modal
      open={isFilterModalOpen}
      disablePortal
      disableScrollLock
      disableAutoFocus
      onClose={toggleFilterModal}
    >
      <Box className="filter-modal-box">
        <FilterModalComponents />
      </Box>
    </Modal>
  );
}
