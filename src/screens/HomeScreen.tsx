import { FontAwesome } from "@expo/vector-icons";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TransactionRow from "../components/TransactionRow";
import { sampleTransactions } from "../data/transactions";
import type { MainTabParamList } from "../navigation/types";

type HomeScreenProps = BottomTabScreenProps<MainTabParamList, "Home">;

export default function HomeScreen({ route, navigation }: HomeScreenProps) {
  const username = route.params.username;
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>BALONIAR</Text>
            <Text style={styles.greeting}>Hello, {username}</Text>
          </View>
          <Text style={styles.avatar}>B</Text>
        </View>

        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Total balance</Text>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={isBalanceVisible ? "Hide balance" : "Show balance"}
              onPress={() => setIsBalanceVisible(!isBalanceVisible)}
              style={styles.balanceToggle}
            >
              <FontAwesome
                name={isBalanceVisible ? "eye" : "eye-slash"}
                size={18}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.balanceAmount}>
            {isBalanceVisible ? "₦15,500.00" : "₦••••••••"}
          </Text>
          <Text style={styles.balanceNote}>Across your wallets</Text>
          <View style={styles.balanceFooter}>
            <Text style={styles.accountLabel}>PERSONAL ACCOUNT</Text>
            <Text style={styles.accountNumber}>•••• 2048</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Income this month</Text>
            <Text style={styles.incomeValue}>+₦185,000</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Spent this month</Text>
            <Text style={styles.spentValue}>−₦21,250</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent transactions</Text>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => navigation.navigate("Transactions")}
          >
            <Text style={styles.link}>See all</Text>
          </TouchableOpacity>
        </View>

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
  content: { paddingHorizontal: 22, paddingTop: 14, paddingBottom: 24 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },
  eyebrow: {
    color: "#74817b",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },
  greeting: { marginTop: 5, color: "#183b34", fontSize: 22, fontWeight: "700" },
  avatar: {
    width: 42,
    height: 42,
    overflow: "hidden",
    borderRadius: 21,
    backgroundColor: "#eaf3ef",
    color: "#183b34",
    fontSize: 22,
    fontWeight: "700",
    lineHeight: 42,
    textAlign: "center",
  },
  balanceCard: { padding: 20, borderRadius: 14, backgroundColor: "#183b34" },
  balanceHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  balanceLabel: { color: "#d5e4dd", fontSize: 13 },
  balanceToggle: { padding: 4 },
  balanceAmount: {
    marginTop: 8,
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "700",
  },
  balanceNote: { marginTop: 4, color: "#d5e4dd", fontSize: 12 },
  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#55736a",
  },
  accountLabel: { color: "#d5e4dd", fontSize: 10, fontWeight: "700" },
  accountNumber: { color: "#ffffff", fontSize: 12 },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#edf0ee",
  },
  summaryItem: { flex: 1 },
  summaryLabel: { color: "#74817b", fontSize: 12 },
  incomeValue: {
    marginTop: 7,
    color: "#24734e",
    fontSize: 15,
    fontWeight: "700",
  },
  spentValue: {
    marginTop: 7,
    color: "#202b27",
    fontSize: 15,
    fontWeight: "700",
  },
  summaryDivider: {
    width: 1,
    height: 36,
    marginHorizontal: 14,
    backgroundColor: "#e7ece9",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
  },
  sectionTitle: { color: "#202b27", fontSize: 16, fontWeight: "700" },
  link: { color: "#24734e", fontSize: 13, fontWeight: "600" },
  history: { marginTop: 8 },
});
