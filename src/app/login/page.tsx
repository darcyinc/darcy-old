"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styles from "./page.module.scss";
import { AccountContext } from "@/hooks/AccountProvider";
import getUserFromToken from "@/utils/getUserFromToken";

const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Home() {
  if (typeof window === "undefined") return <></>;

  const router = useRouter();
  const account = useContext(AccountContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setEmailError("");

    if (!value.includes("@") || !EMAIL_REGEX.test(value))
      setEmailError("O campo email deve ser um email válido.");
    if (value.length === 0) setEmailError("O campo email é obrigatório.");
  }, []);

  const handlePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordError("");

    if (value.length < 8)
      setPasswordError("A senha deve ter no mínimo 8 caracteres.");
    if (value.length === 0) setPasswordError("O campo senha é obrigatório.");
  }, []);

  const handleLogin = useCallback(() => {
    if (passwordError || emailError) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((d) => {
        if (d.errors?.[0]) {
          setEmailError(d.errors[0].message);
          setPasswordError(d.errors[0].message);
          return;
        }

        localStorage.setItem("token", d.token);
        router.push("/");
      });
  }, [passwordError, emailError, email, password, router]);

  const token = localStorage.getItem("token") ?? account.data.token;
  useEffect(() => {
    if (!token) return;

    getUserFromToken(token, (err, user) => {
      if (err || !user) {
        localStorage.removeItem("token");
        account.setData({});
        return router.replace("/login");
      }

      account.setData(user);
      router.replace("/");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Prevent infinite re-render
  }, [token]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Login</h1>
        <p className={styles.authDescription}>
          Por favor, insira suas credenciais.
        </p>

        <div className={styles.form}>
          <div className={styles.email}>
            <div className={styles.label}>
              <label htmlFor="email">Email</label>
              {emailError && (
                <label htmlFor="email" className={styles.error}>
                  {emailError}
                </label>
              )}
            </div>

            <input
              type="email"
              name="email"
              id="email"
              placeholder="me@example.com"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className={styles.password}>
            <div className={styles.label}>
              <label htmlFor="password">Senha</label>
              {passwordError && (
                <label htmlFor="password" className={styles.error}>
                  {passwordError}
                </label>
              )}
            </div>

            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              value={password}
              onChange={handlePassword}
            />
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.login}
            type="button"
            disabled={
              emailError.length > 0 ||
              passwordError.length > 0 ||
              email.length === 0 ||
              password.length === 0 ||
              password.length < 8 ||
              !email.includes("@")
            }
            onClick={handleLogin}
          >
            Autenticar-se
          </button>

          <span>
            Não tem uma conta? <Link href="/register">Registre-se</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
