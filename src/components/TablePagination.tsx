import Pagination from "@mui/material/Pagination";
import { useAppContext } from "../context/context";

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
    />
  );
}
