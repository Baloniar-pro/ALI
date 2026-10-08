import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./src/features/auth/context/AuthContext";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import type { RootStackParamList } from "./src/navigation/types";
import ActionDetailsScreen from "./src/features/actions/screens/ActionDetailsScreen";
import AccountDetailsScreen from "./src/features/account/screens/AccountDetailsScreen";
import ForgotPasswordScreen from "./src/features/auth/screens/ForgotPasswordScreen";
import SignInScreen from "./src/features/auth/screens/SignInScreen";
import SignUpScreen from "./src/features/auth/screens/SignUpScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

if (Platform.OS !== "web") {
  SplashScreen.preventAutoHideAsync();
}

function AppNavigator() {
  const { authenticatedUsername, isReady } = useAuth();

  useEffect(() => {
    if (isReady && Platform.OS !== "web") {
      SplashScreen.hide();
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
          </>
        ) : (
          <>
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
        <AppNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
}