import { TransactionsPanel } from "../../features/transactions/TransactionsPanel";
import s from "./HomePage.module.scss";

export function HomePage() {
  return (
    <div className={s.page}>
      <h2>Транзакции</h2>
      <TransactionsPanel />
    </div>
  );
}
