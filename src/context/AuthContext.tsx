import * as SecureStore from "expo-secure-store";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Account = {
  username: string;
  password: string;
};

type AuthContextValue = {
  accountUsername: string | null;
  authenticatedUsername: string | null;
  isReady: boolean;
  createAccount: (account: Account) => Promise<"created" | "already-exists">;
  verifyCredentials: (username: string, password: string) => boolean;
  signIn: (username: string, rememberMe: boolean) => Promise<boolean>;
  signOut: () => Promise<void>;
  resetPassword: (username: string, password: string) => Promise<boolean>;
};

const ACCOUNT_STORAGE_KEY = "baloniar.account.v1";
const REMEMBERED_SESSION_KEY = "baloniar.remembered-session.v1";
const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [authenticatedUsername, setAuthenticatedUsername] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const restoreAccount = async () => {
      try {
        if (!(await SecureStore.isAvailableAsync())) {
          return;
        }

        const savedAccount = await SecureStore.getItemAsync(ACCOUNT_STORAGE_KEY);
        if (!savedAccount) {
          return;
        }

        const parsedAccount: unknown = JSON.parse(savedAccount);
        if (
          typeof parsedAccount === "object" &&
          parsedAccount !== null &&
          "username" in parsedAccount &&
          "password" in parsedAccount &&
          typeof parsedAccount.username === "string" &&
          typeof parsedAccount.password === "string" &&
          isMounted
        ) {
          setAccount({
            username: parsedAccount.username,
            password: parsedAccount.password,
          });

          const rememberedUsername = await SecureStore.getItemAsync(
            REMEMBERED_SESSION_KEY,
          );
          if (rememberedUsername === parsedAccount.username && isMounted) {
            setAuthenticatedUsername(rememberedUsername);
          }
        }
      } catch {
        if (isMounted) {
          setAccount(null);
        }
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    };

    void restoreAccount();

    return () => {
      isMounted = false;
    };
  }, []);

  const saveAccount = async (newAccount: Account) => {
    if (!isReady) {
      throw new Error("Saved account is still loading.");
    }

    if (account) {
      return "already-exists" as const;
    }

    if (!(await SecureStore.isAvailableAsync())) {
      throw new Error("Secure account storage is unavailable on this platform.");
    }

    await SecureStore.setItemAsync(ACCOUNT_STORAGE_KEY, JSON.stringify(newAccount));
    setAccount(newAccount);
    return "created" as const;
  };

  const resetPassword = async (username: string, password: string) => {
    if (!account || account.username !== username) {
      return false;
    }

    if (!(await SecureStore.isAvailableAsync())) {
      throw new Error("Secure account storage is unavailable on this platform.");
    }

    const updatedAccount = { username, password };
    await SecureStore.setItemAsync(ACCOUNT_STORAGE_KEY, JSON.stringify(updatedAccount));
    setAccount(updatedAccount);
    return true;
  };

  const signIn = async (username: string, rememberMe: boolean) => {
    if (!isReady) {
      throw new Error("Saved account is still loading.");
    }

    if (!account || account.username !== username) {
      return false;
    }

    if (!(await SecureStore.isAvailableAsync())) {
      throw new Error("Secure session storage is unavailable on this platform.");
    }

    if (rememberMe) {
      await SecureStore.setItemAsync(REMEMBERED_SESSION_KEY, username);
    } else {
      await SecureStore.deleteItemAsync(REMEMBERED_SESSION_KEY);
    }

    setAuthenticatedUsername(username);
    return true;
  };

  const signOut = async () => {
    if (!(await SecureStore.isAvailableAsync())) {
      throw new Error("Secure session storage is unavailable on this platform.");
    }

    await SecureStore.deleteItemAsync(REMEMBERED_SESSION_KEY);
    setAuthenticatedUsername(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accountUsername: account?.username ?? null,
        authenticatedUsername,
        isReady,
        createAccount: saveAccount,
        verifyCredentials: (username, password) =>
          account?.username === username && account.password === password,
        signIn,
        signOut,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}