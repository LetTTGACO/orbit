import "@/styles/globals.css";
import React from "react";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Orbit",
  description: "分支管理",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
