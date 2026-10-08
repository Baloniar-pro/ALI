import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";
const ACCOUNT_STORAGE_KEY = "baloniar.account.v1";
const REMEMBERED_SESSION_KEY = "baloniar.remembered-session.v1";
const PROFILE_STORAGE_KEY = "baloniar.profile.v1";
const AuthContext = createContext(null);
function getDefaultProfile(username) {
    return { fullName: username, email: "", phone: "", address: "" };
}
function isProfile(value) {
    return (typeof value === "object" &&
        value !== null &&
        typeof value.fullName === "string" &&
        typeof value.email === "string" &&
        typeof value.phone === "string" &&
        typeof value.address === "string");
}
export function AuthProvider({ children }) {
    const [account, setAccount] = useState(null);
    const [profile, setProfile] = useState(null);
    const [profileError, setProfileError] = useState(null);
    const [authenticatedUsername, setAuthenticatedUsername] = useState(null);
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
                const parsedAccount = JSON.parse(savedAccount);
                if (typeof parsedAccount === "object" &&
                    parsedAccount !== null &&
                    "username" in parsedAccount &&
                    "password" in parsedAccount &&
                    typeof parsedAccount.username === "string" &&
                    typeof parsedAccount.password === "string" &&
                    isMounted) {
                    setAccount({
                        username: parsedAccount.username,
                        password: parsedAccount.password,
                    });
                    setProfile(getDefaultProfile(parsedAccount.username));
                    try {
                        const savedProfile = await SecureStore.getItemAsync(PROFILE_STORAGE_KEY);
                        if (savedProfile && isMounted) {
                            const parsedProfile = JSON.parse(savedProfile);
                            if (!isProfile(parsedProfile)) {
                                throw new Error("Saved profile is not in the expected format.");
                            }
                            setProfile(parsedProfile);
                        }
                    }
                    catch (error) {
                        if (isMounted) {
                            setProfileError(error instanceof Error
                                ? `Profile details could not be loaded: ${error.message}`
                                : "Profile details could not be loaded.");
                        }
                    }
                    const rememberedUsername = await SecureStore.getItemAsync(REMEMBERED_SESSION_KEY);
                    if (rememberedUsername === parsedAccount.username && isMounted) {
                        setAuthenticatedUsername(rememberedUsername);
                    }
                }
            }
            catch {
                if (isMounted) {
                    setAccount(null);
                }
            }
            finally {
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
    const saveAccount = async (newAccount) => {
        if (!isReady) {
            throw new Error("Saved account is still loading.");
        }
        if (account) {
            return "already-exists";
        }
        if (!(await SecureStore.isAvailableAsync())) {
            throw new Error("Secure account storage is unavailable on this platform.");
        }
        await SecureStore.setItemAsync(ACCOUNT_STORAGE_KEY, JSON.stringify(newAccount));
        setAccount(newAccount);
        setProfile(getDefaultProfile(newAccount.username));
        return "created";
    };
    const updateProfile = async (updatedProfile) => {
        if (!account) {
            throw new Error("No account is available to update.");
        }
        if (!isProfile(updatedProfile)) {
            throw new Error("Profile details are not in the expected format.");
        }
        if (!(await SecureStore.isAvailableAsync())) {
            throw new Error("Secure profile storage is unavailable on this platform.");
        }
        await SecureStore.setItemAsync(PROFILE_STORAGE_KEY, JSON.stringify(updatedProfile));
        setProfile(updatedProfile);
        setProfileError(null);
    };
    const resetPassword = async (username, password) => {
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
    const signIn = async (username, rememberMe) => {
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
        }
        else {
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
    return (<AuthContext.Provider value={{
            accountUsername: account?.username ?? null,
            profile: profile ?? (account ? getDefaultProfile(account.username) : null),
            profileError,
            authenticatedUsername,
            isReady,
            createAccount: saveAccount,
            updateProfile,
            verifyCredentials: (username, password) => account?.username === username && account.password === password,
            signIn,
            signOut,
            resetPassword,
        }}>
      {children}
    </AuthContext.Provider>);
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
