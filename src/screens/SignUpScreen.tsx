import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import type { RootStackParamList } from "../navigation/types";
import { authColors, authTypography } from "../theme/authTheme";

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, "SignUp">;

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const { createAccount, isReady } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const isFormValid =
    isReady &&
    username.trim().length > 0 &&
    password.length >= 8 &&
    password === confirmPassword;

  const handleCreateAccount = async () => {
    const trimmedUsername = username.trim();

    if (!isFormValid || isCreatingAccount) {
      return;
    }

    setIsCreatingAccount(true);
    try {
      const result = await createAccount({ username: trimmedUsername, password });
      if (result === "already-exists") {
        Alert.alert(
          "Account already exists",
          "You already have an account. Sign in with your saved username instead.",
          [{ text: "Go to sign in", onPress: () => navigation.navigate("SignIn") }],
        );
        return;
      }

      Alert.alert("Account created", "Sign in with your new account.", [
        { text: "Continue", onPress: () => navigation.navigate("SignIn") },
      ]);
    } catch {
      Alert.alert("Storage error", "Your account could not be securely saved on this device.");
    } finally {
      setIsCreatingAccount(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1, backgroundColor: authColors.background }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={{ flexDirection: "row", alignItems: "center", paddingTop: 12 }}>
              <TouchableOpacity
                accessibilityLabel="Back to sign in"
                accessibilityRole="button"
                onPress={() => navigation.navigate("SignIn")}
                style={{
                  width: 44,
                  height: 44,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 22,
                  backgroundColor: authColors.soft,
                }}
              >
                <FontAwesome name="arrow-left" size={17} color={authColors.primary} />
              </TouchableOpacity>
              <Text
                style={{
                  marginLeft: 12,
                  color: authColors.primary,
                  ...authTypography.brand,
                }}
              >
                BALONIAR
              </Text>
            </View>

            <View style={{ marginTop: 44, marginBottom: 30 }}>
              <Text
                style={{
                  color: authColors.primary,
                  ...authTypography.title,
                }}
              >
                Make room for{"\n"}something new.
              </Text>
              <Text style={{ marginTop: 12, color: authColors.muted, ...authTypography.subtitle }}>
                Create your account to get started.
              </Text>
            </View>

            <View style={{ gap: 16 }}>
              <View>
                <Text style={{ marginBottom: 8, color: authColors.text, ...authTypography.label }}>
                  Username
                </Text>
                <View
                  style={{
                    height: 54,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: authColors.border,
                    borderRadius: 12,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <FontAwesome name="user-o" size={18} color={authColors.icon} />
                  <TextInput
                    accessibilityLabel="Username"
                    autoCapitalize="none"
                    autoComplete="username"
                    onChangeText={setUsername}
                    placeholder="Choose a username"
                    placeholderTextColor={authColors.placeholder}
                    returnKeyType="next"
                    style={{ flex: 1, marginLeft: 12, color: authColors.primary, ...authTypography.input }}
                    value={username}
                  />
                </View>
              </View>

              <View>
                <Text style={{ marginBottom: 8, color: authColors.text, ...authTypography.label }}>
                  Password
                </Text>
                <View
                  style={{
                    height: 54,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: authColors.border,
                    borderRadius: 12,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <FontAwesome name="lock" size={20} color={authColors.icon} />
                  <TextInput
                    accessibilityLabel="Password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    onChangeText={setPassword}
                    placeholder="At least 8 characters"
                    placeholderTextColor={authColors.placeholder}
                    returnKeyType="next"
                    secureTextEntry={!showPassword}
                    style={{ flex: 1, marginLeft: 12, color: authColors.primary, ...authTypography.input }}
                    value={password}
                  />
                  <TouchableOpacity
                    accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                    accessibilityRole="button"
                    onPress={() => setShowPassword(!showPassword)}
                    style={{ padding: 6 }}
                  >
                    <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={17} color={authColors.icon} />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text style={{ marginBottom: 8, color: authColors.text, ...authTypography.label }}>
                  Confirm password
                </Text>
                <View
                  style={{
                    height: 54,
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    borderWidth: 1,
                    borderColor: authColors.border,
                    borderRadius: 12,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <FontAwesome name="lock" size={20} color={authColors.icon} />
                  <TextInput
                    accessibilityLabel="Confirm password"
                    autoCapitalize="none"
                    onChangeText={setConfirmPassword}
                    onSubmitEditing={handleCreateAccount}
                    placeholder="Enter your password again"
                    placeholderTextColor={authColors.placeholder}
                    returnKeyType="done"
                    secureTextEntry={!showPassword}
                    style={{ flex: 1, marginLeft: 12, color: authColors.primary, ...authTypography.input }}
                    value={confirmPassword}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={{ disabled: !isFormValid || isCreatingAccount }}
              disabled={!isFormValid || isCreatingAccount}
              onPress={handleCreateAccount}
              style={{
                height: 54,
                alignItems: "center",
                justifyContent: "center",
                marginTop: 24,
                borderRadius: 12,
                backgroundColor: isFormValid ? authColors.primary : authColors.muted,
              }}
            >
              <Text style={{ color: authColors.surface, ...authTypography.button }}>
                {isCreatingAccount ? "Saving account..." : "Create account"}
              </Text>
            </TouchableOpacity>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 24,
                marginBottom: 28,
              }}
            >
              <Text style={{ color: authColors.muted, ...authTypography.footer }}>Already have an account? </Text>
              <TouchableOpacity
                accessibilityRole="button"
                onPress={() => navigation.navigate("SignIn")}
              >
                <Text style={{ color: authColors.primary, ...authTypography.link }}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}