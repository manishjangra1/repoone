import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chaos Kingdom - Multiplayer Platformer",
  description: "A fast-paced 2D multiplayer platform action game.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
