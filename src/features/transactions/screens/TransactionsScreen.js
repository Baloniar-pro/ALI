import { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import TransactionRow from "../../../components/TransactionRow";
import colors from "../../../theme/colors";
import { useWallet } from "../../wallet/context/WalletContext";
import { formatNaira } from "../data/transactions";
const filters = [
    { id: "all", label: "All" },
    { id: "income", label: "Money in" },
    { id: "expense", label: "Money out" },
];
export default function TransactionsScreen() {
    const [selectedFilter, setSelectedFilter] = useState("all");
    const { expenses, income, isReady, transactions } = useWallet();
    const visibleTransactions = selectedFilter === "all"
        ? transactions
        : transactions.filter((transaction) => transaction.kind === selectedFilter);
    return (<FlatList contentContainerStyle={styles.content} data={visibleTransactions} keyExtractor={(transaction) => transaction.id} ListEmptyComponent={<Text style={styles.emptyState}>
          {isReady ? "No transactions in this category yet." : "Loading transactions..."}
        </Text>} ListFooterComponent={<Text style={styles.sampleNote}>
          Demo transaction history saved on this device. No real payments are connected.
        </Text>} ListHeaderComponent={<View>
          <Text style={styles.eyebrow}>YOUR ACTIVITY</Text>
          <Text style={styles.title}>Transactions</Text>
          <Text style={styles.subtitle}>Keep track of every wallet update.</Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <View style={styles.summaryLabelRow}>
                <View style={[styles.summaryDot, styles.incomeDot]}/>
                <Text style={styles.summaryLabel}>Money in</Text>
              </View>
              <Text style={styles.incomeAmount}>+{formatNaira(income)}</Text>
            </View>
            <View style={styles.summaryDivider}/>
            <View style={styles.summaryItem}>
              <View style={styles.summaryLabelRow}>
                <View style={[styles.summaryDot, styles.expenseDot]}/>
                <Text style={styles.summaryLabel}>Money out</Text>
              </View>
              <Text style={styles.expenseAmount}>−{formatNaira(expenses)}</Text>
            </View>
          </View>

          <View style={styles.listHeading}>
            <Text style={styles.sectionTitle}>Transaction history</Text>
            <Text style={styles.transactionCount}>{visibleTransactions.length} items</Text>
          </View>
          <View style={styles.filters}>
            {filters.map((filter) => {
                const isSelected = selectedFilter === filter.id;
                return (<TouchableOpacity key={filter.id} accessibilityRole="button" accessibilityState={{ selected: isSelected }} onPress={() => setSelectedFilter(filter.id)} style={[styles.filter, isSelected && styles.filterSelected]}>
                  <Text style={[styles.filterLabel, isSelected && styles.filterLabelSelected]}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>);
            })}
          </View>
        </View>} renderItem={({ item }) => <TransactionRow transaction={item}/>} style={styles.list}/>);
}
const styles = StyleSheet.create({
    list: { flex: 1, backgroundColor: colors.background },
    content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 28 },
    eyebrow: { color: colors.muted, fontSize: 10, fontWeight: "700", letterSpacing: 1.2 },
    title: { marginTop: 4, color: colors.text, fontSize: 26, fontWeight: "700" },
    subtitle: { marginTop: 5, color: colors.muted, fontSize: 13 },
    summaryCard: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 22,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 17,
        backgroundColor: colors.surface,
    },
    summaryItem: { flex: 1 },
    summaryLabelRow: { flexDirection: "row", alignItems: "center", gap: 7 },
    summaryDot: { width: 7, height: 7, borderRadius: 4 },
    incomeDot: { backgroundColor: colors.success },
    expenseDot: { backgroundColor: "#e2a34b" },
    summaryLabel: { color: colors.muted, fontSize: 11 },
    incomeAmount: { marginTop: 8, color: colors.success, fontSize: 14, fontWeight: "700" },
    expenseAmount: { marginTop: 8, color: colors.text, fontSize: 14, fontWeight: "700" },
    summaryDivider: { width: 1, height: 38, marginHorizontal: 12, backgroundColor: colors.border },
    listHeading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 27,
    },
    sectionTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
    transactionCount: { color: colors.muted, fontSize: 11 },
    filters: { flexDirection: "row", gap: 8, marginTop: 14, marginBottom: 4 },
    filter: {
        paddingHorizontal: 14,
        paddingVertical: 9,
        borderRadius: 18,
        backgroundColor: colors.surface,
    },
    filterSelected: { backgroundColor: colors.primary },
    filterLabel: { color: colors.muted, fontSize: 11, fontWeight: "600" },
    filterLabelSelected: { color: "#ffffff" },
    emptyState: { paddingVertical: 28, color: colors.muted, fontSize: 13, textAlign: "center" },
    sampleNote: {
        marginTop: 18,
        paddingHorizontal: 12,
        color: colors.muted,
        fontSize: 11,
        lineHeight: 16,
        textAlign: "center",
    },
});
