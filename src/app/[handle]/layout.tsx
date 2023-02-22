import "@/styles/reset.css";
import { Inter } from "next/font/google";
import "./globals.css";

export function generateMetadata({ params }: { params: { handle: string } }) {
  return {
    title: `Darcy - @${params.handle}`,
    description: `@${params.handle} is a user on Darcy.`,
    keywords: [`${params.handle}`, "user", "darcy", "darcy social media"],
    colorScheme: "dark",
    icons: {
      shortcut: [{ url: "/favicon.png" }],
    },
  };
}

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
