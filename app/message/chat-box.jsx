"use client";

import React, { useEffect, useState, useRef } from "react";
import { useChannel } from "ably/react";
import { useAbly } from "ably/react";
import { SendIcon, MessageCircle, Users, Bell } from "lucide-react";
import { useUser } from "../context/UserContext";
import { resizeBase64Img } from "../lib/utils";
import {
  createGroup,
  getAllGroups,
  addMessageToGroup,
  getGroupMessages,
} from "../lib/actions/group.actions";
import { getUserByEmail } from "../lib/actions/user.actions";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";

const DefaultLayout = dynamic(
  () => import("../components/Layout/DefaultLayout"),
  {
    ssr: false,
  }
);

function ChatBox() {
  const ably = useAbly();
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [receivedMessages, setMessages] = useState([]);
  const [user_, setUser_] = useState(null);
  const channelName = "chat-demo1";
  const { data: session } = useSession();
  const user = useUser();
  
  const { channel } = useChannel(channelName);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!channel || !currentGroup) return;

    const messageHandler = (message) => {
      if (message.data.group === currentGroup._id) {
        setMessages((prevMessages) => [...prevMessages, message.data]);
      }
    };

    channel.subscribe("chat-message", messageHandler);

    return () => {
      channel.unsubscribe("chat-message", messageHandler);
    };
  }, [channel, currentGroup]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [receivedMessages]);

  useEffect(() => {
    const fetchGroups = async () => {
      if (!session?.user?.email) return;
      
      try {
        const groupsFromServer = await getAllGroups();
        const userData = await getUserByEmail(session.user.email);
        setUser_(userData);
        setGroups(groupsFromServer);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };
    fetchGroups();
  }, [session?.user?.email]);

  const handleCreateGroup = async (groupName) => {
    if (!groupName || !user_ || groups.some((group) => group.name === groupName)) {
      return;
    }
    
    try {
      const newGroup = await createGroup(groupName, user_._id);
      setGroups([...groups, newGroup]);
      setCurrentGroup(newGroup);
      setMessages([]);
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  const handleJoinGroup = async (groupId) => {
    if (!groupId) return;
    
    try {
      const selectedGroup = groups.find((group) => group._id === groupId);
      setCurrentGroup(selectedGroup);

      const groupMessages = await getGroupMessages(groupId);
      const formattedMessages = groupMessages.map((msg) => ({
        ...msg,
        connectionId: msg.sender._id,
        name: `${msg.sender.firstName} ${msg.sender.lastName}`,
        image: msg.sender.photo || "/default-avatar.png",
        data: msg.text,
        timestamp: msg.timestamp,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  const sendChatMessage = async (messageText) => {
    try {
      if (!currentGroup || !channel || !user || !user_ || !ably) {
        console.error("Missing required data for sending message");
        return;
      }

      const resizedImage = await resizeBase64Img(user.photo, 100, 100);

      const message = {
        group: currentGroup._id,
        name: `${user.firstName} ${user.lastName}`,
        image: resizedImage,
        data: messageText,
        timestamp: new Date().toISOString(),
        connectionId: ably.connection.id,
      };

      await channel.publish("chat-message", message);
      await addMessageToGroup(currentGroup._id, user_._id, messageText);

      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    if (messageText.trim()) {
      sendChatMessage(messageText);
    }
  };

  const renderedMessages = receivedMessages.map((message, index) => {
    const isMe = ably && message.connectionId === ably.connection.id;
    return (
      <div
        key={index}
        className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`max-w-[70%] rounded-2xl p-4 shadow-md ${
            isMe
              ? "bg-primary text-white"
              : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          }`}
        >
          <div className="mb-2 flex items-center">
            <img
              src={message.image || "/default-avatar.png"}
              alt={message.name}
              className="mr-2 h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-700"
            />
            <span className={`text-sm font-bold ${isMe ? "text-white" : "text-gray-900 dark:text-gray-100"}`}>
              {message.name}
            </span>
          </div>
          <p className={`text-sm ${isMe ? "text-white" : "text-gray-800 dark:text-gray-200"}`}>
            {message.data}
          </p>
          <span className={`text-xs mt-1 block ${isMe ? "text-white/70" : "text-gray-500 dark:text-gray-400"}`}>
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
      </div>
    );
  });

  return (
    <DefaultLayout>
      <div className="container mx-auto h-screen p-4 max-w-7xl">
        <h1 className="mb-6 text-3xl font-bold text-black dark:text-white">
          Team Collaboration
        </h1>

        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:gap-4 sm:space-y-0">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Create new group"
              className="w-full rounded-xl border border-gray-300 bg-white p-4 shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleCreateGroup(e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
          <div className="flex-1">
            <select
              onChange={(e) => handleJoinGroup(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white p-4 shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
              value={currentGroup?._id || ""}
            >
              <option value="">Join a group</option>
              {groups.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!currentGroup ? (
          <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-12 shadow-xl dark:border-gray-800 dark:from-gray-900 dark:to-gray-800 min-h-[600px]">
            <div className="text-center max-w-md">
              <div className="mb-6 flex justify-center">
                <svg
                  className="h-24 w-24 text-gray-300 dark:text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-800 dark:text-gray-200">
                Welcome to Team Collaboration
              </h3>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                Select a group from the dropdown above to start chatting, or create a new group to begin collaborating with your team.
              </p>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>Real-time messaging</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Group collaboration</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Instant notifications</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 shadow-xl dark:border-gray-800 dark:from-gray-900 dark:to-gray-800">
            <h2 className="mb-4 text-xl font-bold text-black dark:text-white">
              Current Group: {currentGroup.name}
            </h2>
            <div className="mb-4 h-[500px] overflow-y-auto rounded-xl bg-gradient-to-b from-gray-100 to-gray-50 p-6 shadow-inner dark:from-gray-950 dark:to-gray-900">
              {renderedMessages.length > 0 ? (
                <>
                  {renderedMessages}
                  <div ref={bottomRef}></div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-gray-400 dark:text-gray-600 text-center">
                    No messages yet. Start chatting!
                  </p>
                </div>
              )}
            </div>
            <form onSubmit={handleFormSubmission} className="flex gap-3">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-xl border border-gray-300 bg-white p-4 shadow-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-primary"
              />
              <button
                type="submit"
                disabled={!messageText.trim()}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-4 font-medium text-white shadow-lg transition-all hover:shadow-xl hover:bg-opacity-90 disabled:bg-gray-400 cursor-pointer disabled:cursor-not-allowed disabled:shadow-none"
              >
                <SendIcon className="h-5 w-5" />
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default ChatBox;