import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import type { RootStackParamList } from "../../../navigation/types";
import { authColors, authTypography } from "../theme/authTheme";

type ForgotPasswordScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ForgotPassword"
>;

export default function ForgotPasswordScreen({
  navigation,
}: ForgotPasswordScreenProps) {
  const { resetPassword } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleResetPassword = async () => {
    const normalizedUsername = username.trim();

    if (!normalizedUsername || !password || !confirmPassword) {
      Alert.alert("Missing details", "Enter your username and both password fields.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Password too short", "Your new password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Passwords don't match", "Check that both password fields are the same.");
      return;
    }

    setIsSaving(true);
    try {
      const wasReset = await resetPassword(normalizedUsername, password);
      if (!wasReset) {
        Alert.alert("Reset failed", "No account was found for this username.");
        return;
      }

      Alert.alert(
        "Password updated",
        "Your password has been reset. You can now sign in.",
        [{ text: "Back to sign in", onPress: () => navigation.goBack() }],
      );
    } catch {
      Alert.alert("Storage error", "Your password could not be securely saved.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <TouchableOpacity
            accessibilityLabel="Back to sign in"
            accessibilityRole="button"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <FontAwesome name="arrow-left" size={17} color={authColors.primary} />
            <Text style={styles.backLabel}>Back to sign in</Text>
          </TouchableOpacity>

          <View style={styles.heading}>
            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.subtitle}>
              Enter your username and choose a new password.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome
              name="user-o"
              size={18}
              color={authColors.icon}
              style={styles.inputIcon}
            />
            <TextInput
              accessibilityLabel="Username"
              autoCapitalize="none"
              autoComplete="username"
              onChangeText={setUsername}
              placeholder="Enter Username"
              placeholderTextColor={authColors.placeholder}
              style={styles.input}
              value={username}
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={20}
              color={authColors.icon}
              style={styles.inputIcon}
            />
            <TextInput
              accessibilityLabel="New password"
              autoCapitalize="none"
              autoComplete="new-password"
              onChangeText={setPassword}
              placeholder="New password (at least 8 characters)"
              placeholderTextColor={authColors.placeholder}
              secureTextEntry
              style={styles.input}
              value={password}
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome
              name="lock"
              size={20}
              color={authColors.icon}
              style={styles.inputIcon}
            />
            <TextInput
              accessibilityLabel="Confirm new password"
              autoCapitalize="none"
              autoComplete="new-password"
              onChangeText={setConfirmPassword}
              onSubmitEditing={handleResetPassword}
              placeholder="Confirm new password"
              placeholderTextColor={authColors.placeholder}
              returnKeyType="done"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
            />
          </View>

          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={{ disabled: isSaving }}
            disabled={isSaving}
            onPress={handleResetPassword}
            style={[styles.submitButton, isSaving && styles.submitButtonDisabled]}
          >
            <Text style={styles.submitButtonText}>
              {isSaving ? "SAVING PASSWORD..." : "RESET PASSWORD"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: authColors.background },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 18 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 9,
    minHeight: 42,
  },
  backLabel: { color: authColors.primary, ...authTypography.link },
  heading: { marginTop: 44, marginBottom: 20 },
  title: { color: authColors.primary, fontSize: 30, fontWeight: "800" },
  subtitle: { marginTop: 8, color: authColors.muted, fontSize: 14, lineHeight: 20 },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 54,
    marginTop: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: authColors.border,
    borderRadius: 12,
    backgroundColor: authColors.surface,
  },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    color: authColors.primary,
    ...authTypography.input,
  },
  submitButton: {
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: authColors.primary,
  },
  submitButtonDisabled: { opacity: 0.7 },
  submitButtonText: { color: "#ffffff", ...authTypography.button },
});
