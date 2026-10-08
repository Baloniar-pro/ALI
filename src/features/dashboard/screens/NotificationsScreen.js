import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import { useWallet } from "../../wallet/context/WalletContext";

export default function NotificationsScreen({ navigation }) {
    const { transactions } = useWallet();

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Go back"
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Ionicons name="arrow-back" size={19} color={colors.primary} />
                    <Text style={styles.backLabel}>Back</Text>
                </TouchableOpacity>

                <View style={styles.titleRow}>
                    <View style={styles.titleIcon}>
                        <Ionicons name="notifications-outline" size={22} color={colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.title}>Notifications</Text>
                        <Text style={styles.subtitle}>Your latest wallet activity</Text>
                    </View>
                </View>

                {transactions.length > 0 ? (
                    <View style={styles.notificationList}>
                        {transactions.slice(0, 10).map((transaction) => (
                            <View key={transaction.id} style={styles.notificationCard}>
                                <View style={styles.notificationIcon}>
                                    <Ionicons
                                        name={transaction.icon}
                                        size={18}
                                        color={transaction.kind === "income" ? colors.success : colors.primary}
                                    />
                                </View>
                                <View style={styles.notificationContent}>
                                    <View style={styles.notificationHeading}>
                                        <Text style={styles.notificationTitle}>{transaction.title}</Text>
                                        <Text
                                            style={[
                                                styles.notificationAmount,
                                                transaction.kind === "income" && styles.incomeAmount,
                                            ]}
                                        >
                                            {transaction.amount}
                                        </Text>
                                    </View>
                                    <Text style={styles.notificationDetail}>{transaction.detail}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="checkmark-circle-outline" size={34} color={colors.success} />
                        <Text style={styles.emptyTitle}>You’re all caught up</Text>
                        <Text style={styles.emptyText}>Wallet updates will appear here.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 18, paddingBottom: 28 },
    backButton: {
        minHeight: 42,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 21,
        backgroundColor: colors.surface,
    },
    backLabel: { color: colors.primary, fontSize: 14, fontWeight: "600" },
    titleRow: { flexDirection: "row", alignItems: "center", gap: 12, marginTop: 26, marginBottom: 20 },
    titleIcon: {
        width: 46,
        height: 46,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        backgroundColor: colors.primaryLight,
    },
    title: { color: colors.text, fontSize: 22, fontWeight: "700" },
    subtitle: { marginTop: 3, color: colors.muted, fontSize: 12 },
    notificationList: { gap: 10 },
    notificationCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 14,
        borderRadius: 14,
        backgroundColor: colors.surface,
    },
    notificationIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 13,
        backgroundColor: colors.primaryLight,
    },
    notificationContent: { flex: 1 },
    notificationHeading: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },
    notificationTitle: { flex: 1, color: colors.text, fontSize: 13, fontWeight: "600" },
    notificationAmount: { color: colors.text, fontSize: 12, fontWeight: "600" },
    incomeAmount: { color: colors.success },
    notificationDetail: { marginTop: 4, color: colors.muted, fontSize: 11 },
    emptyState: { alignItems: "center", marginTop: 80 },
    emptyTitle: { marginTop: 12, color: colors.text, fontSize: 16, fontWeight: "600" },
    emptyText: { marginTop: 5, color: colors.muted, fontSize: 12 },
});
