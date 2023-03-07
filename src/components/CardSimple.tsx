import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import "./CardSimple.scss";

export type SummaryData = {
  icon: React.ReactNode;
  title: string;
  data?: string;
};

/*
 * A simple card that can also take a loading prop to render
 * a skeleton component when data is still fetching from the server.
 */
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
