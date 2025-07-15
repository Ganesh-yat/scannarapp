// import { useGlobalInfo } from "@/context/GlobalContext";
// import { useRouter } from "expo-router";
// import React from "react";
// import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Colors } from "../constants/Colors";

// const TopNavBar: React.FC = () => {
//     const router = useRouter();
//     const { theme, setTheme } = useGlobalInfo();

//     return (
//         <SafeAreaView style={{ backgroundColor: Colors[theme].background }}>
//             <View style={[styles.container, { borderBottomColor: Colors[theme].secondaryText }]}>
//                 <TouchableOpacity onPress={() => router.push("/dashboard")}>
//                     <Text style={[styles.title, { color: Colors[theme].text }]}>
//                         Buddy For Events
//                     </Text>
//                 </TouchableOpacity>
//                 <View style={styles.actions}>
//                     <TouchableOpacity onPress={() => setTheme(theme === "light" ? "dark" : "light")}>
//                         <Text>{theme === "light" ? "🌙" : "☀️"}</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => { }}>
//                         <Text style={[styles.actionIcon, { color: Colors[theme].text }]}>🔔</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => router.push("/profile")}>
//                         <Text style={[styles.actionIcon, { color: Colors[theme].text }]}>👤</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         height: 70,
//         flexDirection: "row",
//         alignItems: "center",
//         paddingHorizontal: 16,
//         justifyContent: "space-between",
//         borderBottomWidth: 1,
//     },
//     title: {
//         textAlign: "center",
//         fontSize: 18,
//         fontWeight: "600",
//     },
//     actions: {
//         flexDirection: "row",
//         gap: 6,
//         alignItems: "center",
//     },
//     actionIcon: {
//         fontSize: 22,
//         marginLeft: 16,
//     },
// });

// export default TopNavBar;

import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useGlobalInfo } from "../../context/GlobalContext"; 

const TopNavBar: React.FC = () => {
    const navigation = useNavigation();
    const { theme, colors, changeTheme } = useGlobalInfo();

    return (
        <SafeAreaView style={{ backgroundColor: colors.background }}>
            <View style={[styles.container, { borderBottomColor: colors.secondaryText }]}>
                <TouchableOpacity onPress={() => navigation.navigate("Dashboard" as never)}>
                    <Text style={[styles.title, { color: colors.text }]}>
                        Buddy For Events
                    </Text>
                </TouchableOpacity>
                <View style={styles.actions}>
                    <TouchableOpacity onPress={() => changeTheme(theme === "light" ? "dark" : "light")}>
                        <Text>{theme === "light" ? "🌙" : "☀️"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { /* notification logic here */ }}>
                        <Text style={[styles.actionIcon, { color: colors.text }]}>🔔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Profile" as never)}>
                        <Text style={[styles.actionIcon, { color: colors.text }]}>👤</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 70,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        justifyContent: "space-between",
        borderBottomWidth: 1,
    },
    title: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
    },
    actions: {
        flexDirection: "row",
        gap: 6,
        alignItems: "center",
    },
    actionIcon: {
        fontSize: 22,
        marginLeft: 16,
    },
});

export default TopNavBar;
