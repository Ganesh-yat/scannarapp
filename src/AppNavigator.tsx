import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen"; 

const Stack = createStackNavigator();

export default function AppNavigator({ isLoggedIn }: { isLoggedIn: boolean }) {
    console.log("eneter - apppnaviagation",isLoggedIn);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* {!isLoggedIn ? (
                <Stack.Screen name="Login" component={LoginScreen} />
            ) : (
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
            )} */}
        </Stack.Navigator>
    );
}
