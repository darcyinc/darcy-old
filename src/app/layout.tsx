import "@/styles/globals.css";
import { Inter } from "@next/font/google";
import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Darcy - Your feed",
  description: "Darcy is a social media where you can share your thoughts.",
  keywords: ["social media", "social", "media", "darcy", "darcy social media"],
  colorScheme: "dark",
  icons: {
    shortcut: [{ url: "/favicon.png" }],
  },
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" style={{ fontFamily: inter.style.fontFamily }}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
