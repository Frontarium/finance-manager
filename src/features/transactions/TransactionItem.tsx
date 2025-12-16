import type { Transaction } from "../../shared/types/transaction";
import s from "./TransactionItem.module.scss";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ru-RU");
}

export function TransactionItem({
  tx,
  onDelete,
}: {
  tx: Transaction;
  onDelete: (id: string) => void | Promise<void>;
}) {
  const sign = tx.type === "income" ? "+" : "-";

  return (
    <div className={s.item}>
      <div className={s.left}>
        <div className={s.desc}>{tx.description}</div>
        <div className={s.meta}>
          <span className={s.badge}>
            {tx.type === "income" ? "Доход" : "Расход"}
          </span>
          <span className={s.dot}>•</span>
          <span className={s.category}>{tx.category}</span>
          <span className={s.dot}>•</span>
          <span className={s.date}>{formatDate(tx.date)}</span>
        </div>
      </div>

      <div className={s.right}>
        <div className={s.amount}>
          {sign} {tx.amount.toLocaleString("ru-RU")} ₽
        </div>
        <button
          className={s.delete}
          onClick={() => onDelete(tx.id)}
          type="button"
        >
          Удалить
        </button>
      </div>
    </div>
  );
}
