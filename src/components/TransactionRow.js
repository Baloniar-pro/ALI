import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Text, View } from "react-native";
import colors from "../theme/colors";
export default function TransactionRow({ transaction }) {
  const isIncome = transaction.kind === "income";
  const amountColor = isIncome ? colors.success : colors.danger;
  const iconColor = isIncome ? colors.success : colors.danger;

  return (
    <View style={styles.row}>
      <View style={styles.iconCircle}>
        <Ionicons name={transaction.icon} size={19} color={iconColor} />
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.detail}>{transaction.detail}</Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]} numberOfLines={1}>
        {transaction.amount}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryLight,
  },
  description: { flex: 1, minWidth: 0, marginLeft: 12 },
  title: { color: colors.text, fontSize: 13, fontWeight: "600" },
  detail: { marginTop: 4, color: colors.muted, fontSize: 11 },
  amount: { maxWidth: "42%", marginLeft: 8, fontSize: 12, fontWeight: "700" },
});
