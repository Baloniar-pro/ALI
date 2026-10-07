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
import { useAuth } from "../src/context/AuthContext";
import type { RootStackParamList } from "../src/navigation/types";
import { authColors, authTypography } from "../src/theme/authTheme";

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, "SignIn">;

export default function SignInScreen({ navigation }: SignInScreenProps) {
  const { accountUsername, isReady, resetPassword, verifyCredentials } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);


  const handleSignIn = async () => {
    if (!isReady) {
      Alert.alert("Please wait", "Your saved account is still loading.");
      return;
    }

    if (username.trim() === "" || password.trim() === "") {
      Alert.alert("Error", "Please enter username and password");
      return;
    }

    if (isResettingPassword) {
      try {
        const wasReset = await resetPassword(username.trim(), password);
        if (!wasReset) {
          Alert.alert("Reset failed", "No account was found for this username.");
          return;
        }

        setIsResettingPassword(false);
        setPassword("");
        Alert.alert("Success", "Your password has been reset. You can now sign in.");
      } catch {
        Alert.alert("Storage error", "Your password could not be securely saved.");
      }
      return;
    }

    if (!verifyCredentials(username.trim(), password)) {
      Alert.alert("No Records Founds", "Please sign up.");
      return;
    }

    navigation.navigate("Home", { username: username.trim() });

  };

  const handleForgotPassword = () => {
    if (isResettingPassword) {
      setIsResettingPassword(false);
      setPassword("");
      return;
    }

    if (!accountUsername) {
      Alert.alert("Reset Password", "Please sign up before resetting your password.");
      return;
    }

    setIsResettingPassword(true);
    setPassword("");
    Alert.alert("Reset Password", "Enter your username and your new password.");
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

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>
            {isResettingPassword ? "Cancel Password Reset" : "Forgot Password?"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
          <Text style={styles.signInButtonText}>
            {isResettingPassword ? "RESET PASSWORD" : "SIGN IN"}
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialLogin}>
          <Image source={require("../assets/images/google.png")} style={styles.socialIcon} />
          <View style={styles.socialDivider} />
          <FontAwesome name="apple" size={42} color={authColors.primary} />
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.footerText}>
            {isResettingPassword ? "Remembered your password? " : "Don't have an account? "}
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() =>
              isResettingPassword
                ? setIsResettingPassword(false)
                : navigation.navigate("SignUp")
            }
          >
            <Text style={styles.linkText}>{isResettingPassword ? "Sign In" : "Sign Up"}</Text>
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
  forgotPassword: {
    alignSelf: "flex-end",
    marginTop: 7,
    marginRight: 24,
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