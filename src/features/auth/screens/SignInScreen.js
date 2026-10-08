import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";
import { authColors } from "../theme/authTheme";
export default function SignInScreen({ navigation }) {
    const { isReady, signIn, verifyCredentials } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const handleSignIn = async () => {
        const trimmedUsername = username.trim();
        if (!isReady) {
            Alert.alert("Please wait", "Your saved account is still loading.");
            return;
        }
        if (!trimmedUsername || !password) {
            Alert.alert("Missing details", "Enter your username and password to continue.");
            return;
        }
        if (!verifyCredentials(trimmedUsername, password)) {
            Alert.alert("Sign-in failed", "Check your details or create a demo account.");
            return;
        }
        try {
            await signIn(trimmedUsername, rememberMe);
        }
        catch {
            Alert.alert("Sign-in error", "Your local session could not be saved. Please try again.");
        }
    };
    return (<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
          <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
            <View style={styles.brandMark}>
              <Ionicons name="wallet-outline" size={30} color="#ffffff"/>
            </View>
            <Text style={styles.brandName}>MyWallet</Text>

            <View style={styles.intro}>
              <Text style={styles.title}>Welcome back</Text>
              <Text style={styles.subtitle}>Sign in to view your wallet.</Text>
            </View>

            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={19} color={authColors.icon}/>
                <TextInput accessibilityLabel="Username" autoCapitalize="none" autoComplete="username" onChangeText={setUsername} placeholder="Username" placeholderTextColor={authColors.placeholder} returnKeyType="next" style={styles.input} value={username}/>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={19} color={authColors.icon}/>
                <TextInput accessibilityLabel="Password" autoCapitalize="none" autoComplete="current-password" onChangeText={setPassword} onSubmitEditing={handleSignIn} placeholder="Password" placeholderTextColor={authColors.placeholder} returnKeyType="done" secureTextEntry={!showPassword} style={styles.input} value={password}/>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel={showPassword ? "Hide password" : "Show password"} onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                  <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={19} color={authColors.icon}/>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.accountOptionsRow}>
              <TouchableOpacity accessibilityRole="checkbox" accessibilityState={{ checked: rememberMe }} onPress={() => setRememberMe(!rememberMe)} style={styles.rememberMe}>
                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                  {rememberMe && <Ionicons name="checkmark" size={13} color="#ffffff"/>}
                </View>
                <Text style={styles.rememberMeLabel}>Remember me</Text>
              </TouchableOpacity>
              <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate("ForgotPassword")}>
                <Text style={styles.forgotPassword}>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity accessibilityRole="button" onPress={handleSignIn} style={styles.signInButton}>
              <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>

            <View style={styles.signUpContainer}>
              <Text style={styles.footerText}>New to MyWallet? </Text>
              <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.linkText}>Create an account</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.previewNote}>Demo wallet · No real payments</Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>);
}
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: authColors.background },
    keyboardAvoidingView: { flex: 1 },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 24,
        paddingVertical: 32,
    },
    brandMark: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        borderRadius: 20,
        backgroundColor: authColors.primary,
    },
    brandName: {
        marginTop: 10,
        color: authColors.primary,
        fontSize: 18,
        fontWeight: "700",
        textAlign: "center",
    },
    intro: { marginTop: 36, marginBottom: 22 },
    title: {
        color: authColors.primary,
        fontSize: 28,
        fontWeight: "800",
        textAlign: "center",
    },
    subtitle: { marginTop: 8, color: authColors.muted, fontSize: 14, textAlign: "center" },
    form: { gap: 12 },
    inputContainer: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: authColors.border,
        borderRadius: 14,
        backgroundColor: authColors.surface,
    },
    input: { flex: 1, marginLeft: 12, color: authColors.primary, fontSize: 15 },
    passwordToggle: { padding: 6 },
    accountOptionsRow: {
        minHeight: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    rememberMe: { flexDirection: "row", alignItems: "center", gap: 9 },
    checkbox: {
        width: 20,
        height: 20,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: authColors.border,
        borderRadius: 6,
        backgroundColor: authColors.surface,
    },
    checkboxChecked: { borderColor: authColors.primary, backgroundColor: authColors.primary },
    rememberMeLabel: { color: authColors.muted, fontSize: 12 },
    forgotPassword: { color: authColors.primary, fontSize: 12, fontWeight: "700" },
    signInButton: {
        height: 55,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        borderRadius: 14,
        backgroundColor: authColors.primary,
    },
    signInButtonText: { color: "#ffffff", fontSize: 15, fontWeight: "700" },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 24,
    },
    footerText: { color: authColors.muted, fontSize: 13 },
    linkText: { color: authColors.primary, fontSize: 13, fontWeight: "700" },
    previewNote: { marginTop: 26, color: authColors.muted, fontSize: 11, textAlign: "center" },
});
