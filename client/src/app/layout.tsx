//* "use client" layout files are rendered on the server,so if we use use client,it will show hydration error since the  initail ui wont be matching what was rendered on the server

import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ConnectContextProvider } from "../../context/context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campus Connect",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ConnectContextProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </ConnectContextProvider>
    </html>
  );
}