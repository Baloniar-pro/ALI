import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import colors from "../../../theme/colors";
import { useAuth } from "../../auth/context/AuthContext";
export default function ProfileScreen({ route }) {
    const username = route.params.username;
    const { profile, profileError, signOut, updateProfile } = useAuth();
    const [fullName, setFullName] = useState(profile?.fullName ?? username);
    const [email, setEmail] = useState(profile?.email ?? "");
    const [phone, setPhone] = useState(profile?.phone ?? "");
    const [address, setAddress] = useState(profile?.address ?? "");
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const handleSaveProfile = async () => {
        if (isSavingProfile) {
            return;
        }
        if (!fullName.trim()) {
            Alert.alert("Add your name", "Enter your full name before saving your profile.");
            return;
        }
        if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            Alert.alert("Check your email", "Enter a valid email address.");
            return;
        }
        setIsSavingProfile(true);
        try {
            await updateProfile({
                fullName: fullName.trim(),
                email: email.trim(),
                phone: phone.trim(),
                address: address.trim(),
            });
            Alert.alert("Profile saved", "Your profile details have been securely saved on this device.");
        }
        catch (error) {
            Alert.alert("Could not save profile", error instanceof Error ? error.message : "Please try again.");
        }
        finally {
            setIsSavingProfile(false);
        }
    };
    const handleSignOut = async () => {
        if (isSigningOut) {
            return;
        }
        setIsSigningOut(true);
        try {
            await signOut();
        }
        catch (error) {
            Alert.alert("Could not sign out", error instanceof Error ? error.message : "Please try again.");
            setIsSigningOut(false);
        }
    };
    return (<SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.eyebrow}>MYWALLET</Text>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person-outline" size={32} color={colors.primary}/>
          </View>
          <Text style={styles.username}>{fullName.trim() || username}</Text>
          <View style={styles.demoBadge}>
            <Text style={styles.demoBadgeText}>Demo account</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Personal information</Text>
        {profileError && (
          <View accessibilityRole="alert" style={styles.profileError}>
            <Ionicons name="warning-outline" size={17} color={colors.danger}/>
            <Text style={styles.profileErrorText}>{profileError}</Text>
          </View>
        )}
        <View style={styles.details}>
          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Full name</Text>
            <TextInput
              accessibilityLabel="Full name"
              autoCapitalize="words"
              onChangeText={setFullName}
              placeholder="Enter your full name"
              placeholderTextColor={colors.muted}
              style={styles.fieldInput}
              value={fullName}
            />
          </View>
          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Email address</Text>
            <TextInput
              accessibilityLabel="Email address"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="name@example.com"
              placeholderTextColor={colors.muted}
              style={styles.fieldInput}
              value={email}
            />
          </View>
          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Phone number</Text>
            <TextInput
              accessibilityLabel="Phone number"
              keyboardType="phone-pad"
              onChangeText={setPhone}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.muted}
              style={styles.fieldInput}
              value={phone}
            />
          </View>
          <View style={[styles.profileField, styles.lastProfileField]}>
            <Text style={styles.fieldLabel}>Address</Text>
            <TextInput
              accessibilityLabel="Address"
              autoCapitalize="words"
              multiline
              onChangeText={setAddress}
              placeholder="Enter your address"
              placeholderTextColor={colors.muted}
              style={[styles.fieldInput, styles.addressInput]}
              value={address}
            />
          </View>
        </View>

        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={{ disabled: isSavingProfile }}
          disabled={isSavingProfile}
          onPress={handleSaveProfile}
          style={[styles.saveButton, isSavingProfile && styles.disabledButton]}
        >
          <Ionicons name="checkmark" size={18} color="#ffffff"/>
          <Text style={styles.saveLabel}>{isSavingProfile ? "Saving profile..." : "Save profile"}</Text>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, styles.accountHeading]}>Account</Text>
        <View style={styles.details}>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="person-outline" size={17} color={colors.primary}/>
            </View>
            <Text style={styles.detailLabel}>Username</Text>
            <Text style={styles.detailValue}>{username}</Text>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailIcon}>
              <Ionicons name="wallet-outline" size={17} color={colors.primary}/>
            </View>
            <Text style={styles.detailLabel}>Wallet type</Text>
            <Text style={styles.detailValue}>Sample wallet</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.success}/>
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Your demo data stays local</Text>
            <Text style={styles.infoText}>
              This app uses sample wallet activity only. It is not connected to a bank or payment
              service.
            </Text>
          </View>
        </View>

        <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: isSigningOut }} disabled={isSigningOut} onPress={handleSignOut} style={[styles.signOutButton, isSigningOut && styles.disabledButton]}>
          <Ionicons name="log-out-outline" size={19} color={colors.danger}/>
          <Text style={styles.signOutLabel}>
            {isSigningOut ? "Signing out..." : "Sign out"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>);
}
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: colors.background },
    content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 28 },
    eyebrow: { color: colors.muted, fontSize: 10, fontWeight: "700", letterSpacing: 1.2 },
    title: { marginTop: 4, color: colors.text, fontSize: 26, fontWeight: "700" },
    profileHeader: { alignItems: "center", paddingVertical: 26 },
    avatar: {
        width: 76,
        height: 76,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 38,
        backgroundColor: colors.primaryLight,
    },
    username: { marginTop: 12, color: colors.text, fontSize: 19, fontWeight: "700" },
    demoBadge: {
        marginTop: 7,
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: 13,
        backgroundColor: colors.primaryLight,
    },
    demoBadgeText: { color: colors.success, fontSize: 11, fontWeight: "600" },
    sectionTitle: { marginBottom: 10, color: colors.text, fontSize: 16, fontWeight: "700" },
    details: { paddingHorizontal: 14, borderRadius: 14, backgroundColor: colors.surface },
    detailRow: {
        minHeight: 56,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    detailIcon: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 11,
        backgroundColor: colors.primaryLight,
    },
    detailLabel: { flex: 1, color: colors.muted, fontSize: 12 },
    detailValue: { color: colors.text, fontSize: 12, fontWeight: "600" },
    profileField: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
    },
    lastProfileField: { borderBottomWidth: 0 },
    profileError: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 10,
        padding: 11,
        borderRadius: 11,
        backgroundColor: "#fff0f0",
    },
    profileErrorText: { flex: 1, color: colors.danger, fontSize: 11, lineHeight: 16 },
    fieldLabel: { marginBottom: 7, color: colors.muted, fontSize: 11, fontWeight: "600" },
    fieldInput: {
        minHeight: 40,
        paddingHorizontal: 11,
        paddingVertical: 9,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 10,
        backgroundColor: colors.background,
        color: colors.text,
        fontSize: 13,
    },
    addressInput: { minHeight: 68, textAlignVertical: "top" },
    saveButton: {
        minHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 14,
        borderRadius: 14,
        backgroundColor: colors.primary,
    },
    saveLabel: { color: "#ffffff", fontSize: 14, fontWeight: "700" },
    accountHeading: { marginTop: 22 },
    infoCard: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 11,
        marginTop: 20,
        padding: 15,
        borderRadius: 14,
        backgroundColor: colors.primaryLight,
    },
    infoContent: { flex: 1 },
    infoTitle: { color: colors.primary, fontSize: 12, fontWeight: "700" },
    infoText: { marginTop: 5, color: colors.muted, fontSize: 11, lineHeight: 16 },
    signOutButton: {
        minHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        marginTop: 23,
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 14,
        backgroundColor: colors.surface,
    },
    disabledButton: { opacity: 0.6 },
    signOutLabel: { color: colors.danger, fontSize: 14, fontWeight: "700" },
});
