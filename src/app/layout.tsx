//* "use client" layout files are rendered on the server,so if we use use client,it will show hydration error since the  initail ui wont be matching what was rendered on the server

import "../styles/globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ConnectContextProvider } from "../context/context";

const inter = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CampusConnect",
  description: "A social networking platform tailored for folks in college where one can drop his social profiles and connect with other's and follow their social media's at one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <body className={inter.className}>
      <ConnectContextProvider>
          <Navbar />
          {children}
      </ConnectContextProvider>
        </body>
    </html>
  );
}
