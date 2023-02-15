interface Profile {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  gender: string;
  bvn: string;
  address: string;
  currency: string;
}
interface Guarantor {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  address: string;
}
interface Socials {
  facebook: string;
  instagram: string;
  twitter: string;
}
interface Education {
  level: string;
  employmentStatus: string;
  sector: string;
  duration: string;
  officeEmail: string;
  monthlyIncome: string[];
  loanRepayment: string;
}
export type Status = "blacklisted" | "pending" | "inactive" | "active";
export interface UserDetailsAPI {
  id: string;
  createdAt: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  accountBalance: string;
  accountNumber: string;
  profile: Profile;
  guarantor: Guarantor;
  socials: Socials;
  education: Education;
}
export interface UserDetails extends Omit<UserDetailsAPI, "createdAt"> {
  status: Status;
  createdAt: Date;
}
