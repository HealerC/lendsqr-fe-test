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

const style = {
  position: "absolute" as "absolute",
  top: "10%",
  left: "10%",
  // transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
      <Box sx={style}>
        <FilterModalComponents />
      </Box>
    </Modal>
  );
}
