import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SignInScreen from "./app/index";
import { AuthProvider } from "./src/context/AuthContext";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import type { RootStackParamList } from "./src/navigation/types";
import ActionDetailsScreen from "./src/screens/ActionDetailsScreen";
import SignUpScreen from "./src/screens/SignUpScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={MainTabNavigator} />
          <Stack.Screen name="ActionDetails" component={ActionDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
    </SafeAreaProvider>
  );
}