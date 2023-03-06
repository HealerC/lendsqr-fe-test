import { useEffect } from "react";
import { useAppContext } from "../../context/context";
import CardSimple from "../../components/CardSimple";
import { UserDetailsSummary } from "../../context/interfaces";
import AppTable from "../../components/AppTable";
import "./UserList.scss";
import {
  useFetch,
  mapUserDetailsApiToState,
  summaryContent,
} from "../../utils";

const apiUrl =
  "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";

const localUrl = "http://localhost:5000/users";
export default function UserList() {
  const { setUsers, userListSummary } = useAppContext();
  const { data, loading, error } = useFetch(apiUrl, mapUserDetailsApiToState);

  useEffect(() => {
    if (data) {
      setUsers(data);
      return;
    }
  }, [loading]);

  function getCards() {
    return Object.keys(userListSummary).map((key) => {
      const contentDisplay = summaryContent[key as keyof UserDetailsSummary];
      const icon = contentDisplay.icon;
      const title = contentDisplay.title;
      const data = userListSummary[key as keyof UserDetailsSummary];

      return <CardSimple icon={icon} title={title} data={String(data)} />;
    });
  }

  return (
    <div className="user-list">
      <h1 className="title">Users</h1>
      <section className="user-summary">{getCards()}</section>
      <AppTable />
    </div>
  );
}
