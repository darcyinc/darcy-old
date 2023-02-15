import Providers from "./providers";

import styles from "./page.module.scss";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Darcy - Login",
  description: "Darcy is a social media where you can share your thoughts.",
  keywords: ["social media", "social", "media", "darcy", "darcy social media"],
  colorScheme: "dark",
  icons: {
    shortcut: [{ url: "/favicon.png" }],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={styles.body}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
