import { useAppContext } from "../context/context";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
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
