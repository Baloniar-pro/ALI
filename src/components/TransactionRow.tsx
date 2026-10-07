import Ionicons from "@expo/vector-icons/Ionicons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";

export type Transaction = {
  id: string;
  title: string;
  detail: string;
  amount: string;
  amountValue: number;
  kind: "income" | "expense";
  icon: ComponentProps<typeof Ionicons>["name"];
};

type TransactionRowProps = {
  transaction: Transaction;
};

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const amountColor = transaction.kind === "income" ? "#24734e" : "#202b27";

  return (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons name={transaction.icon} size={19} color="#183b34" />
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.detail}>{transaction.detail}</Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>{transaction.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 68,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#edf0ee",
  },
  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eaf3ef",
  },
  description: { flex: 1, marginLeft: 12 },
  title: { color: "#202b27", fontSize: 14, fontWeight: "600" },
  detail: { marginTop: 4, color: "#7b8580", fontSize: 12 },
  amount: { marginLeft: 8, fontSize: 13, fontWeight: "700" },
});