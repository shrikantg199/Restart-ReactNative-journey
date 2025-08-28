import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { signUp } from "../../src/firebase/auth";
import { useRouter } from "expo-router";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      router.replace("/");
    } catch (error) {
      const err = error as Error;
      alert(err.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button
        title="Go to Login"
        onPress={() => router.push("/(auth)/login")}
      />
    </View>
  );
};

export default SignUp;
