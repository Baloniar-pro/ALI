import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import type { RootStackParamList } from "./src/navigation/types";
import ActionDetailsScreen from "./src/screens/ActionDetailsScreen";
import AccountDetailsScreen from "./src/screens/AccountDetailsScreen";
import ForgotPasswordScreen from "./src/screens/ForgotPasswordScreen";
import SignInScreen from "./src/screens/SignInScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { authenticatedUsername, isReady } = useAuth();

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