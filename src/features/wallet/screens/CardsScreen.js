import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";

const cardDetails = [
  { label: "Card type", value: "Virtual demo card" },
  { label: "Card number", value: "••••  ••••  ••••  4821" },
  { label: "Cardholder", value: "Demo user" },
  { label: "Expiry date", value: "08/28" },
  { label: "Status", value: "Demo only" },
];

export default function CardsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>MYWALLET</Text>
        <Text style={styles.title}>Cards</Text>
        <Text style={styles.subtitle}>Your card and its details</Text>

        <View style={styles.card}>
          <View style={styles.cardTopRow}>
            <View style={styles.cardBrand}>
              <Ionicons name="card" size={19} color={colors.accent} />
              <Text style={styles.cardBrandName}>MYWALLET</Text>
            </View>
            <Text style={styles.demoBadge}>DEMO</Text>
          </View>

          <View style={styles.chip}>
            <View style={styles.chipLineVertical} />
            <View style={styles.chipLineHorizontal} />
          </View>

          <Text style={styles.cardNumber}>••••  ••••  ••••  4821</Text>

          <View style={styles.cardBottomRow}>
            <View>
              <Text style={styles.cardMetaLabel}>CARDHOLDER</Text>
              <Text style={styles.cardMetaValue}>DEMO USER</Text>
            </View>
            <View>
              <Text style={styles.cardMetaLabel}>EXPIRES</Text>
              <Text style={styles.cardMetaValue}>08/28</Text>
            </View>
            <Ionicons name="wifi-outline" size={23} color="#d5e4dd" />
          </View>
        </View>

        <View style={styles.detailsHeader}>
          <Text style={styles.detailsTitle}>Card details</Text>
          <Text style={styles.detailsCaption}>Virtual card</Text>
        </View>
        <View style={styles.detailsCard}>
          {cardDetails.map((detail, index) => (
            <View
              key={detail.label}
              style={[styles.detailRow, index === cardDetails.length - 1 && styles.lastDetailRow]}
            >
              <Text style={styles.detailLabel}>{detail.label}</Text>
              <Text style={styles.detailValue}>{detail.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.notice}>
          <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
          <Text style={styles.noticeText}>
            This is a visual demo card only. It is not a real payment card and cannot be used to make purchases.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 28 },
  eyebrow: { color: colors.muted, fontSize: 10, fontWeight: "700", letterSpacing: 1.2 },
  title: { marginTop: 4, color: colors.text, fontSize: 26, fontWeight: "700" },
  subtitle: { marginTop: 5, color: colors.muted, fontSize: 13 },
  card: {
    minHeight: 205,
    justifyContent: "space-between",
    overflow: "hidden",
    marginTop: 22,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.primary,
  },
  cardTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardBrand: { flexDirection: "row", alignItems: "center", gap: 8 },
  cardBrandName: { color: "#ffffff", fontSize: 12, fontWeight: "700", letterSpacing: 1 },
  demoBadge: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.14)",
    color: "#d5e4dd",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
  chip: {
    width: 37,
    height: 28,
    justifyContent: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d5e4dd",
    borderRadius: 6,
    backgroundColor: "#abc2b6",
  },
  chipLineVertical: {
    position: "absolute",
    left: 11,
    width: 13,
    height: 28,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#668176",
  },
  chipLineHorizontal: {
    height: 1,
    backgroundColor: "#668176",
  },
  cardNumber: { color: "#ffffff", fontSize: 17, fontWeight: "600", letterSpacing: 1.1 },
  cardBottomRow: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  cardMetaLabel: { color: "#abc2b6", fontSize: 8, fontWeight: "600", letterSpacing: 0.7 },
  cardMetaValue: { marginTop: 4, color: "#ffffff", fontSize: 10, fontWeight: "600", letterSpacing: 0.4 },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 26,
    marginBottom: 11,
  },
  detailsTitle: { color: colors.text, fontSize: 16, fontWeight: "700" },
  detailsCaption: { color: colors.muted, fontSize: 11 },
  detailsCard: { paddingHorizontal: 15, borderRadius: 15, backgroundColor: colors.surface },
  detailRow: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  lastDetailRow: { borderBottomWidth: 0 },
  detailLabel: { color: colors.muted, fontSize: 12 },
  detailValue: { flexShrink: 1, color: colors.text, fontSize: 12, fontWeight: "600", textAlign: "right" },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginTop: 16,
    padding: 13,
    borderRadius: 13,
    backgroundColor: colors.primaryLight,
  },
  noticeText: { flex: 1, color: colors.primary, fontSize: 11, lineHeight: 16 },
});
