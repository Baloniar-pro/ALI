import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { authColors, authTypography } from "../theme/authTheme";
export default function SignUpScreen({ navigation }) {
    const { createAccount, isReady } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isCreatingAccount, setIsCreatingAccount] = useState(false);
    const isFormValid = isReady &&
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
                Alert.alert("Account exists", "An account already exists on this device.");
                return;
            }
            Alert.alert("Account created", "You can now sign in with your new account.");
            navigation.navigate("SignIn");
        }
        catch {
            Alert.alert("Could not create account", "Please try again.");
        }
        finally {
            setIsCreatingAccount(false);
        }
    };
    return (<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
            <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
              <View style={styles.brandRow}>
                <TouchableOpacity accessibilityLabel="Back to sign in" accessibilityRole="button" onPress={() => navigation.navigate("SignIn")} style={styles.backButton}>
                  <FontAwesome name="arrow-left" size={17} color={authColors.primary}/>
                </TouchableOpacity>
                <Text style={styles.brandName}>MyWallet</Text>
              </View>

              <View style={styles.intro}>
                <Text style={styles.title}>Make room for{"\n"}something new.</Text>
                <Text style={styles.subtitle}>Create your account to get started.</Text>
              </View>

              <View style={styles.form}>
                <View>
                  <Text style={styles.fieldLabel}>Username</Text>
                  <View style={styles.inputContainer}>
                    <FontAwesome name="user-o" size={18} color={authColors.icon}/>
                    <TextInput accessibilityLabel="Username" autoCapitalize="none" autoComplete="username" onChangeText={setUsername} placeholder="Choose a username" placeholderTextColor={authColors.placeholder} returnKeyType="next" style={styles.input} value={username}/>
                  </View>
                </View>

                <View>
                  <Text style={styles.fieldLabel}>Password</Text>
                  <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color={authColors.icon}/>
                    <TextInput accessibilityLabel="Password" autoCapitalize="none" autoComplete="new-password" onChangeText={setPassword} placeholder="At least 8 characters" placeholderTextColor={authColors.placeholder} returnKeyType="next" secureTextEntry={!showPassword} style={styles.input} value={password}/>
                    <TouchableOpacity accessibilityLabel={showPassword ? "Hide password" : "Show password"} accessibilityRole="button" onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                      <FontAwesome name={showPassword ? "eye" : "eye-slash"} size={17} color={authColors.icon}/>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <Text style={styles.fieldLabel}>Confirm password</Text>
                  <View style={styles.inputContainer}>
                    <FontAwesome name="lock" size={20} color={authColors.icon}/>
                    <TextInput accessibilityLabel="Confirm password" autoCapitalize="none" autoComplete="new-password" onChangeText={setConfirmPassword} onSubmitEditing={handleCreateAccount} placeholder="Enter your password again" placeholderTextColor={authColors.placeholder} returnKeyType="done" secureTextEntry={!showPassword} style={styles.input} value={confirmPassword}/>
                  </View>
                </View>
              </View>

              <TouchableOpacity accessibilityRole="button" accessibilityState={{ disabled: !isFormValid || isCreatingAccount }} disabled={!isFormValid || isCreatingAccount} onPress={handleCreateAccount} style={[
            styles.createButton,
            !isFormValid && styles.disabledButton,
        ]}>
                <Text style={styles.createButtonText}>
                  {isCreatingAccount ? "Saving account..." : "Create account"}
                </Text>
              </TouchableOpacity>

              <View style={styles.signInRow}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate("SignIn")}>
                  <Text style={styles.signInLink}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>);
}
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: authColors.background,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    brandRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 12,
    },
    backButton: {
        width: 44,
        height: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 22,
        backgroundColor: authColors.soft,
    },
    brandName: {
        marginLeft: 12,
        color: authColors.primary,
        ...authTypography.brand,
    },
    intro: {
        marginTop: 44,
        marginBottom: 30,
    },
    title: {
        color: authColors.primary,
        ...authTypography.title,
    },
    subtitle: {
        marginTop: 12,
        color: authColors.muted,
        ...authTypography.subtitle,
    },
    form: {
        gap: 16,
    },
    fieldLabel: {
        marginBottom: 8,
        color: authColors.text,
        ...authTypography.label,
    },
    inputContainer: {
        height: 54,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: authColors.border,
        borderRadius: 12,
        backgroundColor: authColors.surface,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        color: authColors.primary,
        ...authTypography.input,
    },
    passwordToggle: {
        padding: 6,
    },
    createButton: {
        height: 54,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 24,
        borderRadius: 12,
        backgroundColor: authColors.primary,
    },
    disabledButton: {
        backgroundColor: authColors.muted,
    },
    createButtonText: {
        color: authColors.surface,
        ...authTypography.button,
    },
    signInRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
        marginBottom: 28,
    },
    footerText: {
        color: authColors.muted,
        ...authTypography.footer,
    },
    signInLink: {
        color: authColors.primary,
        ...authTypography.link,
    },
});
