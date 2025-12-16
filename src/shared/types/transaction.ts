export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO
}

export type FormData = {
  description: string;
  amount: string;
  type: TransactionType;
  category: string;
};

export interface TransactionFormDTO {
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
}
