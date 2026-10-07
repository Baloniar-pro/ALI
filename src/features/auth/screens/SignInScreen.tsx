import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { useAuth } from "../context/AuthContext";
import type { RootStackParamList } from "../../../navigation/types";
import { authColors, authTypography } from "../theme/authTheme";

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: SignInScreenProps) {
  const { isReady, signIn, verifyCredentials } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = async () => {
    if (!isReady) {
      Alert.alert("Please wait", "Your saved account is still loading.");
      return;
    }

    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    if (!verifyCredentials(username.trim(), password)) {
      Alert.alert("No Records Founds", "Please sign up.");
      return;
    }

    try {
      await signIn(username.trim(), rememberMe);
    } catch {
      Alert.alert("Sign-in error", "Your session could not be securely saved.");
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome back!</Text>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="user-o" size={18} color={authColors.icon} style={styles.inputIcon} />
          <TextInput
            placeholder="Enter Username"
            placeholderTextColor={authColors.placeholder}
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="lock" size={20} color={authColors.icon} style={styles.inputIcon} />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={authColors.placeholder}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={showPassword ? "Hide password" : "Show password"}
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}
          >
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={18}
              color={showPassword ? authColors.primary : authColors.placeholder}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.accountOptionsRow}>
          <TouchableOpacity
            accessibilityRole="checkbox"
            accessibilityState={{ checked: rememberMe }}
            onPress={() => setRememberMe(!rememberMe)}
            style={styles.rememberMe}
          >
            <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
              {rememberMe && <FontAwesome name="check" size={12} color="#ffffff" />}
            </View>
            <Text style={styles.rememberMeLabel}>Remember me</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>SIGN IN</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialLogin}>
          <Image source={require("../../../../assets/images/google.png")} style={styles.socialIcon} />
          <View style={styles.socialDivider} />
          <FontAwesome name="apple" size={42} color={authColors.primary} />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.linkText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor: authColors.background,
  },
  titleContainer: {
    alignSelf: "center",
    paddingTop: 215,
  },
  title: {
    ...authTypography.title,
    color: authColors.primary,
  },
  inputContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 54,
    marginHorizontal: 24,
    marginTop: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: authColors.border,
    borderRadius: 12,
    backgroundColor: authColors.surface,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    ...authTypography.input,
    color: authColors.primary,
  },
  passwordToggle: {
    padding: 4,
  },
  accountOptionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 42,
    marginHorizontal: 24,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  checkbox: {
    width: 19,
    height: 19,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: authColors.border,
    borderRadius: 4,
    backgroundColor: authColors.surface,
  },
  checkboxChecked: {
    borderColor: authColors.primary,
    backgroundColor: authColors.primary,
  },
  rememberMeLabel: {
    color: authColors.primary,
    ...authTypography.link,
  },
  forgotPassword: {
    color: authColors.primary,
    ...authTypography.link,
  },
  signInButton: {
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: authColors.primary,
  },
  signInButtonText: {
    color: "white",
    ...authTypography.button,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: authColors.divider,
  },
  dividerText: {
    marginHorizontal: 10,
    color: authColors.muted,
  },
  socialLogin: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginTop: 10,
  },
  socialIcon: {
    height: 40,
    width: 40,
  },
  socialDivider: {
    height: 40,
    width: 1,
    backgroundColor: authColors.divider,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: authColors.muted,
    ...authTypography.footer,
  },
  linkText: {
    color: authColors.primary,
    ...authTypography.link,
  },
});