import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import ToasterProvider from "../providers/ToasterProvider";
import AuthProvider from "../providers/AuthProvider";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InCard Technical Assessment",
  description: "Authentication & Session-management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
