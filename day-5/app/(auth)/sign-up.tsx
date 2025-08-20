import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Colors from "../../constants/Colors";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Basic password validation
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Clear any previous errors and set pendingVerification to true
      setErrorMessage("");
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      // Handle pwned password error
      if (err.clerkError && err.errors?.[0]?.code === "form_password_pwned") {
        setErrorMessage(
          "This password has been found in a data breach. Please choose a stronger password."
        );
      } else {
        setErrorMessage(
          "Sign-up failed. Please check your details and try again."
        );
      }
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user to tabs
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/(drawer)/(tabs)");
      } else {
        setErrorMessage("Verification incomplete. Please try again.");
        console.error(
          "Verification incomplete:",
          JSON.stringify(signUpAttempt, null, 2)
        );
      }
    } catch (err: any) {
      // Enhanced error logging for debugging
      console.error("Verification error (raw):", err);
      console.error("Verification error (string):", String(err));
      try {
        console.error(
          "Verification error (JSON):",
          JSON.stringify(err, null, 2)
        );
      } catch (e) {
        console.error("Verification error could not be stringified:", e);
      }
      // Show more detailed error message if available
      if (err && err.clerkError && err.errors && err.errors[0]) {
        setErrorMessage(
          `Verification failed: ${err.errors[0].message} (code: ${err.errors[0].code})`
        );
      } else {
        setErrorMessage(
          "Verification failed. Please check the code and try again."
        );
      }
    }
  };

  if (pendingVerification) {
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
              fontSize: 24,
              fontWeight: "bold",
              color: Colors.light.tint,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            Verify your email
          </Text>
          {errorMessage ? (
            <Text
              style={{
                color: "red",
                marginBottom: 16,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              {errorMessage}
            </Text>
          ) : null}
          <TextInput
            value={code}
            placeholder="Enter your verification code"
            onChangeText={(text) => {
              setCode(text);
              setErrorMessage(""); // Clear error on input change
            }}
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
            onPress={onVerifyPress}
            style={{
              backgroundColor: Colors.light.tint,
              borderRadius: 8,
              paddingVertical: 14,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              Verify
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          Sign up
        </Text>
        {errorMessage ? (
          <Text
            style={{
              color: "red",
              marginBottom: 16,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            {errorMessage}
          </Text>
        ) : null}
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Enter email"
          onChangeText={(text) => {
            setEmailAddress(text);
            setErrorMessage(""); // Clear error on input change
          }}
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
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage(""); // Clear error on input change
          }}
          style={{
            borderWidth: 1,
            borderColor: Colors.light.tabIconDefault,
            borderRadius: 8,
            padding: 12,
            marginBottom: 16,
            fontSize: 16,
          }}
        />
        <Text
          style={{
            color: Colors.light.text,
            marginBottom: 16,
            fontSize: 14,
            textAlign: "center",
          }}
        >
          Use at least 8 characters, including letters, numbers, and symbols.
        </Text>
        <TouchableOpacity
          onPress={onSignUpPress}
          style={{
            backgroundColor: Colors.light.tint,
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Continue
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: Colors.light.text }}>
            Already have an account?{" "}
          </Text>
          <Link href="/sign-in">
            <Text style={{ color: Colors.light.tint, fontWeight: "bold" }}>
              Sign in
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
