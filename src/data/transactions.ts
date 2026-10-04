import type { Transaction } from "../components/TransactionRow";

export const sampleTransactions: Transaction[] = [
  {
    id: "1",
    title: "Money received",
    detail: "Today, 10:42 AM",
    amount: "+₦25,000.00",
    kind: "income",
    icon: "arrow-down-outline",
  },
  {
    id: "2",
    title: "Tunde A.",
    detail: "Today, 9:18 AM · Transfer",
    amount: "−₦5,000.00",
    kind: "expense",
    icon: "arrow-up-outline",
  },
  {
    id: "3",
    title: "Shoprite",
    detail: "Yesterday · Shopping",
    amount: "−₦12,450.00",
    kind: "expense",
    icon: "cart-outline",
  },
  {
    id: "4",
    title: "Monthly salary",
    detail: "Oct 1 · Income",
    amount: "+₦185,000.00",
    kind: "income",
    icon: "briefcase-outline",
  },
  {
    id: "5",
    title: "Airtime top-up",
    detail: "Sep 30 · Mobile",
    amount: "−₦1,000.00",
    kind: "expense",
    icon: "phone-portrait-outline",
  },
  {
    id: "6",
    title: "Coffee House",
    detail: "Sep 29 · Food and drink",
    amount: "−₦2,800.00",
    kind: "expense",
    icon: "cafe-outline",
  },
];
