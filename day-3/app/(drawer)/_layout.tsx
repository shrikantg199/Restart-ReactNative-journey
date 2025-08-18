import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";
const DrawerLayout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: "#1E88E5",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 20,
        },
        drawerStyle: {
          backgroundColor: "#263238",
          width: 280,
        },
        drawerActiveTintColor: "#1E88E5",
        drawerInactiveTintColor: "#B0BEC5",
        drawerActiveBackgroundColor: "rgba(30, 136, 229, 0.1)",
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "600",
          marginLeft: -20,
        },
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: "Home" }} />
      <Drawer.Screen name="dashboard" options={{ drawerLabel: "Dashboard" }} />
    </Drawer>
  );
};

export default DrawerLayout;

const styles = StyleSheet.create({});
