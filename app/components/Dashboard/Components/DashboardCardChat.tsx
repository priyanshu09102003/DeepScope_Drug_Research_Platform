"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserByEmail } from "@/app/lib/actions/user.actions";

const ChartThree: React.FC = () => {
  const { data: session } = useSession();
  const [userPhoto, setUserPhoto] = useState<string>("/images/user/user-02.png");
  const [showTyping, setShowTyping] = useState<boolean>(true);
  const [showFinalMessage, setShowFinalMessage] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const user = await getUserByEmail(session.user.email);
        setUserPhoto(user.photo || "/images/user/user-02.png");
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  useEffect(() => {
    // Loop animation: show typing for 5 seconds, then show message for 10 seconds, then reset
    const loopAnimation = () => {
      setShowTyping(true);
      setShowFinalMessage(false);

      // After 5 seconds, hide typing and show message
      setTimeout(() => {
        setShowTyping(false);
        setShowFinalMessage(true);
      }, 5000);

      // After 15 seconds total (5s typing + 10s message), restart the loop
      setTimeout(() => {
        loopAnimation();
      }, 15000);
    };

    loopAnimation();

    // Cleanup on unmount
    return () => {
      setShowTyping(false);
      setShowFinalMessage(false);
    };
  }, []);

  return (
    <div className="col-span-12 rounded-lg border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-[#181818] dark:bg-[#181818] sm:px-7.5 xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Collaborate with team
          </h5>
        </div>
      </div>

      <div className="mb-2 flex flex-col gap-4">
        {/* First Message */}
        <div className="flex items-start gap-2.5">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="/images/user/user-01.png"
            alt="user"
          />
          <div className="leading-1.5 border-gray-200 dark:bg-gray-700 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl bg-[#f3f4f6] p-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-gray-900 text-sm font-semibold dark:text-white">
                Dr. Albert
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                11:46
              </span>
            </div>
            <p className="text-gray-900 py-2.5 text-sm font-normal dark:text-white">
              That's awesome. I think we are making a pretty good progress
            </p>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
              Delivered
            </span>
          </div>
        </div>

        {/* Second Message - Reply (Your Message) */}
        <div className="flex items-start gap-2.5 justify-end">
          <div className="leading-1.5 flex w-full max-w-[320px] flex-col rounded-s-xl rounded-ee-xl bg-[#3056D3] p-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-sm font-semibold text-white">
                You
              </span>
              <span className="text-gray-200 text-sm font-normal">
                11:48
              </span>
            </div>
            <p className="py-2.5 text-sm font-normal text-white">
              Absolutely! The molecule generation results look promising. Should we run the Molecule analysis next?
            </p>
            <span className="text-gray-200 text-sm font-normal">
              Read
            </span>
          </div>
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={userPhoto}
            alt="you"
          />
        </div>

        {/* Third Message */}
        <div className="flex items-start gap-2.5">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="/images/user/user-03.png"
            alt="user"
          />
          <div className="leading-1.5 border-gray-200 dark:bg-gray-700 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl bg-[#f3f4f6] p-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <span className="text-gray-900 text-sm font-semibold dark:text-white">
                Dr. James Wright
              </span>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                11:50
              </span>
            </div>
            <p className="text-gray-900 py-2.5 text-sm font-normal dark:text-white">
              Great idea! I've already shared the compound details in the project folder. Let's collaborate on this.
            </p>
            <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
              Delivered
            </span>
          </div>
        </div>

        {/* Typing Indicator or Final Message */}
        {showTyping && (
          <div className="flex items-start gap-2.5 transition-opacity duration-500">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="/images/user/user-01.png"
              alt="user"
            />
            <div className="leading-1.5 border-gray-200 dark:bg-gray-700 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl bg-[#f3f4f6] p-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                <span className="text-gray-900 text-sm font-semibold dark:text-white">
                  Sarah Chen
                </span>
              </div>
              <div className="flex space-x-1">
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {showFinalMessage && (
          <div className="flex items-start gap-2.5 transition-opacity duration-500 animate-fadeIn">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="/images/user/user-01.png"
              alt="user"
            />
            <div className="leading-1.5 border-gray-200 dark:bg-gray-700 flex w-full max-w-[320px] flex-col rounded-e-xl rounded-es-xl bg-[#f3f4f6] p-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-gray-900 text-sm font-semibold dark:text-white">
                  Dr. Albert
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                  11:52
                </span>
              </div>
              <p className="text-gray-900 py-2.5 text-sm font-normal dark:text-white">
                Perfect! I'll configure the stability parameters. This collaboration feature is really streamlining our workflow!
              </p>
              <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
                Delivered
              </span>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default ChartThree;