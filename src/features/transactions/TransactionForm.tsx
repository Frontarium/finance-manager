import { useMemo, useState } from "react";
import type {
  TransactionFormDTO,
  TransactionType,
  FormData,
} from "../../shared/types/transaction";
import s from "./TransactionForm.module.scss";

const CATEGORIES = [
  { value: "work", label: "Работа" },
  { value: "food", label: "Еда" },
  { value: "home", label: "Дом" },
  { value: "health", label: "Здоровье" },
  { value: "fun", label: "Развлечения" },
  { value: "other", label: "Другое" },
];

interface TransactionFormProps {
  onAdd: (dto: TransactionFormDTO) => Promise<void> | void;
  isSubmitting: boolean;
}

export function TransactionForm({ onAdd, isSubmitting }: TransactionFormProps) {
  const [error, setError] = useState<string>("");

  const [form, setForm] = useState<FormData>({
    description: "",
    amount: "",
    type: "expense",
    category: "other",
  });

  const canSubmit = useMemo(() => {
    const descOk = form.description.trim().length >= 2;
    const amountNum = Number(form.amount);
    const amountOk = Number.isFinite(amountNum) && amountNum > 0;
    return descOk && amountOk && !isSubmitting;
  }, [form, isSubmitting]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const description = form.description.trim();
    const amount = Number(form.amount);

    if (description.length < 2) return setError("Описание слишком короткое");
    if (!Number.isFinite(amount) || amount <= 0)
      return setError("Сумма должна быть больше 0");

    await onAdd({
      description,
      amount,
      type: form.type,
      category: form.category,
    });

    setForm((p) => ({ ...p, description: "", amount: "" }));
  }

  return (
    <form className={s.card} onSubmit={submit}>
      <div className={s.title}>Добавить транзакцию</div>

      <label className={s.label}>
        Описание
        <input
          className={s.input}
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          placeholder="Например: Продукты"
        />
      </label>

      <label className={s.label}>
        Сумма
        <input
          className={s.input}
          value={form.amount}
          onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
          placeholder="Например: 4500"
          inputMode="numeric"
        />
      </label>

      <div className={s.row}>
        <label className={s.label}>
          Тип
          <select
            className={s.select}
            value={form.type}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                type: e.target.value as TransactionType,
              }))
            }
          >
            <option value="income">Доход</option>
            <option value="expense">Расход</option>
          </select>
        </label>

        <label className={s.label}>
          Категория
          <select
            className={s.select}
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value }))
            }
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error && <div className={s.error}>{error}</div>}

      <button className={s.button} type="submit" disabled={!canSubmit}>
        {isSubmitting ? "Добавляю..." : "Добавить"}
      </button>
    </form>
  );
}
