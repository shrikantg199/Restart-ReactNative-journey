import * as React from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import Colors from "@/constants/Colors";

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [missingFields, setMissingFields] = React.useState<string[]>([]);

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setErrorMessage(null);
    setIsSubmitting(true);

    // Start sign-up process using provided fields
    try {
      const payload: Record<string, any> = {
        emailAddress,
        password,
      };
      if (username) {
        payload.username = username;
      }
      await signUp.create(payload as any);

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true);
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling for more info
      // Build a readable error message
      const anyErr = err as any;
      const message =
        anyErr?.errors?.[0]?.message ||
        anyErr?.message ||
        "Something went wrong.";
      console.error(message);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace("/");
      } else {
        // If the status is not complete, try reloading and surface what is missing
        const nextStepMessage = `Verification requires additional steps (status: ${signUpAttempt.status}).`;
        console.error(nextStepMessage);
        try {
          // Reload the sign-up resource to get the latest requirements
          await signUp.reload();
          // @ts-ignore Clerk runtime shape
          const missing: string[] =
            // @ts-ignore possible presence on resource
            signUp?.requirements?.missingFields ||
            // @ts-ignore legacy/alt shape
            signUp?.missingFields ||
            // @ts-ignore attempt shape
            signUpAttempt?.missingFields ||
            [];

          if ((signUp as any)?.status === "complete") {
            await setActive({ session: (signUp as any)?.createdSessionId });
            router.replace("/");
            return;
          }

          setMissingFields(Array.isArray(missing) ? missing : []);
          const details =
            Array.isArray(missing) && missing.length
              ? ` Missing fields: ${missing.join(", ")}.`
              : "";
          setErrorMessage(nextStepMessage + details);
        } catch (reloadErr) {
          // Fall back to a generic message
          console.error(reloadErr as any);
          setErrorMessage(nextStepMessage);
        }
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling for more info
      const anyErr = err as any;
      const message =
        anyErr?.errors?.[0]?.message ||
        anyErr?.message ||
        "Verification failed.";
      console.error(message);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onCompleteProfilePress = async () => {
    if (!isLoaded) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const updatePayload: Record<string, any> = {};
      if (
        missingFields.includes("first_name") ||
        missingFields.includes("firstName")
      ) {
        updatePayload.firstName = firstName;
      }
      if (
        missingFields.includes("last_name") ||
        missingFields.includes("lastName")
      ) {
        updatePayload.lastName = lastName;
      }
      if (
        missingFields.includes("username") ||
        missingFields.includes("user_name")
      ) {
        updatePayload.username = username;
      }

      if (Object.keys(updatePayload).length > 0) {
        await signUp.update(updatePayload as any);
      }

      await signUp.reload();
      // If requirements are fulfilled, finish sign up
      if ((signUp as any)?.status === "complete") {
        await setActive({ session: (signUp as any)?.createdSessionId });
        router.replace("/");
        return;
      }

      // Otherwise surface what still remains
      // @ts-ignore Clerk runtime shape
      const missing: string[] = signUp?.requirements?.missingFields || [];
      setMissingFields(missing);
      setErrorMessage(
        missing.length
          ? `Please complete the required fields: ${missing.join(", ")}.`
          : "Additional steps are still required."
      );
    } catch (err) {
      const anyErr = err as any;
      const message =
        anyErr?.errors?.[0]?.message ||
        anyErr?.message ||
        "Unable to complete profile.";
      console.error(message);
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (pendingVerification) {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Verify your email</Text>
            <Text style={styles.subtitle}>
              Enter the 6-digit code we sent to your inbox.
            </Text>
            {errorMessage ? (
              <Text style={styles.error}>{errorMessage}</Text>
            ) : null}
            <TextInput
              value={code}
              placeholder="Verification code"
              placeholderTextColor="#9aa0a6"
              onChangeText={(value) => setCode(value)}
              keyboardType="number-pad"
              maxLength={6}
              style={styles.input}
            />
            <TouchableOpacity
              onPress={onVerifyPress}
              style={[styles.button, isSubmitting && styles.buttonDisabled]}
              disabled={isSubmitting}
              accessibilityRole="button"
              accessibilityLabel="Verify code"
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Verify</Text>
              )}
            </TouchableOpacity>

            {missingFields.length > 0 ? (
              <View style={{ gap: 8 }}>
                {missingFields.some(
                  (f) => f === "first_name" || f === "firstName"
                ) ? (
                  <TextInput
                    value={firstName}
                    placeholder="First name"
                    placeholderTextColor="#9aa0a6"
                    onChangeText={setFirstName}
                    style={styles.input}
                    textContentType="givenName"
                  />
                ) : null}
                {missingFields.some(
                  (f) => f === "last_name" || f === "lastName"
                ) ? (
                  <TextInput
                    value={lastName}
                    placeholder="Last name"
                    placeholderTextColor="#9aa0a6"
                    onChangeText={setLastName}
                    style={styles.input}
                    textContentType="familyName"
                  />
                ) : null}
                {missingFields.some(
                  (f) => f === "username" || f === "user_name"
                ) ? (
                  <TextInput
                    value={username}
                    autoCapitalize="none"
                    placeholder="Username"
                    placeholderTextColor="#9aa0a6"
                    onChangeText={setUsername}
                    style={styles.input}
                    textContentType="username"
                    autoCorrect={false}
                  />
                ) : null}
                <TouchableOpacity
                  onPress={onCompleteProfilePress}
                  style={[styles.button, isSubmitting && styles.buttonDisabled]}
                  disabled={isSubmitting}
                  accessibilityRole="button"
                  accessibilityLabel="Complete profile"
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Complete profile</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.flex}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>Create your account</Text>
          <Text style={styles.subtitle}>
            Join us to enjoy a personalized experience.
          </Text>

          {errorMessage ? (
            <Text style={styles.error}>{errorMessage}</Text>
          ) : null}

          <Text style={styles.label}>Email</Text>
          <TextInput
            autoCapitalize="none"
            keyboardType="email-address"
            value={emailAddress}
            placeholder="you@example.com"
            placeholderTextColor="#9aa0a6"
            onChangeText={(email) => setEmailAddress(email)}
            style={styles.input}
            textContentType="emailAddress"
            autoCorrect={false}
          />

          <Text style={styles.label}>Username (optional)</Text>
          <TextInput
            value={username}
            autoCapitalize="none"
            placeholder="Pick a username"
            placeholderTextColor="#9aa0a6"
            onChangeText={setUsername}
            style={styles.input}
            textContentType="username"
            autoCorrect={false}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            placeholder="Enter a strong password"
            placeholderTextColor="#9aa0a6"
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            style={styles.input}
            textContentType="password"
          />

          <TouchableOpacity
            onPress={onSignUpPress}
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            disabled={isSubmitting}
            accessibilityRole="button"
            accessibilityLabel="Continue to verification"
          >
            {isSubmitting ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Continue</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <Link href="/sign-in">
              <Text style={styles.footerLink}>Sign in</Text>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    gap: 12,
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 14,
    color: "#5f6368",
    marginBottom: 12,
  },
  label: {
    marginTop: 8,
    fontSize: 14,
    color: "#5f6368",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e0e3e7",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    color: Colors.light.text,
  },
  button: {
    marginTop: 8,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.tint,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  footerRow: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  footerText: {
    color: "#5f6368",
  },
  footerLink: {
    color: Colors.light.tint,
    fontWeight: "600",
  },
  error: {
    color: "#d93025",
    backgroundColor: "#fdecea",
    borderColor: "#f4c7c3",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
