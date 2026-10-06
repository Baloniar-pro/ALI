import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import type { MainTabParamList } from "../navigation/types";

type ProfileScreenProps = BottomTabScreenProps<MainTabParamList, "Profile">;

export default function ProfileScreen({ route }: ProfileScreenProps) {
  const username = route.params.username;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileHeader}>
          <Image source={require("../../assets/images/user.png")} style={styles.avatar} />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.memberLabel}>Baloniar member</Text>
        </View>

        <Text style={styles.sectionTitle}>Account details</Text>
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Username</Text>
            <Text style={styles.detailValue}>{username}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account type</Text>
            <Text style={styles.detailValue}>Personal</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Account number</Text>
            <Text style={styles.detailValue}>•••• 2048</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Security</Text>
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Password</Text>
            <Text style={styles.detailValue}>Protected</Text>
          </View>
          <Text style={styles.securityNote}>Your password is stored securely on this device.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#ffffff" },
  content: { paddingHorizontal: 22, paddingTop: 18, paddingBottom: 24 },
  title: { color: "#183b34", fontSize: 25, fontWeight: "700" },
  profileHeader: { alignItems: "center", paddingVertical: 28 },
  avatar: { width: 74, height: 74, resizeMode: "contain" },
  username: { marginTop: 12, color: "#202b27", fontSize: 19, fontWeight: "700" },
  memberLabel: { marginTop: 5, color: "#74817b", fontSize: 13 },
  sectionTitle: { marginTop: 14, marginBottom: 10, color: "#202b27", fontSize: 16, fontWeight: "600" },
  details: { paddingHorizontal: 15, borderRadius: 10, backgroundColor: "#f5f8f6" },
  detailRow: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e7ece9",
  },
  detailLabel: { color: "#74817b", fontSize: 13 },
  detailValue: { flexShrink: 1, color: "#202b27", fontSize: 13, fontWeight: "600" },
  securityNote: { paddingVertical: 12, color: "#74817b", fontSize: 12, lineHeight: 18 },
});