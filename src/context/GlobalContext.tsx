import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

type ThemeType = keyof typeof Colors;

type GlobalContextType = {
    // Auth/user state
    isLoggedIn: boolean;
    userId: string | null;
    userType: string | null;
    // Theme
    theme: ThemeType;
    colors: typeof Colors["light"];
    // State setters
    changeIsLoggedIn: (v: boolean) => void;
    changeUserId: (id: string | null) => void;
    changeUserType: (type: string | null) => void;
    changeTheme: (theme: ThemeType) => void;
};

const defaultContext: GlobalContextType = {
    isLoggedIn: false,
    userId: null,
    userType: null,
    theme: "light",
    colors: Colors.light,
    changeIsLoggedIn: () => { },
    changeUserId: () => { },
    changeUserType: () => { },
    changeTheme: () => { },
};

const GlobalContext = createContext<GlobalContextType>(defaultContext);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
    // Use system theme
    const systemTheme = useColorScheme() as ThemeType || "light";
    const [theme, setTheme] = useState<ThemeType>(systemTheme);

    // (Optional: Keep in sync with device theme changes)
    useEffect(() => {
        setTheme(systemTheme);
    }, [systemTheme]);

    // Auth state
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [userType, setUserType] = useState<string | null>(null);

    // Setters
    const changeIsLoggedIn = (v: boolean) => setIsLoggedIn(v);
    const changeUserId = (id: string | null) => setUserId(id);
    const changeUserType = (type: string | null) => setUserType(type);
    const changeTheme = (newTheme: ThemeType) => setTheme(newTheme);

    // Always provide colors for current theme
    const colors = Colors[theme];

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                userId,
                userType,
                theme,
                colors,
                changeIsLoggedIn,
                changeUserId,
                changeUserType,
                changeTheme,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalInfo = () => useContext(GlobalContext);
