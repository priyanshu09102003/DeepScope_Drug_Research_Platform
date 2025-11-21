"use client";

import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "./globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./context/UserContext";
import * as Ably from "ably";
import { AblyProvider, ChannelProvider } from "ably/react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const client  = new Ably.Realtime({
    key: "n2BjTA._mogWg:N0RjKCdIFq3VhjhsypSUHHi9HLVMSPApH8w9_8V-ppM"
  });

  return (
    <html lang="en" suppressHydrationWarning>
      {/* <script src="https://unpkg.com/@rdkit/rdkit/dist/RDKit_minimal.js"></script> */}
      <body suppressHydrationWarning={true}>

        <SessionProvider>
          <UserProvider>
            <AblyProvider client={client}>
              <ChannelProvider channelName="chat-demo1">
                  {children}
              </ChannelProvider>
            </AblyProvider>
          </UserProvider>
        </SessionProvider>
      
      
      </body>
    </html>
  );
}