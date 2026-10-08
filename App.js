import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ActionDetailsScreen from "./src/features/actions/screens/ActionDetailsScreen";
import AccountDetailsScreen from "./src/features/account/screens/AccountDetailsScreen";
import { AuthProvider, useAuth } from "./src/features/auth/context/AuthContext";
import ForgotPasswordScreen from "./src/features/auth/screens/ForgotPasswordScreen";
import SignInScreen from "./src/features/auth/screens/SignInScreen";
import SignUpScreen from "./src/features/auth/screens/SignUpScreen";
import SplashScreen from "./src/features/auth/screens/SplashScreen";
import HelpScreen from "./src/features/dashboard/screens/HelpScreen";
import NotificationsScreen from "./src/features/dashboard/screens/NotificationsScreen";
import { WalletProvider } from "./src/features/wallet/context/WalletContext";
import MainTabNavigator from "./src/navigation/MainTabNavigator";

const Stack = createNativeStackNavigator();

if (Platform.OS !== "web") {
  ExpoSplashScreen.preventAutoHideAsync();
}

function AppNavigator() {
  const { authenticatedUsername, isReady } = useAuth();

  useEffect(() => {
    if (isReady && Platform.OS !== "web") {
      ExpoSplashScreen.hide();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        key={authenticatedUsername ? "authenticated" : "unauthenticated"}
        screenOptions={{ headerShown: false }}
      >
        {authenticatedUsername ? (
          <>
            <Stack.Screen
              name="Home"
              component={MainTabNavigator}
              initialParams={{ username: authenticatedUsername }}
            />
            <Stack.Screen name="ActionDetails" component={ActionDetailsScreen} />
            <Stack.Screen name="AccountDetails" component={AccountDetailsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <WalletProvider>
          <AppNavigator />
        </WalletProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
