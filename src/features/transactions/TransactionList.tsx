import type { Transaction } from "../../shared/types/transaction";
import { TransactionItem } from "./TransactionItem";
import s from "./TransactionList.module.scss";

export function TransactionList({
  transactions,
  onDelete,
}: {
  transactions: Transaction[];
  onDelete: (id: string) => void | Promise<void>;
}) {
  if (transactions.length === 0) {
    return <div className={s.empty}>Пока нет транзакций. Добавь первую 👆</div>;
  }

  const sorted = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <ul className={s.list}>
      {sorted.map((t) => (
        <li key={t.id}>
          <TransactionItem tx={t} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
}
