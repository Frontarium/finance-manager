import { baseApi } from "../../shared/api/baseApi";
import type { Transaction } from "../../shared/types/transaction";

export const transactionsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<Transaction[], void>({
      query: () => "transactions",
      providesTags: ["Transactions"],
    }),

    addTransaction: build.mutation<Transaction, Transaction>({
      query: (body) => ({
        url: "transactions",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Transactions"],
    }),

    deleteTransaction: build.mutation<void, string>({
      query: (id) => ({
        url: `transactions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
