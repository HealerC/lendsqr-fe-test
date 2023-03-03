import React from "react";
import { SummaryData } from "../utils/summary-content";
import Card from "@mui/material/Card";
import "./CardSimple.scss";

export default function CardSimple({ icon, title, data }: SummaryData) {
  return (
    <Card variant="outlined" className="summary-card">
      <div className="icon">{icon}</div>
      <p>{title}</p>
      <h3>{data}</h3>
    </Card>
  );
}
