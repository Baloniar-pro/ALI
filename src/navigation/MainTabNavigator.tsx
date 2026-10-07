import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import HomeScreen from "../features/dashboard/screens/HomeScreen";
import ProfileScreen from "../features/account/screens/ProfileScreen";
import TransactionsScreen from "../features/transactions/screens/TransactionsScreen";
import WalletScreen from "../features/wallet/screens/WalletScreen";
import type { MainTabParamList, RootStackParamList } from "./types";

type MainTabNavigatorProps = NativeStackScreenProps<RootStackParamList, "Home">;

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator({ route }: MainTabNavigatorProps) {
  const username = route.params.username;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#183b34",
        tabBarInactiveTintColor: "#89948f",
        tabBarStyle: {
          height: 62,
          paddingTop: 6,
          paddingBottom: 7,
          borderTopColor: "#e7ece9",
          backgroundColor: "#ffffff",
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ username }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="receipt-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ username }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}