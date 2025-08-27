import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      setIsLoading(true);
      setErrorMessage("");
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status isn't complete, surface a readable message
        const nextStepMessage = `Sign-in requires additional steps (status: ${signInAttempt.status}).`;
        console.error(nextStepMessage);
        setErrorMessage(nextStepMessage);
      }
    } catch (err) {
      // Build a readable error message (Clerk error or generic)
      const message = (err as any)?.errors
        ? (err as any).errors
            .map((e: any) => e?.message)
            .filter(Boolean)
            .join("\n")
        : (err as any)?.message || "Unable to sign in. Please try again.";
      console.error(message);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
        padding: 24,
      }}
    >
      <View
        style={{
          width: "100%",
          maxWidth: 400,
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 24,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: Colors.light.tint,
            marginBottom: 24,
            textAlign: "center",
          }}
        >
          Sign in
        </Text>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={setEmailAddress}
          style={{
            borderWidth: 1,
            borderColor: Colors.light.tabIconDefault,
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 16,
          }}
        />
        <TextInput
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            borderColor: Colors.light.tabIconDefault,
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
            fontSize: 16,
          }}
        />
        <TouchableOpacity
          onPress={onSignInPress}
          style={{
            backgroundColor: Colors.light.tint,
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            {isLoading ? "Signing in..." : "Continue"}
          </Text>
        </TouchableOpacity>
        {errorMessage ? (
          <Text style={{ color: "red", textAlign: "center", marginBottom: 8 }}>
            {errorMessage}
          </Text>
        ) : null}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: Colors.light.text }}>
            Don't have an account?{" "}
          </Text>
          <Link href="/sign-up">
            <Text style={{ color: Colors.light.tint, fontWeight: "bold" }}>
              Sign up
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
