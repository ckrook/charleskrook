import { RichTextContent } from "../utils/markdown";

// Sample rich text data format provided by the user
const sampleContent = [
  {
    type: "paragraph",
    children: [
      {
        text: 'We\'re going to build a React component that fetches your current Google Calendar status and displays it on your website. Imagine having a "Busy" or "Free" status automatically updating on your portfolio or blog.',
      },
    ],
  },
  {
    type: "heading-one",
    children: [
      {
        text: "What You'll Need",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Before we start coding, you'll need two key pieces of information, these are your Google Calendar ID and your Google API Key.",
      },
    ],
  },
  {
    type: "paragraph",
    children: [
      {
        text: "Getting your Google API Key",
      },
    ],
  },
  {
    type: "numbered-list",
    children: [
      {
        type: "list-item",
        children: [
          {
            type: "list-item-child",
            children: [
              {
                text: "Go to the ",
              },
              {
                href: "https://console.developers.google.com/",
                type: "link",
                children: [
                  {
                    text: "Google Cloud Console",
                  },
                ],
                className: "underline underline-offset-4",
                openInNewTab: true,
              },
              {
                text: ".",
              },
            ],
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            type: "list-item-child",
            children: [
              {
                text: "Create a new project or select an existing one.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "code-block",
    children: [
      {
        text: 'import React, { useState, useEffect } from "react";\n\nconst GoogleCalendarStatus = () => {\n  const [status, setStatus] = useState("Loading...");\n  \n  useEffect(() => {\n    const API_KEY = process.env.REACT_PUBLIC_API_KEY;\n    const CALENDAR_ID = process.env.REACT_PUBLIC_CALENDAR_ID;\n    const currentTime = new Date().toISOString();\n    \n    const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${currentTime}&maxResults=1&orderBy=startTime&singleEvents=true`;\n    \n    fetch(url)\n      .then((response) => response.json())\n      .then((data) => {\n        const events = data.items;\n        if (events && events.length > 0) {\n          setStatus("Busy");\n        } else {\n          setStatus("Free");\n        }\n      })\n      .catch((error) => {\n        console.error("Error fetching data:", error);\n        setStatus("Error");\n      });\n  }, []);\n  \n  return (\n    <div>\n      <>Currently {status}</>\n    </div>\n  );\n};\n\nexport default GoogleCalendarStatus;',
      },
    ],
  },
];

export default function RichTextTest() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Rich Text Test</h1>
      <div className="bg-white rounded-lg border p-6">
        <RichTextContent content={sampleContent} />
      </div>
    </div>
  );
}
