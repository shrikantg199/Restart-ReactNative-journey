import "react-native-gesture-handler";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useFonts } from "expo-font";
import { Redirect, Stack, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};
const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
if (!CLERK_PUBLISHABLE_KEY) {
  // eslint-disable-next-line no-console
  console.warn(
    "Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY. Set it in .env or eas.json env."
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY || ""}
        tokenCache={tokenCache}
      >
        <RootLayoutNav />
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const { isSignedIn, isLoaded } = useAuth();
  const segments = useSegments();

  // Show loading state until auth is resolved
  if (!isLoaded) {
    return null;
  }

  // Determine if current route is an auth route
  const isAuthRoute =
    segments[0] === "(auth)" ||
    segments[0] === "sign-in" ||
    segments[0] === "sign-up";

  // Redirect to sign-in if not authenticated and not already on an auth route
  if (!isSignedIn && !isAuthRoute) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
    </Stack>
  );
}
