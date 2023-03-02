import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import { UserDetails, UserDetailsAPI, Status } from "../../context/interfaces";
import { useNavigate } from "react-router-dom";
import CardSimple from "../../components/CardSimple";
import { summaryContent } from "../../utils/summary-content";
import { UserDetailsSummary } from "../../context/interfaces";
import AppTable from "../../components/AppTable";
import "./UserList.scss";

const apiUrl =
  "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";

const localUrl = "http://localhost:5000/users";
export default function UserList() {
  const { setUsers, userList, userListSummary, blacklistUser, activateUser } =
    useAppContext();
  const navigate = useNavigate();
  async function getUsers() {
    try {
      const { data } = await axios.get<UserDetailsAPI[]>(localUrl);
      const userList = mapUserDetailsApiToState(data);
      setUsers(userList);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);

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
    <div>
      <h1>Users</h1>
      <section className="user-summary">{getCards()}</section>
      <AppTable />
    </div>
  );
}

const mapUserDetailsApiToState = (
  userListAPI: UserDetailsAPI[]
): UserDetails[] => {
  const statusList: Status[] = ["blacklisted", "pending", "inactive", "active"];

  const userList: UserDetails[] = userListAPI.map((userApi) => {
    const createdAt = new Date(userApi.createdAt) || new Date();
    let status = statusList[Math.floor(Math.random() * 4)];
    return Object.assign({}, userApi, { createdAt, status });
  });

  return userList;
};
