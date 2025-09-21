import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CLONELY-FANZ",
  description: "AI Avatar Platform - Create and manage your virtual influencers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
