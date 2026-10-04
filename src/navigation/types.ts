export type RootStackParamList = {
  SignIn: undefined;
  Home: { username: string };
  SignUp: undefined;
};

export type MainTabParamList = {
  Home: { username: string };
  Wallet: undefined;
  Transactions: undefined;
  Profile: { username: string };
};
