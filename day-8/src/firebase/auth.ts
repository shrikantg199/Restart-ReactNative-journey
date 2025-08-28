import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import type { User as GoogleUser } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '798347040547-h3kp91nu91ks9842uithqfvu91nll99h.apps.googleusercontent.com',
});

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const logIn = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const googleUser = await GoogleSignin.signIn();
    if (!googleUser || typeof googleUser !== 'object' || !('idToken' in googleUser) || !googleUser.idToken) {
      throw new Error('Google sign-in failed: no idToken');
    }
    const idToken = (googleUser.idToken as string);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const monitorAuthState = (callback: (user: any) => void) => {
  return auth().onAuthStateChanged(callback);
};