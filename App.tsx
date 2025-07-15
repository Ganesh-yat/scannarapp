// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// import { NewAppScreen } from '@react-native/new-app-screen';
// import { useState, useEffect } from 'react';
// import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';
// import { GlobalProvider } from './src/context/GlobalContext';
// import LoginScreen from './src/screens/LoginScreen';

// // function App() {
// //   const isDarkMode = useColorScheme() === 'dark';

// //   return (
// //     <View style={styles.container}>
// //       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
// //       <NewAppScreen templateFileName="App.tsx" />
// //     </View>
// //   );
// // }

// function App() {
//   const isDarkMode = useColorScheme() === 'dark';
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 3000);
//     return () => clearTimeout(timer);
//   }, []);

//   if (loading) {
//     // Show loading indicator
//     return (
//       <View style={styles.container}>
//         <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//         {/* Simple loading, you can use ActivityIndicator from 'react-native' for a spinner */}
//         <NewAppScreen templateFileName="App.tsx" />
//         {/* or <ActivityIndicator size="large" color="#0000ff" /> */}
//       </View>
//     );
//   }

//   // After 3 seconds, show LoginScreen
//   return (
//     <GlobalProvider>
//       <View style={styles.container}>
//         <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//         {/* <LoginScreen /> */}
//         {/* <Text>Ganesh</Text> */}
//         <LoginScreen/>
//       </View>
//     </GlobalProvider>

//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default App;


import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import AppNavigator from "./src/AppNavigator";
import { GlobalProvider, useGlobalInfo } from "./src/context/GlobalContext";
import LoginScreen from "./src/screens/LoginScreen";
import Dashboard from "./src/screens/DashboardScreen";

function Root() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(true);
  const { colors, isLoggedIn } = useGlobalInfo();

  const handleLoginScreen = (value) => {
    setActiveTab(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    console.log("isLoggedIn", isLoggedIn);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Loader for 3 seconds
    return (
      <View style={[styles.loader, { backgroundColor: colors.background }]}>
        <StatusBar barStyle={colors.background === "#fff" ? "dark-content" : "light-content"} />
        <ActivityIndicator size="large" color={colors.button} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* <AppNavigator isLoggedIn={isLoggedIn} /> */}
      {/* <Text>Ganesh</Text> */}
      {
        activeTab ? <LoginScreen handleLoginScreen={handleLoginScreen} /> : <Dashboard />
      }

      {/* <Dashboard/> */}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GlobalProvider>
      <Root />
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
