import { useMemo } from "react";
import type {
  Transaction,
  TransactionFormDTO,
} from "../../shared/types/transaction";
import { TransactionForm } from "./TransactionForm";
import {
  useAddTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionsQuery,
} from "./transactionsApi";
import s from "./TransactionsPanel.module.scss";
import { TransactionList } from "./TransactionList";

function makeId() {
  return `t_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}

export function TransactionsPanel() {
  const { data, isLoading, isError } = useGetTransactionsQuery();
  const [addTransaction, { isLoading: isAdding }] = useAddTransactionMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();

  const transactions = data ?? [];

  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return { income, expense, balance: income - expense };
  }, [transactions]);

  async function handleAdd({
    amount,
    type,
    category,
    description,
  }: TransactionFormDTO) {
    const tx: Transaction = {
      id: makeId(),
      date: new Date().toISOString(),
      description,
      amount,
      type,
      category,
    };

    await addTransaction(tx).unwrap();
  }

  async function handleDelete(id: string) {
    await deleteTransaction(id).unwrap();
  }

  return (
    <div className={s.root}>
      <div className={s.top}>
        <div className={s.card}>
          <div className={s.title}>Баланс (черновик)</div>
          <div className={s.grid}>
            <div>
              <div className={s.label}>Доходы</div>
              <div className={s.value}>
                + {totals.income.toLocaleString("ru-RU")} ₽
              </div>
            </div>
            <div>
              <div className={s.label}>Расходы</div>
              <div className={s.value}>
                - {totals.expense.toLocaleString("ru-RU")} ₽
              </div>
            </div>
            <div>
              <div className={s.label}>Итого</div>
              <div className={s.value}>
                {totals.balance.toLocaleString("ru-RU")} ₽
              </div>
            </div>
          </div>
        </div>

        <TransactionForm onAdd={handleAdd} isSubmitting={isAdding} />
      </div>

      <div className={s.card}>
        <div className={s.title}>Транзакции</div>

        {isLoading && <div className={s.state}>Загрузка...</div>}
        {isError && <div className={s.state}>Ошибка загрузки</div>}

        {!isLoading && !isError && (
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
