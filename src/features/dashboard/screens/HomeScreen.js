import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import colors from "../../../theme/colors";
import { useWallet } from "../../wallet/context/WalletContext";
import { formatNaira } from "../../transactions/data/transactions";
const quickActions = [
    { id: "add", label: "Add Money", icon: "add-circle-outline" },
    { id: "send", label: "Send Money", icon: "paper-plane-outline" },
    { id: "withdraw", label: "Withdraw", icon: "cash-outline" },
    { id: "loan", label: "Loans", icon: "document-text-outline" },
];
const quickServices = [
    { id: "airtime", label: "Airtime", icon: "phone-portrait-outline" },
    { id: "data", label: "Data", icon: "cellular-outline" },
    { id: "electricity", label: "Electricity", icon: "flash-outline" },
    { id: "tv", label: "TV", icon: "tv-outline" },
    { id: "internet", label: "Internet", icon: "wifi-outline" },
    { id: "education", label: "Education", icon: "school-outline" },
    { id: "betting", label: "Betting", icon: "football-outline" },
];
const moreServices = [
    { id: "water", label: "Water", icon: "water-outline" },
    { id: "transport", label: "Transport", icon: "bus-outline" },
    { id: "insurance", label: "Insurance", icon: "shield-checkmark-outline" },
    { id: "government", label: "Government", icon: "business-outline" },
];
function getEarnedToday(transactions) {
    const today = new Date().toDateString();
    return transactions.reduce((total, transaction) => {
        if (transaction.kind !== "income") {
            return total;
        }

        const timestamp = transaction.createdAt ??
            (/^\d{13}-/.test(transaction.id) ? Number(transaction.id.split("-")[0]) : null);
        const isFromToday = timestamp !== null
            ? new Date(timestamp).toDateString() === today
            : /^Today(?:,|\s|$)/i.test(transaction.detail);

        return isFromToday ? total + transaction.amountValue : total;
    }, 0);
}
export default function HomeScreen({ route, navigation }) {
    const username = route.params.username;
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const [areMoreServicesVisible, setAreMoreServicesVisible] = useState(false);
    const { balance, isReady, storageError, transactions } = useWallet();
    const earnedToday = getEarnedToday(transactions);
    const firstName = username.trim().split(/\s+/)[0] || username;
    const openAction = (action, service) => navigation.navigate("ActionDetails", {
        action,
        username,
        ...(service ? { service } : {}),
    });
    return (<ScrollView contentContainerStyle={styles.content} style={styles.list}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Ionicons name="person-outline" size={17} color={colors.primary}/>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.greeting}>Hi, {firstName}</Text>
            </View>
            <View style={styles.headerActions}>
              <TouchableOpacity accessibilityRole="button" accessibilityLabel="Open notifications" onPress={() => navigation.navigate("Notifications")} style={styles.headerActionIcon}>
                <Ionicons name="notifications-outline" size={19} color={colors.primary}/>
              </TouchableOpacity>
              <TouchableOpacity accessibilityRole="button" accessibilityLabel="Open help" onPress={() => navigation.navigate("Help")} style={styles.headerActionIcon}>
                <Ionicons name="help-circle-outline" size={20} color={colors.primary}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.balanceCard}>
            <View style={styles.balanceAmountRow}>
              <Text style={styles.balanceAmount}>
                {isReady
                  ? isBalanceVisible
                      ? formatNaira(balance)
                      : "₦ ••••••••"
                  : "Loading wallet..."}
              </Text>
              <TouchableOpacity accessibilityRole="button" accessibilityLabel={isBalanceVisible ? "Hide balance" : "Show balance"} accessibilityState={{ expanded: isBalanceVisible }} onPress={() => setIsBalanceVisible(!isBalanceVisible)} style={styles.balanceToggle}>
                <Ionicons name={isBalanceVisible ? "eye-outline" : "eye-off-outline"} size={21} color="#ffffff"/>
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceLabel}>Wallet balance</Text>
            <View style={styles.earnedToday}>
              <Text style={styles.earnedTodayLabel}>Earned today</Text>
              <Text style={styles.earnedTodayAmount}>
                {isReady
                  ? isBalanceVisible
                      ? formatNaira(earnedToday)
                      : "₦ ••••••••"
                  : "Loading..."}
              </Text>
            </View>
          </View>

          <View style={styles.actionHeading}>
            <Text style={styles.sectionTitle}>Quick actions</Text>
          </View>
          <View style={styles.quickActions}>
            {quickActions.map((action) => (<TouchableOpacity key={action.id} accessibilityRole="button" accessibilityLabel={action.label} disabled={!isReady} onPress={() => openAction(action.id)} style={[styles.quickAction, !isReady && styles.disabledAction]}>
                <View style={styles.actionIcon}>
                  <Ionicons name={action.icon} size={24} color={colors.primary}/>
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>))}
          </View>

          <View style={styles.servicesHeading}>
            <Text style={styles.sectionTitle}>Quick services</Text>
          </View>
          <View style={styles.quickServices}>
            {quickServices.map((service) => (<TouchableOpacity key={service.id} accessibilityRole="button" accessibilityLabel={service.label} disabled={!isReady} onPress={() => openAction("bills", service.label)} style={[styles.quickService, !isReady && styles.disabledAction]}>
                <View style={styles.serviceIcon}>
                  <Ionicons name={service.icon} size={22} color={colors.primary}/>
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>))}
            {areMoreServicesVisible && moreServices.map((service) => (<TouchableOpacity key={service.id} accessibilityRole="button" accessibilityLabel={service.label} disabled={!isReady} onPress={() => openAction("bills", service.label)} style={[styles.quickService, !isReady && styles.disabledAction]}>
                <View style={styles.serviceIcon}>
                  <Ionicons name={service.icon} size={22} color={colors.primary}/>
                </View>
                <Text style={styles.serviceLabel}>{service.label}</Text>
              </TouchableOpacity>))}
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel={areMoreServicesVisible ? "Show fewer services" : "Show more services"}
              accessibilityState={{ expanded: areMoreServicesVisible }}
              onPress={() => setAreMoreServicesVisible((visible) => !visible)}
              style={styles.quickService}
            >
              <View style={styles.serviceIcon}>
                <Ionicons
                  name={areMoreServicesVisible ? "chevron-up-outline" : "ellipsis-horizontal-circle-outline"}
                  size={22}
                  color={colors.primary}
                />
              </View>
              <Text style={styles.serviceLabel}>{areMoreServicesVisible ? "Less" : "More"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.adCard}>
            <View style={styles.adCopy}>
              <Text style={styles.adBadge}>SPONSORED</Text>
              <Text style={styles.adTitle}>Stay connected</Text>
              <Text style={styles.adDescription}>Top up airtime or data in just a few steps.</Text>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Explore data bundles"
                disabled={!isReady}
                onPress={() => openAction("bills", "Data")}
                style={[styles.adButton, !isReady && styles.disabledAction]}
              >
                <Text style={styles.adButtonLabel}>Explore offers</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.primary}/>
              </TouchableOpacity>
            </View>
            <View style={styles.adArtwork}>
              <Ionicons name="wifi" size={34} color={colors.accent}/>
              <View style={styles.adArtworkDot}/>
            </View>
          </View>

          {storageError && (<View accessibilityRole="alert" style={styles.errorNotice}>
              <Ionicons name="warning-outline" size={18} color={colors.danger}/>
              <Text style={styles.errorText}>{storageError}</Text>
            </View>)}
        </ScrollView>);
}
const styles = StyleSheet.create({
    list: { flex: 1, backgroundColor: colors.background },
    content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 36, paddingBottom: 28 },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    avatar: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 19,
        backgroundColor: colors.primaryLight,
    },
    headerText: { flex: 1, marginLeft: 10 },
    greeting: { color: colors.text, fontSize: 17, fontWeight: "500" },
    headerActions: { flexDirection: "row", alignItems: "center", gap: 8 },
    headerActionIcon: {
        width: 36,
        height: 36,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 18,
        backgroundColor: colors.surface,
    },
    balanceCard: {
        padding: 22,
        borderRadius: 22,
        backgroundColor: colors.primary,
    },
    balanceAmountRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    balanceLabel: { marginTop: 3, color: "#abc2b6", fontSize: 11, fontWeight: "500" },
    balanceToggle: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: "rgba(255, 255, 255, 0.12)",
    },
    balanceAmount: {
        flex: 1,
        color: "#ffffff",
        fontSize: 23,
        fontWeight: "700",
        letterSpacing: 0.2,
    },
    earnedToday: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 16,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: "rgba(255, 255, 255, 0.18)",
    },
    earnedTodayLabel: { color: "#d5e4dd", fontSize: 12 },
    earnedTodayAmount: { color: "#ffffff", fontSize: 14, fontWeight: "600" },
    actionHeading: { marginTop: 24, marginBottom: 12 },
    sectionTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
    quickActions: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 16 },
    quickAction: { width: "23%", minWidth: 66, alignItems: "center", gap: 7 },
    disabledAction: { opacity: 0.55 },
    actionIcon: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        backgroundColor: colors.surface,
    },
    quickActionLabel: { width: "100%", color: colors.text, fontSize: 10, fontWeight: "500", textAlign: "center" },
    servicesHeading: { marginTop: 25, marginBottom: 12 },
    quickServices: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 16 },
    quickService: { width: "23%", minWidth: 66, alignItems: "center", gap: 7 },
    serviceIcon: {
        width: 48,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 16,
        backgroundColor: colors.surface,
    },
    serviceLabel: { color: colors.text, fontSize: 10, fontWeight: "500", textAlign: "center" },
    adCard: {
        minHeight: 150,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
        marginTop: 26,
        padding: 18,
        borderRadius: 18,
        backgroundColor: colors.primary,
    },
    adCopy: { flex: 1, alignItems: "flex-start", paddingRight: 10 },
    adBadge: {
        overflow: "hidden",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.16)",
        color: "#d5e4dd",
        fontSize: 9,
        fontWeight: "700",
        letterSpacing: 0.7,
    },
    adTitle: { marginTop: 9, color: "#ffffff", fontSize: 17, fontWeight: "700" },
    adDescription: { maxWidth: 210, marginTop: 4, color: "#d5e4dd", fontSize: 11, lineHeight: 16 },
    adButton: {
        minHeight: 34,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 12,
        paddingHorizontal: 11,
        borderRadius: 17,
        backgroundColor: colors.accent,
    },
    adButtonLabel: { color: colors.primary, fontSize: 10, fontWeight: "700" },
    adArtwork: {
        width: 76,
        height: 76,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 24,
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        transform: [{ rotate: "-8deg" }],
    },
    adArtworkDot: {
        position: "absolute",
        top: 9,
        right: 10,
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: colors.accent,
    },
    errorNotice: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginTop: 15,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#fff0f0",
    },
    errorText: { flex: 1, color: colors.danger, fontSize: 11, lineHeight: 16 },
});
