export type QuickAction = "send" | "receive" | "topup";

export type RootStackParamList = {
  SignIn: undefined;
  Home: { username: string };
  SignUp: undefined;
  ForgotPassword: undefined;
  ActionDetails: { action: QuickAction; username: string };
  AccountDetails: { username: string };
};

export type MainTabParamList = {
  Home: { username: string };
  Wallet: undefined;
  Transactions: undefined;
  Profile: { username: string };
};
