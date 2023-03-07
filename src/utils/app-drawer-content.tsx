import briefcaseIcon from "../assets/icons/briefcase.svg";
import homeIcon from "../assets/icons/home.svg";
import users2Icon from "../assets/icons/users-2.svg";
import users3Icon from "../assets/icons/users-3.svg";
import sackIcon from "../assets/icons/sack.svg";
import handshakeIcon from "../assets/icons/handshake.svg";
import piggyBankIcon from "../assets/icons/piggy-bank.svg";
import sackHandIcon from "../assets/icons/sack-hand.svg";
import userCheckIcon from "../assets/icons/user-check.svg";
import userTimesIcon from "../assets/icons/user-times.svg";
import bankIcon from "../assets/icons/bank.svg";
import coinsIcon from "../assets/icons/coins.svg";
import transactionsIcon from "../assets/icons/transactions.svg";
import galaxyIcon from "../assets/icons/galaxy.svg";
import userSettingsIcon from "../assets/icons/user-settings.svg";
import scrollIcon from "../assets/icons/scroll.svg";
import chartBarIcon from "../assets/icons/chart-bar.svg";
import slidersIcon from "../assets/icons/sliders.svg";
import badgePercentIcon from "../assets/icons/badge-percent.svg";
import clipboardListIcon from "../assets/icons/clipboard-list.svg";

/* Create an image component from the image path */
const getIcon = (imgPath: string): React.ReactNode => {
  return <img src={imgPath} className="app-drawer-icon" />;
};

/* Elements of an app drawer item */
export interface DrawerItemBase {
  id: string;
  icon: React.ReactNode;
  text: string;
  route?: string;
}

/* An app drawer item that contains an expandable sub items */
export interface DrawerItemDetails extends DrawerItemBase {
  details?: DrawerItemBase[];
}

/* The list of drawer items categorized with some containing sub items such as 
switch organization */
export const drawerItems: { [key: string]: DrawerItemDetails[] } = {
  uncategorized: [
    {
      id: "0",
      icon: getIcon(briefcaseIcon),
      text: "switch organization",
      details: [
        {
          id: "01",
          icon: getIcon(briefcaseIcon),
          text: "Lendstar",
          route: "switch-organization/lendstar",
        },
        {
          id: "02",
          icon: getIcon(briefcaseIcon),
          text: "Irorun",
          route: "switch-organization/irorun",
        },
      ],
    },
    {
      id: "1",
      icon: getIcon(homeIcon),
      text: "dashboard",
      route: "dashboard",
    },
  ],
  customers: [
    {
      id: "2",
      icon: getIcon(users2Icon),
      text: "users",
      route: "users",
    },
    {
      id: "3",
      icon: getIcon(users3Icon),
      text: "guarantors",
      route: "guarantors",
    },
    {
      id: "4",
      icon: getIcon(sackIcon),
      text: "loans",
      route: "loans",
    },
    {
      id: "5",
      icon: getIcon(handshakeIcon),
      text: "decision models",
      route: "decision-models",
    },
    {
      id: "6",
      icon: getIcon(piggyBankIcon),
      text: "savings",
      route: "savings",
    },
    {
      id: "7",
      icon: getIcon(sackHandIcon),
      text: "loan requests",
      route: "loan-requests",
    },
    {
      id: "8",
      icon: getIcon(userCheckIcon),
      text: "whitelist",
      route: "whitelist",
    },
    {
      id: "9",
      icon: getIcon(userTimesIcon),
      text: "karma",
      route: "karma",
    },
  ],
  businesses: [
    {
      id: "10",
      icon: getIcon(briefcaseIcon),
      text: "organization",
      route: "organization",
    },
    {
      id: "11",
      icon: getIcon(sackHandIcon),
      text: "Loan Products",
      route: "loan-products",
    },
    {
      id: "12",
      icon: getIcon(bankIcon),
      text: "savings products",
      route: "savings-products",
    },
    {
      id: "13",
      icon: getIcon(coinsIcon),
      text: "fees and charges",
      route: "fees-and-charges",
    },
    {
      id: "14",
      icon: getIcon(transactionsIcon),
      text: "transactions",
      route: "transactions",
    },
    {
      id: "15",
      icon: getIcon(galaxyIcon),
      text: "services",
      route: "services",
    },
    {
      id: "16",
      icon: getIcon(userSettingsIcon),
      text: "service account",
      route: "service-account",
    },
    {
      id: "17",
      icon: getIcon(scrollIcon),
      text: "settlements",
      route: "settlements",
    },
    {
      id: "18",
      icon: getIcon(chartBarIcon),
      text: "reports",
      route: "reports",
    },
  ],
  settings: [
    {
      id: "19",
      icon: getIcon(chartBarIcon),
      text: "reports",
      route: "reports",
    },
    {
      id: "20",
      icon: getIcon(slidersIcon),
      text: "preferences",
      route: "preferences",
    },
    {
      id: "21",
      icon: getIcon(badgePercentIcon),
      text: "fees and pricing",
      route: "fees-and-pricing",
    },
    {
      id: "22",
      icon: getIcon(clipboardListIcon),
      text: "audit logs",
      route: "audit-logs",
    },
  ],
};
