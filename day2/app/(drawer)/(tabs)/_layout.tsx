import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Tabs, useNavigation } from "expo-router";
import { AntDesign, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
const TabStructure = () => {
  const navigation = useNavigation();
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",

        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: {
          fontSize: 14,
        },

        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          headerTitleStyle: {},
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer)}
            >
              <Image
                style={styles.image}
                source={require("../../../assets/images/account.png")}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View>
              <Entypo name="dots-three-vertical" size={28} />
            </View>
          ),
          tabBarIcon: ({ color, focused, size }) => (
            <View style={[focused && styles.focusedWrapper]}>
              <AntDesign name="home" color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",

          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={[styles.iconsWraperr, focused && styles.focusedWrapper]}
            >
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabStructure;

const styles = StyleSheet.create({
  iconsWraperr: {},
  focusedWrapper: {
    transform: [{ scale: 1.1 }],
  },
  image: {
    width: 40,
    marginHorizontal: 12,
    height: 40,
  },
});
