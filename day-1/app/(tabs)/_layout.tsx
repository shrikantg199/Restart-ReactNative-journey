import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const TabStructure = () => {
  return (
    <Tabs
      screenOptions={{
        // BASIC COLORS
        tabBarActiveTintColor: "#FF6B6B",
        tabBarInactiveTintColor: "#95A5A6",

        // BASIC NON-FLOATING STYLE WITH ADVANCED OPTIONS
        tabBarStyle: {
          // === APPEARANCE ===
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1, // Top border (0-3)
          borderTopColor: "#E0E0E0", // Border color
          height: 70, // Height (60-90)

          // === SHADOW/ELEVATION ===
          elevation: 8, // Android shadow (1-20)
          shadowColor: "#000", // Shadow color
          shadowOffset: {
            width: 0,
            height: -2, // Negative for upward shadow
          },
          shadowOpacity: 0.1, // Shadow transparency (0.05-0.3)
          shadowRadius: 6, // Shadow blur (2-10)

          // === SPACING ===
          paddingHorizontal: 10, // Side padding inside (5-20)
          paddingBottom: 10, // Bottom padding inside (5-15)
          paddingTop: 5, // Top padding inside (0-10)
        },

        // === LABEL STYLING ===
        tabBarLabelStyle: {
          fontSize: 11, // Text size (9-14)
          fontWeight: "600", // Text weight (400, 500, 600, 700)
          marginBottom: 5, // Space below text (0-10)
          marginTop: 3, // Space above text (0-10)
        },

        // === ICON STYLING ===
        tabBarIconStyle: {
          marginTop: 5, // Space above icon (0-10)
          marginBottom: 2, // Space below icon (0-10)
        },

        // === ADVANCED OPTIONS ===
        tabBarHideOnKeyboard: true, // Hide when keyboard opens
        tabBarShowLabel: true, // Show/hide labels (true/false)
        tabBarAllowFontScaling: false, // Prevent font scaling

        // === HEADER STYLING (Optional) ===
        headerStyle: {
          backgroundColor: "#FFFFFF", // Header background
          elevation: 0, // Remove header shadow
          shadowOpacity: 0, // Remove iOS header shadow
        },
        headerTitleStyle: {
          fontWeight: "700", // Header text weight
          fontSize: 18, // Header text size
        },
        headerTintColor: "#333", // Header text color
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "Home",
          tabBarLabel: "Home",

          // === ADVANCED ICON OPTIONS ===
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={[styles.iconWrapper, focused && styles.focusedIconWrapper]}
            >
              <FontAwesome5
                name={focused ? "home" : "home"} // Different icons for focused/unfocused
                size={focused ? 26 : 24} // Larger when focused
                color={color}
                style={focused && styles.focusedIconStyle}
              />
            </View>
          ),

          // === ACCESSIBILITY ===
          tabBarAccessibilityLabel: "Home Tab",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: "Explore",
          headerTitle: "Explore",

          // === ADVANCED ICON OPTIONS ===
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={[styles.iconWrapper, focused && styles.focusedIconWrapper]}
            >
              <MaterialIcons
                name={focused ? "explore" : "explore"}
                size={focused ? 26 : 24}
                color={color}
                style={focused && styles.focusedIconStyle}
              />
            </View>
          ),

          // === ACCESSIBILITY ===
          tabBarAccessibilityLabel: "Explore Tab",
        }}
      />
    </Tabs>
  );
};

export default TabStructure;

const styles = StyleSheet.create({
  // === ICON WRAPPER STYLES ===
  iconWrapper: {
    borderRadius: 12, // Rounded background
    // backgroundColor: 'transparent',
  },
  focusedIconWrapper: {
    backgroundColor: "rgba(255, 107, 107, 0.1)", // Subtle background when focused
    transform: [{ scale: 1.05 }], // Slightly larger when focused
  },
  focusedIconStyle: {},

  // === BADGE STYLES ===
  badge: {
    backgroundColor: "#FF3B30", // Badge background color
    color: "#FFFFFF", // Badge text color
    fontSize: 10, // Badge text size
    fontWeight: "600", // Badge text weight
    minWidth: 18, // Minimum badge width
    height: 18, // Badge height
    borderRadius: 9, // Rounded badge
    borderWidth: 2, // Border around badge
    borderColor: "#FFFFFF", // Border color
  },

  // === SCREEN CONTAINER (Use in your screens) ===
  screenContainer: {
    flex: 1,
    backgroundColor: "#F8F9FA", // Screen background
  },
});
