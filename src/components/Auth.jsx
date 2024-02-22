import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Paper, TextInput, PasswordInput, Button, Title, Text } from "@mantine/core";
import { useMantineTheme } from "@mantine/core";
import classes from "./Auth.module.css";
import { auth, googleProvider, db } from "../config/firebase";
import {collection, addDoc} from "firebase/firestore";

export default function Auth() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user.uid);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const signup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const usersCollectionRef  = collection(db, "users");

      const user = userCredential.user;
      const additionalData = {
        displayName: user.displayName,
        email: user.email,
        cart:[],
        wishlist:[],
      };

      try {
        await addDoc(usersCollectionRef, additionalData);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
      navigate("/auth");
    }
  };

  console.log(auth?.currentUser?.email);

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Login
        </Title>
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={signin}
          style={{ backgroundColor: "#7CB9E8" }}
        >
          Login
        </Button>
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={signup}
          style={{ backgroundColor: "#7FFFD4" }}
        >
          Sign up
        </Button>
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={signInWithGoogle}
          style={{ backgroundColor: "#002D62" }}
        >
          Login with Google
        </Button>
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={logout}
          style={{ backgroundColor: "#D9381E" }}
        >
          Logout
        </Button>
      </Paper>
    </div>
  );
}
