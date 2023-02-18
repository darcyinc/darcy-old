import "@/styles/globals.css";
import type { Metadata } from "next";
import styles from "./page.module.scss";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Darcy - Login",
  description: "Darcy is a social media where you can share your thoughts.",
  keywords: ["social media", "social", "media", "darcy", "darcy social media"],
  colorScheme: "dark",
  icons: {
    shortcut: [{ url: "/favicon.png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className={styles.body}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
