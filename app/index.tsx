import FontAwesome from "@expo/vector-icons/FontAwesome";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
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
      <View style={{ flex: 1, marginTop: 25, backgroundColor: authColors.background }}>
        
        {/* TITLE */}
        <View style={{ alignSelf: "center", paddingTop: 215 }}>
          <Text style={{ ...authTypography.title, color: authColors.primary }}>
            Welcome back!
          </Text>
        </View>

        {/* USERNAME */}
        <View style={{
          alignItems: "center",
          flexDirection: "row",
          height: 54,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: authColors.border,
          borderRadius: 12,
          backgroundColor: authColors.surface,
          marginHorizontal: 24,
          marginTop: 10,
        }}>
          <FontAwesome name="user-o" size={18} color={authColors.icon} style={{ marginRight: 12 }} />
          <TextInput
            placeholder="Enter Username"
            placeholderTextColor={authColors.placeholder}
            value={username}
            onChangeText={setUsername}
            style={{ flex: 1, ...authTypography.input, color: authColors.primary }}
          />
        </View>

        {/* PASSWORD */}
        <View style={{
          alignItems: "center",
          flexDirection: "row",
          height: 54,
          paddingHorizontal: 16,
          borderWidth: 1,
          borderColor: authColors.border,
          borderRadius: 12,
          backgroundColor: authColors.surface,
          marginHorizontal: 24,
          marginTop: 10,
        }}>
          <FontAwesome name="lock" size={20} color={authColors.icon} style={{ marginRight: 12 }} />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor={authColors.placeholder}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={{ flex: 1, ...authTypography.input, color: authColors.primary }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? "eye" : "eye-slash"}
              size={18}
              color={showPassword ? authColors.primary : authColors.placeholder}
            />
          </TouchableOpacity>
        </View>

        {/* FORGOT PASSWORD */}
        <TouchableOpacity
          onPress={handleForgotPassword}
        >
          <Text style={{
            alignSelf: "flex-end",
            marginTop: 7,
            color: authColors.primary,
            marginRight: 24,
            ...authTypography.link,
          }}>
            {isResettingPassword ? "Cancel Password Reset" : "Forgot Password?"}
          </Text>
        </TouchableOpacity>

        {/* SIGN IN BUTTON */}
        <TouchableOpacity onPress={handleSignIn}>
          <View style={{
            height: 54,
            marginHorizontal: 24,
            backgroundColor: authColors.primary,
            borderRadius: 12,
            marginTop: 10,
            justifyContent: "center",
          }}>
            <Text style={{
              color: "white",
              alignSelf: "center",
              ...authTypography.button,
            }}>
              {isResettingPassword
                ? "RESET PASSWORD"
                : "SIGN IN"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* DIVIDER */}
        <View style={{
          flexDirection: "row",
          marginTop: 20,
          alignItems: "center",
          alignSelf: "center",
        }}>
          <View style={{ height: 1, backgroundColor: authColors.divider, flex: 1 }} />
          <Text style={{ marginHorizontal: 10, color: authColors.muted }}>or</Text>
          <View style={{ height: 1, backgroundColor: authColors.divider, flex: 1 }} />
        </View>

        {/* SOCIAL LOGIN */}
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 12,
          marginTop: 10,
        }}>
          <Image
            source={require("../assets/images/google.png")}
            style={{ height: 40, width: 40 }}
          />
          <View style={{ height: 40, width: 1, backgroundColor: authColors.divider }} />
          <FontAwesome name="apple" size={42} color={authColors.primary} />
        </View>

        {/* SIGN UP OPTION */}
        <View style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}>
          <Text style={{ color: authColors.muted, ...authTypography.footer }}>
            {isResettingPassword ? "Remembered your password? " : "Don't have an account? "}
          </Text>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={() =>
              isResettingPassword
                ? setIsResettingPassword(false)
                : navigation.navigate("SignUp")}
          >
            <Text style={{ color: authColors.primary, ...authTypography.link }}>
              {isResettingPassword ? "Sign In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </TouchableWithoutFeedback>
  );
}