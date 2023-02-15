import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import { UserDetails, UserDetailsAPI } from "../../context/interfaces";
import { Status } from "../../context/interfaces";

const apiUrl =
  "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";
export default function UserList() {
  const { setUsers, userList } = useAppContext();

  async function getUsers() {
    try {
      const { data } = await axios.get<UserDetailsAPI[]>(apiUrl);
      const userList = mapUserDetailsApiToState(data);
      setUsers(userList);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUsers();
  }, []);
  return <div>{JSON.stringify(userList)}</div>;
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
