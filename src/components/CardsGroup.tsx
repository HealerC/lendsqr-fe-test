import users2Decorative from "../assets/icons/users-2-decorative.svg";
import users3Decorative from "../assets/icons/users-3-decorative.svg";
import documentCoinsDecorative from "../assets/icons/document-coins-decorative.svg";
import coinsDecorative from "../assets/icons/coins-decorative.svg";
import { useAppContext } from "../context/context";
import CardSimple from "./CardSimple";

export default function CardsGroup() {
  const {
    userListSummary: { totalUsers, activeUsers, loanUsers, savingsUsers },
    loading,
  } = useAppContext();

  return (
    <section className="user-summary">
      <CardSimple
        icon={<img src={users2Decorative} />}
        title="users"
        data={String(totalUsers)}
        loading={loading}
      />
      <CardSimple
        icon={<img src={users3Decorative} />}
        title="active users"
        data={String(activeUsers)}
        loading={loading}
      />
      <CardSimple
        icon={<img src={documentCoinsDecorative} />}
        title="users with loans"
        data={String(loanUsers)}
        loading={loading}
      />
      <CardSimple
        icon={<img src={coinsDecorative} />}
        title="users with saving"
        data={String(savingsUsers)}
        loading={loading}
      />
    </section>
  );
}
