import { useAppContext } from "../context/context";
import CardSimple from "./CardSimple";
import users2Decorative from "../assets/icons/users-2-decorative.svg";
import users3Decorative from "../assets/icons/users-3-decorative.svg";
import documentCoinsDecorative from "../assets/icons/document-coins-decorative.svg";
import coinsDecorative from "../assets/icons/coins-decorative.svg";

/*
 * The four cards that summarizes the table. `loading` is passed as props into
 * the cards so the card shows a skeleton display when the data is being fetched
 */
export default function CardsGroup() {
  const {
    userListSummary: { totalUsers, activeUsers, loanUsers, savingsUsers },
    loading,
  } = useAppContext();

  return (
    <section className="user-summary">
      <CardSimple
        icon={<img src={users2Decorative} alt="" />}
        title="users"
        data={String(totalUsers)}
        loading={loading}
      />
      <CardSimple
        icon={<img src={users3Decorative} alt="" />}
        title="active users"
        data={String(activeUsers)}
        loading={loading}
      />
      <CardSimple
        icon={<img src={documentCoinsDecorative} alt="" />}
        title="users with loans"
        data={String(loanUsers)}
        loading={loading}
      />
      <CardSimple
        icon={<img src={coinsDecorative} alt="" />}
        title="users with saving"
        data={String(savingsUsers)}
        loading={loading}
      />
    </section>
  );
}
