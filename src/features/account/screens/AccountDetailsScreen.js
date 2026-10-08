import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { useAuth } from "../../auth/context/AuthContext";
import { formatNaira, getTransactionTotals } from "../../transactions/data/transactions";
export default function AccountDetailsScreen({ navigation, route, }) {
    const { signOut } = useAuth();
    const [isSigningOut, setIsSigningOut] = useState(false);
    const totals = getTransactionTotals();
    const balance = totals.income - totals.expenses;
    const handleSignOut = async () => {
        if (isSigningOut) {
            return;
        }
        setIsSigningOut(true);
        try {
            await signOut();
        }
        catch {
            Alert.alert("Could not sign out", "Please try again.");
            setIsSigningOut(false);
        }
    };
    return (<SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Back to home" onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome name="arrow-left" size={17} color="#183b34"/>
          <Text style={styles.backLabel}>Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Account details</Text>
        <View style={styles.identity}>
          <Text style={styles.avatar}>B</Text>
          <View>
            <Text style={styles.username}>{route.params.username}</Text>
            <Text style={styles.memberLabel}>Baloniar member</Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account type</Text>
            <Text style={styles.detailValue}>Personal</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account number</Text>
            <Text style={styles.detailValue}>....1275</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total balance</Text>
            <Text style={styles.detailValue}>{formatNaira(balance)}</Text>
          </View>
        </View>

        <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: isSigningOut }} disabled={isSigningOut} onPress={handleSignOut} style={[styles.signOutButton, isSigningOut && styles.signOutButtonDisabled]}>
          <Text style={styles.signOutButtonText}>
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>);
}
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#ffffff" },
    content: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 18, paddingBottom: 24 },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-start",
        gap: 9,
        minHeight: 40,
    },
    backLabel: { color: "#183b34", fontSize: 14, fontWeight: "600" },
    title: { marginTop: 24, color: "#183b34", fontSize: 25, fontWeight: "700" },
    identity: { flexDirection: "row", alignItems: "center", gap: 13, marginTop: 24 },
    avatar: {
        width: 50,
        height: 50,
        overflow: "hidden",
        borderRadius: 25,
        backgroundColor: "#eaf3ef",
        color: "#183b34",
        fontSize: 25,
        fontWeight: "700",
        lineHeight: 50,
        textAlign: "center",
    },
    username: { color: "#202b27", fontSize: 16, fontWeight: "700" },
    memberLabel: { marginTop: 4, color: "#74817b", fontSize: 12 },
    details: {
        marginTop: 24,
        paddingHorizontal: 15,
        borderRadius: 10,
        backgroundColor: "#f5f8f6",
    },
    detailRow: {
        minHeight: 54,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e7ece9",
    },
    detailLabel: { color: "#74817b", fontSize: 13 },
    detailValue: { color: "#202b27", fontSize: 13, fontWeight: "600" },
    signOutButton: {
        minHeight: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
        borderRadius: 10,
        backgroundColor: "#183b34",
    },
    signOutButtonDisabled: { opacity: 0.65 },
    signOutButtonText: { color: "#ffffff", fontSize: 14, fontWeight: "700" },
});
