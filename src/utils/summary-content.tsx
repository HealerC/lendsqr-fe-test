import React from "react";
import users2Decorative from "../assets/icons/users-2-decorative.svg";
import users3Decorative from "../assets/icons/users-3-decorative.svg";
import documentCoinsDecorative from "../assets/icons/document-coins-decorative.svg";
import coinsDecorative from "../assets/icons/coins-decorative.svg";
import { UserDetailsSummary } from "../context/interfaces";

export type SummaryData = {
  icon: React.ReactNode;
  title: string;
  data?: string;
};
type Data = {
  [key in keyof UserDetailsSummary]: SummaryData;
};

export const summaryContent: Data = {
  totalUsers: {
    icon: <img src={users2Decorative} />,
    title: "users",
  },
  activeUsers: {
    icon: <img src={users3Decorative} />,
    title: "active users",
  },
  loanUsers: {
    icon: <img src={documentCoinsDecorative} />,
    title: "users with loans",
  },
  savingsUsers: {
    icon: <img src={coinsDecorative} />,
    title: "users with saving",
  },
};
