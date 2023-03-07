import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useAppContext } from "../context/context";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import "./TablePagination.scss";

/*
 * Shows and provides the UI that controls the pagination
 */
export default function TablePagination() {
  const {
    pagination: { page, totalPageCount },
    handleChangePage,
  } = useAppContext();

  return (
    <Pagination
      page={page}
      count={totalPageCount}
      onChange={handleChangePage}
      shape="rounded"
      renderItem={(item) => (
        <PaginationItem
          slots={{
            previous: ArrowBackIosRoundedIcon,
            next: ArrowForwardIosRoundedIcon,
          }}
          {...item}
        />
      )}
    />
  );
}
