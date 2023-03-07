import { useParams } from "react-router-dom";
import { useAppContext } from "../../../context/context";
import UserInfo from "../../../components/UserInfo";
import Divider from "@mui/material/Divider";
import "./GeneralDetails.scss";

/*
 * Display general details of a user using `UserInfo` component for each detail
 * and grouping them into sections, dividing the sections by horizontal line.
 */
export default function GeneralDetails() {
  const { userList } = useAppContext();
  const { userId } = useParams();
  const user = userList.find((person) => person.id === userId);

  return (
    <div className="general-details">
      <section>
        <h3>Personal information</h3>
        <section className="info">
          <UserInfo
            title="full name"
            value={`${user?.profile.firstName} ${user?.profile.lastName}`}
          />
          <UserInfo
            title="phone number"
            type="tel"
            value={user?.profile.phoneNumber}
          />
          <UserInfo title="email address" type="email" value={user?.email} />
          <UserInfo title="bvn" value={user?.profile.bvn} />
          <UserInfo title="gender" value={user?.profile.gender} />
          <UserInfo
            title="marital status"
            value={Math.random() < 0.5 ? "Single" : "Married"}
          />
          <UserInfo
            title="children"
            value={(() => {
              const childrenCount = Math.floor(Math.random() * 10);
              return childrenCount === 0 ? "None" : childrenCount;
            })()}
          />
          <UserInfo
            title="type of residence"
            value={
              Math.random() < 0.5 ? "Personal Apartment" : "Parent's apartment"
            }
          />
        </section>
      </section>
      <Divider className="user-details-divider" />
      <section>
        <h3>Education and employment</h3>
        <section className="info">
          <UserInfo title="level of education" value={user?.education.level} />
          <UserInfo
            title="employment status"
            value={user?.education.employmentStatus}
          />
          <UserInfo
            title="sector of employment"
            value={user?.education.sector}
          />
          <UserInfo
            title="office email"
            type="email"
            value={user?.education.officeEmail}
          />
          <UserInfo
            title="monthly income"
            value={`₦${user?.education.monthlyIncome[1]} - ₦${user?.education.monthlyIncome[0]}`}
          />
          <UserInfo
            title="loan repayment"
            value={user?.education.loanRepayment}
          />
        </section>
      </section>
      <Divider className="user-details-divider" />
      <section>
        <h3>Socials</h3>
        <section className="info">
          <UserInfo
            title="twitter"
            type="twitter"
            value={user?.socials.twitter}
          />
          <UserInfo
            title="facebook"
            type="facebook"
            value={user?.socials.facebook}
          />
          <UserInfo
            title="instagram"
            type="instagram"
            value={user?.socials.instagram}
          />
        </section>
      </section>
      <Divider className="user-details-divider" />
      <section>
        <h3>Guarantor</h3>
        <section className="info">
          <UserInfo
            title="full name"
            value={user?.guarantor.firstName + " " + user?.guarantor.lastName}
          />
          <UserInfo
            title="phone number"
            value={user?.guarantor.phoneNumber}
            type="tel"
          />
          <UserInfo
            title="email address"
            value={user?.education.officeEmail}
            type="email"
          />
          <UserInfo
            title="relationship"
            value={
              ["Brother", "Sister", "Father", "Mother"][
                Math.floor(Math.random() * 4)
              ]
            }
          />
        </section>
      </section>
    </div>
  );
}
