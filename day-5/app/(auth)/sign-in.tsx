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

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
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
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
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
