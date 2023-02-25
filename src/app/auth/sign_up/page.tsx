"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import { useMemo, useCallback, useState } from "react";
import Logo from "@/assets/logo-cropped.png";
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
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmedPasswordError, setConfirmedPasswordError] = useState("");

  const hasValidationErrors = useMemo(
    () =>
      emailError !== "" ||
      passwordError !== "" ||
      confirmedPasswordError !== "",
    [confirmedPasswordError, emailError, passwordError]
  );

  const handleValidations = useCallback(() => {
    // Cleanup errors
    setEmailError("");
    setPasswordError("");
    setConfirmedPasswordError("");

    // Length validation
    if (email.length === 0) setEmailError("O campo email é obrigatório.");
    if (password.length === 0) setPasswordError("O campo senha é obrigatório.");
    if (confirmedPassword.length === 0)
      setConfirmedPasswordError("O campo confirmação de senha é obrigatório.");

    // Email validation
    if (!email.includes("@") || !EMAIL_REGEX.test(email))
      setEmailError("O campo email deve ser um email válido.");

    // Password validation
    if (password.length < 8)
      setPasswordError("A senha deve ter no mínimo 8 caracteres.");

    // Confirmed password validation
    if (confirmedPassword !== password)
      setConfirmedPasswordError("As senhas não são iguais.");
  }, [confirmedPassword, email, password]);

  const handleEmail = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setEmail(value);
      handleValidations();
    },
    [handleValidations]
  );

  const handlePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setPassword(value);
      handleValidations();
    },
    [handleValidations]
  );

  const handleConfirmedPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setConfirmedPassword(value);
      handleValidations();
    },
    [handleValidations]
  );

  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (hasValidationErrors) return;

      try {
        const doUserLogin = (await import("@/api/doUserRegister")).default;
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
        setEmailError("Ocorreu um erro ao tentar se registrar.");
        setPasswordError("Ocorreu um erro ao tentar se registrar.");
      }
    },
    [email, password, hasValidationErrors, router]
  );

  return (
    <div className={styles.container}>
      <ValidUserCheck redirectToIfLogged="/" />

      <div className={styles.card}>
        <div className={styles.logoContainer}>
          <img
            alt="Logo"
            className={styles.logo}
            draggable={false}
            height={72}
            src={Logo.src}
            width={80}
          />
          <span>Darcy</span>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <div className={styles.label}>
              <label htmlFor="email">E-mail</label>
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

          <div>
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

          <div>
            <div className={styles.label}>
              <label htmlFor="confirm-password">Confirmar senha</label>
              {confirmedPasswordError && (
                <label className={styles.error} htmlFor="confirm-password">
                  {confirmedPasswordError}
                </label>
              )}
            </div>

            <input
              id="confirm-password"
              name="confirm-password"
              onChange={handleConfirmedPassword}
              placeholder="********"
              type="password"
              value={confirmedPassword}
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
                confirmedPassword.length === 0 ||
                confirmedPassword !== password ||
                !email.includes("@")
              }
              type="submit"
            >
              Criar conta
            </button>

            <span>
              <Link href="/auth/sign_in">Já tenho uma conta</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
