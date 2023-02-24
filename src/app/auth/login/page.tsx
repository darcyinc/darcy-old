"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import emailRegex from "@/utils/emailRegex";
import styles from "../page.module.scss";

const ValidUserCheck = dynamic(
  async () => import("@/components/ValidUserCheck"),
  {
    ssr: false,
  }
);

const EMAIL_REGEX = emailRegex();

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const cleanupErrors = useCallback(() => {
    setEmailError("");
    setPasswordError("");
  }, []);

  const handleEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setEmail(value);
      cleanupErrors();

      if (!value.includes("@") || !EMAIL_REGEX.test(value))
        setEmailError("O campo email deve ser um email válido.");
      if (value.length === 0) setEmailError("O campo email é obrigatório.");
    },
    [cleanupErrors]
  );

  const handlePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPassword(value);
      cleanupErrors();

      if (value.length < 8)
        setPasswordError("A senha deve ter no mínimo 8 caracteres.");
      if (value.length === 0) setPasswordError("O campo senha é obrigatório.");
    },
    [cleanupErrors]
  );

  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (passwordError || emailError) return;

      try {
        const doUserLogin = (await import("@/api/doUserLogin")).default;
        const res = await doUserLogin({ email, password });

        if (res.errors?.[0]) {
          setEmailError(res.errors[0].message);
          setPasswordError(res.errors[0].message);
          return;
        }

        localStorage.setItem("token", res.token);
        window.dispatchEvent(new Event("storage"));
        router.push("/");
      } catch {
        setEmailError("Ocorreu um erro ao tentar se autenticar.");
        setPasswordError("Ocorreu um erro ao tentar se autenticar.");
      }
    },
    [passwordError, emailError, email, password, router]
  );

  return (
    <div className={styles.container}>
      <ValidUserCheck redirectToIfLogged="/" />

      <div className={styles.card}>
        <h1>Login</h1>
        <p className={styles.authDescription}>
          Por favor, insira suas credenciais.
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.email}>
            <div className={styles.label}>
              <label htmlFor="email">Email</label>
              {emailError && (
                <label className={styles.error} htmlFor="email">
                  {emailError}
                </label>
              )}
            </div>

            <input
              id="email"
              name="email"
              onChange={handleEmail}
              placeholder="me@example.com"
              type="email"
              value={email}
            />
          </div>

          <div className={styles.password}>
            <div className={styles.label}>
              <label htmlFor="password">Senha</label>
              {passwordError && (
                <label className={styles.error} htmlFor="password">
                  {passwordError}
                </label>
              )}
            </div>

            <input
              id="password"
              name="password"
              onChange={handlePassword}
              placeholder="********"
              type="password"
              value={password}
            />
          </div>

          <div className={styles.actions}>
            <button
              className={styles.login}
              disabled={
                emailError.length > 0 ||
                passwordError.length > 0 ||
                email.length === 0 ||
                password.length === 0 ||
                password.length < 8 ||
                !email.includes("@")
              }
              type="submit"
            >
              Autenticar-se
            </button>

            <span>
              Não tem uma conta? <Link href="/auth/signup">Registre-se</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
