import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import TransactionRow from "../../../components/TransactionRow";
import { sampleTransactions } from "../data/transactions";

export default function TransactionsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Transactions</Text>
        <Text style={styles.subtitle}>Your recent money activity</Text>

        <View style={styles.monthHeading}>
          <Text style={styles.monthTitle}>October 2026</Text>
          <Text style={styles.monthCount}>{sampleTransactions.length} transactions</Text>
        </View>

        <View style={styles.history}>
          {sampleTransactions.map((transaction) => (
            <TransactionRow key={transaction.id} transaction={transaction} />
          ))}
        </View>
        <Text style={styles.sampleNote}>Example history for your app preview.</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  content: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 24 },
  title: { color: "#183b34", fontSize: 25, fontWeight: "700" },
  subtitle: { marginTop: 6, color: "#74817b", fontSize: 14 },
  monthHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 30,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e7ece9",
  },
  monthTitle: { color: "#202b27", fontSize: 15, fontWeight: "700" },
  monthCount: { color: "#74817b", fontSize: 12 },
  history: { marginTop: 2 },
  sampleNote: { marginTop: 18, color: "#89948f", fontSize: 11, textAlign: "center" },
});