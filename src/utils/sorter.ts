import { UserDetails } from "../context/interfaces";

export default function sorter(
  list: UserDetails[],
  by: keyof UserDetails,
  desc: boolean = true
): UserDetails[] {
  switch (by) {
    case "orgName":
    case "userName":
    case "email":
    case "phoneNumber":
    case "createdAt":
      return list.sort((a, b) => {
        if (a[by] < b[by]) {
          if (!desc) return -1;
          return +1;
        }
        if (a[by] > b[by]) {
          if (!desc) return +1;
          return -1;
        }
        return 0;
      });
    case "status":
      return list.sort((a, b) => {
        if (a.status === b.status) {
          return 0;
        }
        const orderedStatusValues = [
          "blacklisted",
          "pending",
          "inactive",
          "active",
        ];
        if (!desc)
          return (
            orderedStatusValues.indexOf(a.status) -
            orderedStatusValues.indexOf(b.status)
          );
        return (
          orderedStatusValues.indexOf(b.status) -
          orderedStatusValues.indexOf(a.status)
        );
      });
    default:
      return list;
  }
}
