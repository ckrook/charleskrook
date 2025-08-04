"use client";

import React from "react";

interface Shortcut {
  keys: string[];
  description: string;
  action?: string;
}

const KeyboardShortcuts = () => {
  const shortcuts: Shortcut[] = [
    {
      keys: ["⌘", "K"],
      description: "Quick navigation",
      action: "Open command menu",
    },
    {
      keys: ["⌘", "P"],
      description: "Print resume",
      action: "Print current page as resume",
    },
    {
      keys: ["⌘", "/"],
      description: "Toggle theme",
      action: "Switch between light and dark mode",
    },
  ];

  return (
    <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {shortcuts.map((shortcut, index) => (
        <div
          key={index}
          className="px-4 py-2 flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          role="listitem"
        >
          <div className="flex flex-col">
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              {shortcut.description}
            </span>
            {shortcut.action && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                {shortcut.action}
              </span>
            )}
          </div>
          <div
            className="flex items-center space-x-1"
            role="group"
            aria-label={`Keyboard shortcut for ${shortcut.description}`}
          >
            {shortcut.keys.map((key, keyIndex) => (
              <React.Fragment key={keyIndex}>
                <kbd
                  className="min-w-6 h-6 flex items-center justify-center bg-white dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 text-xs px-1.5 shadow-sm"
                  aria-label={`Key ${key}`}
                >
                  {key}
                </kbd>
                {keyIndex < shortcut.keys.length - 1 && (
                  <span className="text-neutral-400" aria-hidden="true">
                    +
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyboardShortcuts;
