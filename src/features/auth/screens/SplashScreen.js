import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace("SignIn");
    }, 1800);

    return () => clearTimeout(timeoutId);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.logo}>
          <Ionicons name="wallet-outline" size={42} color="#ffffff" />
        </View>
        <Text style={styles.appName}>MyWallet</Text>
        <Text style={styles.tagline}>Simple • Fast • Secure</Text>
      </View>
      <Text style={styles.footer}>Your money, made simple.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  content: { alignItems: "center" },
  logo: {
    width: 92,
    height: 92,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#547367",
    borderRadius: 30,
    backgroundColor: "#254b3f",
  },
  appName: {
    marginTop: 22,
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  tagline: { marginTop: 9, color: "#d5e4dd", fontSize: 13, letterSpacing: 0.7 },
  footer: {
    position: "absolute",
    bottom: 30,
    color: "#abc2b6",
    fontSize: 11,
  },
});
