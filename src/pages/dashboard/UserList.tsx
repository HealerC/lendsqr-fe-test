import { useEffect } from "react";
import { useAppContext } from "../../context/context";
import AppTable from "../../components/AppTable";
import "./UserList.scss";
import {
  useFetch,
  mapUserDetailsApiToState,
  summaryContent,
} from "../../utils";
import { Button } from "@mui/material";
import CardsGroup from "../../components/CardsGroup";

const apiUrl =
  "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";
const localUrl = "http://localhost:5000/users";

export default function UserList() {
  const { setUsers, setLoading } = useAppContext();
  const { data, loading, error } = useFetch(apiUrl, mapUserDetailsApiToState);

  useEffect(() => {
    if (data) {
      setUsers(data);
      return;
    }
    setLoading(loading);
  }, [loading]);

  if (error) {
    return (
      <div className="user-list error">
        <h1>Oops! There seems to be a Network error... 😔</h1>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => window.location.reload()}
        >
          Reload page
        </Button>
      </div>
    );
  }

  return (
    <div className="user-list">
      <h1 className="title">Users</h1>
      <CardsGroup />
      <AppTable />
    </div>
  );
}
