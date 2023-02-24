import "@/styles/reset.scss";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
    <html lang="en">
      <body style={{ fontFamily: inter.style.fontFamily }}>{children}</body>
    </html>
  );
}
