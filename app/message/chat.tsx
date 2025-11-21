"use client";

import * as Ably from "ably";
import ChatBox from "./chat-box";

export default function Chat() {
  const client = new Ably.Realtime({
    key: "n2BjTA._mogWg:N0RjKCdIFq3VhjhsypSUHHi9HLVMSPApH8w9_8V-ppM",
  });
  return <ChatBox />;
}