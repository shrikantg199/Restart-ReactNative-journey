import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tabs, useNavigation } from "expo-router";
import {
  BaggageClaim,
  Bell,
  CircleUserRound,
  House,
  LayoutDashboard,
  SquarePlay,
  User,
} from "lucide-react-native";
import { DrawerActions } from "@react-navigation/native";

const TabsLayout = () => {
  const navigation = useNavigation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 15,
        },

        headerTitleStyle: {
          fontSize: 32,
        },
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 15 }}
            onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
          >
            <CircleUserRound size={35} color={"blue"} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <View style={{ marginRight: 15 }}>
            <Bell size={28} />
          </View>
        ),
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          headerTitle: "Home",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.focusedWrapper}>
              <House color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          tabBarLabel: "Video",
          headerTitle: "Video",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.focusedWrapper}>
              <SquarePlay color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          tabBarLabel: "Categories",
          headerTitle: "Categories",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.focusedWrapper}>
              <LayoutDashboard color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: "Account",
          headerTitle: "Account",

          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.focusedWrapper}>
              <User color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarLabel: "Cart",
          headerTitle: "Cart",
          tabBarIcon: ({ focused, size, color }) => (
            <View style={focused && styles.focusedWrapper}>
              <BaggageClaim color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  focusedWrapper: {
    transform: [{ scale: 1.2 }],
  },
});
