import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import TransactionRow from "../../../components/TransactionRow";
import { formatNaira, getTransactionTotals, sampleTransactions } from "../../transactions/data/transactions";

export default function WalletScreen() {
  const transactionTotals = getTransactionTotals();
  const balance = transactionTotals.income - transactionTotals.expenses;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>My wallet</Text>
        <Text style={styles.subtitle}>Your money, all in one place.</Text>

        <View style={styles.walletCard}>
          <Text style={styles.cardLabel}>AVAILABLE BALANCE</Text>
          <Text style={styles.balance}>{formatNaira(balance)}</Text>
          <View style={styles.cardBottom}>
            <Text style={styles.cardName}>BALONIAR WALLET</Text>
            <Text style={styles.cardNumber}>•••• 2048</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Wallet activity</Text>
        <Text style={styles.helper}>Recent money in and money out</Text>
        <View style={styles.history}>
          {sampleTransactions.slice(0, 4).map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  content: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 24 },
  title: { color: "#183b34", fontSize: 25, fontWeight: "700" },
  subtitle: { marginTop: 6, color: "#74817b", fontSize: 14 },
  walletCard: {
    marginTop: 24,
    padding: 20,
    minHeight: 180,
    justifyContent: "space-between",
    borderRadius: 14,
    backgroundColor: "#183b34",
  },
  cardLabel: { color: "#d5e4dd", fontSize: 11, fontWeight: "700" },
  balance: { marginTop: 8, color: "#ffffff", fontSize: 29, fontWeight: "700" },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#55736a",
  },
  cardName: { color: "#d5e4dd", fontSize: 10, fontWeight: "700" },
  cardNumber: { color: "#ffffff", fontSize: 12 },
  sectionTitle: { marginTop: 30, color: "#202b27", fontSize: 17, fontWeight: "700" },
  helper: { marginTop: 5, color: "#74817b", fontSize: 12 },
  history: { marginTop: 8 },
});