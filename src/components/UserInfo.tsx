import React from "react";
import "./UserInfo.scss";

type InfoTypes =
  | "email"
  | "tel"
  | "twitter"
  | "facebook"
  | "instagram"
  | undefined;

type UserInfoProps = {
  title: string;
  value: React.ReactNode;
  type?: InfoTypes;
};
export default function UserInfo({ title, value, type }: UserInfoProps) {
  return (
    <div className="single-user-info">
      <p className="user-info-title">{title}</p>
      <p className="user-info-value">{typeHandler(type, value)}</p>
    </div>
  );
}

function typeHandler(type: InfoTypes, value: React.ReactNode) {
  switch (type) {
    case "email":
      return (
        <a
          href={`mailto:${value}`}
          dangerouslySetInnerHTML={{
            __html: (value as string).replace("@", "<wbr />@"),
          }}
        ></a>
      );
    case "tel":
      return <a href={`tel:${value}`}>{value}</a>;
    case "instagram":
      return <a href={`https://www.instagram.com/${value}`}>{value}</a>;
    case "facebook":
      return <a href={`https://facebook.com/${value}`}>{value}</a>;
    case "twitter":
      return <a href={`https://twitter.com/${value}`}>{value}</a>;
    default:
      return value;
  }
}
