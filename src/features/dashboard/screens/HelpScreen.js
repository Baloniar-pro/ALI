import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";

const helpTopics = [
    {
        icon: "wallet-outline",
        title: "Your wallet balance",
        description: "Your balance updates when you save a demo transaction.",
    },
    {
        icon: "flash-outline",
        title: "Quick actions",
        description: "Use Add money, Send money, Withdraw, or Bills to record activity.",
    },
    {
        icon: "shield-checkmark-outline",
        title: "Demo mode",
        description: "Transactions are sample records stored on this device. No real money moves.",
    },
];

export default function HelpScreen({ navigation }) {
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
                        <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.title}>Help</Text>
                        <Text style={styles.subtitle}>Wallet guide</Text>
                    </View>
                </View>

                <View style={styles.topicList}>
                    {helpTopics.map((topic) => (
                        <View key={topic.title} style={styles.topicCard}>
                            <View style={styles.topicIcon}>
                                <Ionicons name={topic.icon} size={20} color={colors.primary} />
                            </View>
                            <View style={styles.topicContent}>
                                <Text style={styles.topicTitle}>{topic.title}</Text>
                                <Text style={styles.topicDescription}>{topic.description}</Text>
                            </View>
                        </View>
                    ))}
                </View>
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
    topicList: { gap: 12 },
    topicCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
        padding: 16,
        borderRadius: 14,
        backgroundColor: colors.surface,
    },
    topicIcon: {
        width: 38,
        height: 38,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 13,
        backgroundColor: colors.primaryLight,
    },
    topicContent: { flex: 1 },
    topicTitle: { color: colors.text, fontSize: 14, fontWeight: "600" },
    topicDescription: { marginTop: 5, color: colors.muted, fontSize: 12, lineHeight: 18 },
});
