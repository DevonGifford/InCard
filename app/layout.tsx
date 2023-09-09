"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/app/components/navbar";
//import AuthProvider from "@/app/providers/AuthProvider";
//import ToasterProvider from "./providers/ToasterProvider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import "./globals.css";

// ✅ Toast Notification Provider
function ToasterProvider() {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
  );
}

// ✅ Next-Auth Provider
function AuthProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

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
