import Skeleton from "@mui/material/Skeleton";
import { SummaryData } from "../utils/summary-content";
import Card from "@mui/material/Card";
import "./CardSimple.scss";

type CardSimpleProps = SummaryData & { loading?: boolean };
export default function CardSimple({
  icon,
  title,
  data,
  loading,
}: CardSimpleProps) {
  return (
    <Card variant="outlined" className="summary-card">
      <div className="icon">{icon}</div>
      <p>{title}</p>
      <h3>
        {loading ? <Skeleton variant="rounded" width={30} height={30} /> : data}
      </h3>
    </Card>
  );
}
