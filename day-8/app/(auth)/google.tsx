import React from "react";
import { View, Button, Text } from "react-native";
import { googleSignIn } from "../../src/firebase/auth";
import { useRouter } from "expo-router";

const Google = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.replace("/");
    } catch (error) {
      const err = error as Error;
      alert(err.message);
    }
  };

  return (
    <View>
      <Button title="Sign In with Google" onPress={handleGoogleSignIn} />
      <Button
        title="Go to Login"
        onPress={() => router.push("/(auth)/login")}
      />
    </View>
  );
};

export default Google;
