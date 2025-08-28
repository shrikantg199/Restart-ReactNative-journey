import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { logIn } from "../../src/firebase/auth";
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await logIn(email, password);
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
      <Button title="Log In" onPress={handleLogin} />
      <Button
        title="Go to Sign Up"
        onPress={() => router.push("/(auth)/signup")}
      />
    </View>
  );
}
