import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/context";
import { UserDetails, UserDetailsAPI, Status } from "../../context/interfaces";
import { useNavigate } from "react-router-dom";

const apiUrl =
  "https://6270020422c706a0ae70b72c.mockapi.io/lendsqr/api/v1/users";
export default function UserList() {
  const { setUsers, userList } = useAppContext();
  const navigate = useNavigate();
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

  return (
    <div>
      <h1>Users</h1>
      <section>
        <p>Users: {Math.floor(Math.random() * userList.length)}</p>
        <p>Active Users: {Math.floor(Math.random() * userList.length)}</p>
        <p>Users with loan: {Math.floor(Math.random() * userList.length)}</p>
        <p>Users with savings: {Math.floor(Math.random() * userList.length)}</p>
      </section>
      <ul className="userList">
        {userList.map((user) => (
          <li key={user.id}>
            {user.orgName} -- {user.userName} -- {user.email} --{" "}
            {user.phoneNumber} --
            {user.createdAt.getDate()} -- {user.status}
            <button onClick={() => navigate(`/users/${user.id}`)}>
              View details
            </button>
          </li>
        ))}
      </ul>
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
