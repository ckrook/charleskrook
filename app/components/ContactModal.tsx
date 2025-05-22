"use client";

import { useState, useRef, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const initialFocusRef = useRef<HTMLInputElement>(null);

  // Focus the email input when the modal opens
  useEffect(() => {
    if (isOpen && initialFocusRef.current) {
      initialFocusRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Here you would typically send the form data to your backend
    // For now, we'll just simulate a submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSent(true);
    setIsSending(false);

    // Reset the form after 2 seconds and close the modal
    setTimeout(() => {
      setEmail("");
      setIsSent(false);
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="absolute left-1/2 top-1/2 w-full max-w-md px-4 md:px-0"
            style={{
              opacity: 1,
              filter: "blur(0px)",
              transform: "translateX(-50%) translateY(-50%)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {!isSent ? (
              <form
                onSubmit={handleSubmit}
                className="relative flex h-12 w-full items-center overflow-hidden rounded-full bg-[#EDEDED] dark:bg-zinc-800 text-base transition-all outline-black/10 focus-within:outline"
                style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 0px 1px" }}
              >
                <label htmlFor="email" className="pl-3 pr-2 transition-opacity">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#A6A6A6] dark:text-gray-400"
                  >
                    <circle cx="12" cy="12" r="4"></circle>
                    <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"></path>
                  </svg>
                </label>
                <input
                  ref={initialFocusRef}
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address..."
                  className="text-foreground h-12 bg-transparent pr-4 placeholder-[#A6A6A6] dark:placeholder-gray-500 outline-none transition-opacity autofill:shadow-[inset_0_0_0px_1000px_#EDEDED] dark:autofill:shadow-[inset_0_0_0px_1000px_#27272A] max-sm:w-full text-black dark:text-white w-full"
                  required
                />
                <div className="whitespace-nowrap pl-2 pr-3">
                  <button
                    type="submit"
                    disabled={isSending}
                    className="flex h-[24px] w-[24px] items-center justify-center rounded-full text-white ring-offset-[#EDEDED] dark:ring-offset-zinc-800 transition-all hover:bg-[#3e3e3e] dark:hover:bg-zinc-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[black] dark:focus-visible:ring-white focus-visible:ring-offset-2 active:scale-95 bg-[#1D1D1D] dark:bg-white dark:text-black disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M12.6666 4C12.4898 4 12.3202 4.07024 12.1952 4.19526C12.0702 4.32029 11.9999 4.48986 11.9999 4.66667V7.33333C11.9999 7.51014 11.9297 7.67971 11.8047 7.80474C11.6796 7.92976 11.5101 8 11.3333 8H4.93993L5.8066 7.14C5.93213 7.01446 6.00266 6.8442 6.00266 6.66667C6.00266 6.48913 5.93213 6.31887 5.8066 6.19333C5.68106 6.0678 5.5108 5.99727 5.33326 5.99727C5.15573 5.99727 4.98547 6.0678 4.85993 6.19333L2.85993 8.19333C2.79924 8.25674 2.75166 8.3315 2.71993 8.41333C2.65325 8.57564 2.65325 8.75769 2.71993 8.92C2.75166 9.00183 2.79924 9.0766 2.85993 9.14L4.85993 11.14C4.92191 11.2025 4.99564 11.2521 5.07688 11.2859C5.15812 11.3198 5.24526 11.3372 5.33326 11.3372C5.42127 11.3372 5.50841 11.3198 5.58965 11.2859C5.67089 11.2521 5.74462 11.2025 5.8066 11.14C5.86908 11.078 5.91868 11.0043 5.95253 10.9231C5.98637 10.8418 6.0038 10.7547 6.0038 10.6667C6.0038 10.5787 5.98637 10.4915 5.95253 10.4103C5.91868 10.329 5.86908 10.2553 5.8066 10.1933L4.93993 9.33333H11.3333C11.8637 9.33333 12.3724 9.12262 12.7475 8.74755C13.1226 8.37247 13.3333 7.86377 13.3333 7.33333V4.66667C13.3333 4.48986 13.263 4.32029 13.138 4.19526C13.013 4.07024 12.8434 4 12.6666 4Z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white dark:bg-zinc-900 rounded-lg p-6 shadow-lg text-center"
              >
                <svg
                  className="w-12 h-12 text-green-500 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <h3 className="text-lg font-medium text-black dark:text-white mb-2">
                  Thanks!
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  I&apos;ll be in touch soon.
                </p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
