import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

// SIGN UP
export async function signUp(email: string, password: string) {
  const userCredential =
    await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// LOGIN
export async function login(email: string, password: string) {
  const userCredential =
    await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// LOGOUT
export async function logout() {
  await signOut(auth);
}
