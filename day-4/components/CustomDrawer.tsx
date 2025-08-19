import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CustomDrawer = (props: any) => {
  const { state, descriptors, navigation } = props;
  const router = useRouter();

  const handleSettings = () => {
    Alert.alert("Settings", "Settings page will open here");
    // You can navigate to settings page: router.push('/settings');
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          // Add your logout logic here
          Alert.alert("Logged out successfully!");
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContent}
    >
      {/* Header Section with Profile */}
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/images/account.png")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Shrikant</Text>
        <Text style={styles.userEmail}>shrikantg199@gmail.com</Text>
      </View>

      {/* Navigation Items */}
      <View style={styles.drawerItemsContainer}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          return (
            <DrawerItem
              key={route.key}
              label={options.drawerLabel ?? route.name}
              icon={({ size }) =>
                options.drawerIcon?.({
                  size,
                  color: isFocused ? "#6196ffff" : "#B0BEC5",
                })
              }
              focused={isFocused}
              activeTintColor="#e0e0e9ff"
              inactiveTintColor="#B0BEC5"
              activeBackgroundColor="rgba(8, 54, 255, 0.1)"
              labelStyle={styles.drawerLabel}
              style={styles.drawerItem}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
        <TouchableOpacity style={styles.footerButton} onPress={handleSettings}>
          <Ionicons name="settings-outline" size={24} color="#fff" />
          <Text style={styles.footerButtonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
          <Text style={styles.footerButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    backgroundColor: "#1c1e26ff",
  },
  headerContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    backgroundColor: "#2A363B",
    borderRadius: 30,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#112cb6ff",
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  userEmail: {
    fontSize: 14,
    color: "#B0BEC5",
    fontStyle: "italic",
  },
  drawerItemsContainer: {
    paddingVertical: 10,
  },
  drawerItem: {
    marginHorizontal: 10,
    borderRadius: 8,
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  footerContainer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(59, 82, 185, 0.1)",
    marginBottom: 10,
  },
  footerButtonText: {
    color: "#e0e0e9ff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 12,
  },
});
