import { Metadata } from "next";
import Providers from "./providers";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Darcy - Your feed",
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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
