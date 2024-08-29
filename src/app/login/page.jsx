"use client";

import Image from "next/image";
import styles from "../../scss/pages/login.module.scss";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { checkuser } from "../../server/checkuser";

export default function Home() {
  const [state, backendcheck] = useFormState(checkuser, {
    message: "",
  });
  const [username, changeuser] = useState("");
  const [password, changepassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (state && state.success) {
      router.push("/dashboard");
    }
    changeuser("");
    changepassword("");
  }, [state.message, router]);

  return (
    <main className={styles.main}>
      <form action={backendcheck}>
        <Image
          src="/images/womenwork.png"
          height="180"
          width="250"
          loading="lazy"
          alt="women is working"
        />
        <h1>Log in</h1>
        <label htmlFor="username">Nutzername</label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Hey, mein Name ist ..."
          value={username}
          onChange={(e) => changeuser(e.target.value.trim())}
        />
        <label htmlFor="password">Passwort</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Sehr geheim ..."
          value={password}
          onChange={(e) => changepassword(e.target.value.trim())}
        />
        <p className="error">{state.message}</p>
        <input type="submit" value="Login" disabled={!username || !password} />
      </form>
    </main>
  );
}
