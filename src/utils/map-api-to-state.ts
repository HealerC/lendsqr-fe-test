import { UserDetails, UserDetailsAPI, Status } from "../context/interfaces";

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

export default mapUserDetailsApiToState;
