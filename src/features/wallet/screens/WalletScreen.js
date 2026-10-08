import Ionicons from "@expo/vector-icons/Ionicons";
import { FlatList, StyleSheet, Text, View, } from "react-native";
import TransactionRow from "../../../components/TransactionRow";
import colors from "../../../theme/colors";
import { useWallet } from "../context/WalletContext";
import { formatNaira } from "../../transactions/data/transactions";
export default function WalletScreen() {
    const { balance, isReady, transactions } = useWallet();
    return (<FlatList contentContainerStyle={styles.content} data={transactions} keyExtractor={(transaction) => transaction.id} ListEmptyComponent={<Text style={styles.emptyState}>
          {isReady ? "Your wallet activity will appear here." : "Loading wallet activity..."}
        </Text>} ListHeaderComponent={<View>
          <Text style={styles.eyebrow}>YOUR MONEY</Text>
          <Text style={styles.title}>Wallet</Text>
          <Text style={styles.subtitle}>A simple view of your MyWallet demo balance.</Text>

          <View style={styles.walletCard}>
            <View style={styles.walletCardTop}>
              <View style={styles.walletIcon}>
                <Ionicons name="wallet-outline" size={20} color={colors.accent}/>
              </View>
              <Text style={styles.cardLabel}>MYWALLET</Text>
            </View>
            <Text style={styles.balanceLabel}>Available demo balance</Text>
            <Text style={styles.balance}>
              {isReady ? formatNaira(balance) : "Loading..."}
            </Text>
            <View style={styles.cardBottom}>
              <Text style={styles.cardName}>SAMPLE ACCOUNT</Text>
              <Text style={styles.cardNumber}>DEMO ONLY</Text>
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <View>
              <Text style={styles.sectionTitle}>Wallet activity</Text>
              <Text style={styles.helper}>Sample money in and money out</Text>
            </View>
            <View style={styles.activityIcon}>
              <Ionicons name="swap-vertical-outline" size={18} color={colors.primary}/>
            </View>
          </View>
        </View>} renderItem={({ item }) => <TransactionRow transaction={item}/>} style={styles.list}/>);
}
const styles = StyleSheet.create({
    list: { flex: 1, backgroundColor: colors.background },
    content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 28 },
    eyebrow: { color: colors.muted, fontSize: 10, fontWeight: "700", letterSpacing: 1.2 },
    title: { marginTop: 4, color: colors.text, fontSize: 26, fontWeight: "700" },
    subtitle: { marginTop: 5, color: colors.muted, fontSize: 13 },
    walletCard: {
        marginTop: 23,
        padding: 20,
        minHeight: 195,
        justifyContent: "space-between",
        borderRadius: 22,
        backgroundColor: colors.primary,
    },
    walletCardTop: { flexDirection: "row", alignItems: "center", gap: 10 },
    walletIcon: {
        width: 37,
        height: 37,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        backgroundColor: "#2a5145",
    },
    cardLabel: { color: "#d5e4dd", fontSize: 10, fontWeight: "700", letterSpacing: 0.8 },
    balanceLabel: { marginTop: 13, color: "#d5e4dd", fontSize: 12 },
    balance: { marginTop: 4, color: "#ffffff", fontSize: 29, fontWeight: "700" },
    cardBottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 18,
        paddingTop: 13,
        borderTopWidth: 1,
        borderTopColor: "#55736a",
    },
    cardName: { color: "#d5e4dd", fontSize: 9, fontWeight: "700", letterSpacing: 0.6 },
    cardNumber: { color: "#ffffff", fontSize: 12, fontWeight: "600" },
    sectionHeading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 27,
        marginBottom: 8,
    },
    sectionTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
    helper: { marginTop: 5, color: colors.muted, fontSize: 12 },
    activityIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 13,
        backgroundColor: colors.primaryLight,
    },
    emptyState: { paddingVertical: 28, color: colors.muted, fontSize: 13, textAlign: "center" },
});
