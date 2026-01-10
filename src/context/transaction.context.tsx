import { createContext, useContext, useState, type ReactNode } from "react";

import type { ITransactionCategory } from "@/shared/interfaces/https/transaction-category-response";
import * as transactionService from "@/shared/services/dt-money/transaction.service";
import { ICreateTransaction } from "@/shared/interfaces/https/create-transaction-request";

export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: ITransactionCategory[];
  createTransaction: (transaction: ICreateTransaction) => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

type Props = {
  children: ReactNode;
};

export function TransactionContextProvider({ children }: Props) {
  const [categories, setCategories] = useState<ITransactionCategory[]>([]);

  async function fetchCategories() {
    const categoriesResponse =
      await transactionService.getTransactionCategories();

    setCategories(categoriesResponse);
  }

  async function createTransaction(transaction: ICreateTransaction) {
    await transactionService.createTransaction(transaction);
  }

  return (
    <TransactionContext.Provider
      value={{ categories, fetchCategories, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactionContext() {
  return useContext(TransactionContext);
}
