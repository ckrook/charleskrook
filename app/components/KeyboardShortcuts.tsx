"use client";

import React from "react";

type Shortcut = {
  keys: string[];
  description: string;
};

export default function KeyboardShortcuts() {
  const shortcuts: Shortcut[] = [
    { keys: ["⌘", "K"], description: "Quick navigation" },
    { keys: ["⌘", "P"], description: "Print resume" },
  ];

  return (
    <div className="">
      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {shortcuts.map((shortcut, index) => (
          <div
            key={index}
            className="px-4 py-2 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {shortcut.description}
            </span>
            <div className="flex items-center space-x-1">
              {shortcut.keys.map((key, keyIndex) => (
                <React.Fragment key={keyIndex}>
                  <kbd className="min-w-6 h-6 flex items-center justify-center bg-white dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 text-xs px-1.5 shadow-sm">
                    {key}
                  </kbd>
                  {keyIndex < shortcut.keys.length - 1 && (
                    <span className="text-neutral-400">+</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
