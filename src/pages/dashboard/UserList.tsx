import { useEffect } from "react";
import { useAppContext } from "../../context/context";
import AppTable from "../../components/AppTable";
import { useFetch, mapUserDetailsApiToState } from "../../utils";
import Button from "@mui/material/Button";
import CardsGroup from "../../components/CardsGroup";
import "./UserList.scss";

const apiUrl =
  "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";

/*
 * This component represents the route navigated to after successful log in.
 * It fetches data online from the `apiUrl` above and then transforms it to the
 * state used in the app using useFetch hook and mapUserDetailsApiToState function.
 * It then calls the function in context that saves the data to state.
 */
export default function UserList() {
  const { setUsers, setLoading } = useAppContext();
  const { data, loading, error } = useFetch(apiUrl, mapUserDetailsApiToState);

  useEffect(() => {
    if (data) {
      setUsers(data);
      return;
    }
    setLoading(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (error) {
    // If there was an error fetching the file... Handle the error
    // by rendering a different component with a button to reload the page
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
