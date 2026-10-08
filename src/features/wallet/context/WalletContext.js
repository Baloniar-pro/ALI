import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { formatNaira, sampleTransactions } from "../../transactions/data/transactions";
const WALLET_STORAGE_KEY = "mywallet.demo-transactions.v1";
const WalletContext = createContext(null);
function isTransaction(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const transaction = value;
    return (typeof transaction.id === "string" &&
        typeof transaction.title === "string" &&
        typeof transaction.detail === "string" &&
        typeof transaction.amount === "string" &&
        typeof transaction.amountValue === "number" &&
        Number.isFinite(transaction.amountValue) &&
        (transaction.kind === "income" || transaction.kind === "expense") &&
        typeof transaction.icon === "string");
}
function getTotals(transactions) {
    return transactions.reduce((totals, transaction) => {
        if (transaction.kind === "income") {
            totals.income += transaction.amountValue;
        }
        else {
            totals.expenses += transaction.amountValue;
        }
        return totals;
    }, { income: 0, expenses: 0 });
}
export function WalletProvider({ children }) {
    const [transactions, setTransactions] = useState(sampleTransactions);
    const [isReady, setIsReady] = useState(false);
    const [storageError, setStorageError] = useState(null);
    useEffect(() => {
        let isMounted = true;
        const restoreTransactions = async () => {
            try {
                const savedTransactions = await AsyncStorage.getItem(WALLET_STORAGE_KEY);
                if (savedTransactions === null) {
                    return;
                }
                const parsedTransactions = JSON.parse(savedTransactions);
                if (!Array.isArray(parsedTransactions) ||
                    !parsedTransactions.every(isTransaction)) {
                    throw new Error("Saved wallet history is not in the expected format.");
                }
                if (isMounted) {
                    setTransactions(parsedTransactions);
                }
            }
            catch (error) {
                if (isMounted) {
                    setStorageError(error instanceof Error
                        ? `Wallet history could not be loaded: ${error.message}`
                        : "Wallet history could not be loaded.");
                }
            }
            finally {
                if (isMounted) {
                    setIsReady(true);
                }
            }
        };
        void restoreTransactions();
        return () => {
            isMounted = false;
        };
    }, []);
    const recordTransaction = async (newTransaction) => {
        if (!isReady) {
            throw new Error("Wallet data is still loading. Please try again shortly.");
        }
        if (!Number.isFinite(newTransaction.amountValue) || newTransaction.amountValue <= 0) {
            throw new Error("Enter an amount greater than zero.");
        }
        const totals = getTotals(transactions);
        const balance = totals.income - totals.expenses;
        if (newTransaction.kind === "expense" && newTransaction.amountValue > balance) {
            throw new Error("This demo wallet does not have enough funds for that amount.");
        }
        const transaction = {
            ...newTransaction,
            id: `${Date.now()}-${transactions.length}`,
            createdAt: Date.now(),
            amount: newTransaction.kind === "income"
                ? `+${formatNaira(newTransaction.amountValue)}`
                : `−${formatNaira(newTransaction.amountValue)}`,
        };
        const updatedTransactions = [transaction, ...transactions];
        try {
            await AsyncStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(updatedTransactions));
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Local wallet storage is unavailable.";
            setStorageError(`Transaction could not be saved: ${message}`);
            throw new Error("Transaction could not be saved to this device.");
        }
        setStorageError(null);
        setTransactions(updatedTransactions);
    };
    const totals = useMemo(() => getTotals(transactions), [transactions]);
    return (<WalletContext.Provider value={{
            transactions,
            balance: totals.income - totals.expenses,
            income: totals.income,
            expenses: totals.expenses,
            isReady,
            storageError,
            recordTransaction,
        }}>
      {children}
    </WalletContext.Provider>);
}
export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error("useWallet must be used within a WalletProvider.");
    }
    return context;
}
