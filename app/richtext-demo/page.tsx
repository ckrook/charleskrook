import { RichTextContent } from "@/app/utils/markdown";
import { adaptRichTextFromCMS } from "@/app/utils/richTextUtils";

// Sample data directly in the format that should come from GraphCMS RichText
// This exactly matches the structure you provided
const sampleData = [
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

// Create sample data in various CMS formats to test our utility
const cmsFormat1 = { body: [{ json: sampleData }] }; // Common GraphCMS format
const cmsFormat2 = { body: { json: sampleData } }; // Alternative format
const cmsFormat3 = { content: sampleData }; // Direct content field
const cmsFormat4 = { markdown: "# Plain markdown\nThis is a fallback test" }; // Markdown fallback

// Your specific CMS format (as shown in the debug output)
const yourCmsFormat = {
  body: [
    {
      json: {
        children: sampleData,
      },
    },
  ],
};

export default function RichTextDemo() {
  // Use our utility function to adapt content from different formats
  const content1 = adaptRichTextFromCMS(cmsFormat1);
  const content2 = adaptRichTextFromCMS(cmsFormat2);
  const content3 = adaptRichTextFromCMS(cmsFormat3);
  const content4 = adaptRichTextFromCMS(cmsFormat4);
  const rawContent = adaptRichTextFromCMS(sampleData);
  const yourContent = adaptRichTextFromCMS(yourCmsFormat);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Rich Text Rendering Demo</h1>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Direct Usage</h2>
        <p className="text-gray-600 mb-4">Using sample data directly:</p>
        <div className="border p-4 rounded-lg">
          <RichTextContent content={sampleData} />
        </div>
      </div>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md border-green-500 border-2">
        <h2 className="text-xl font-semibold mb-4">Your CMS Format</h2>
        <p className="text-sm text-gray-600 mb-3">
          This matches your exact debug output format
        </p>
        <div className="bg-white p-4 rounded border">
          {yourContent ? (
            <RichTextContent content={yourContent} />
          ) : (
            <p className="text-red-500">Failed to adapt content</p>
          )}
        </div>
        <div className="mt-4 text-xs bg-gray-50 p-3 rounded">
          <p className="font-medium mb-1">Format:</p>
          <code>{"{ body: [{ json: { children: [...content] } }] }"}</code>
        </div>
      </div>

      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">
          Testing Adaptation Utility
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">Format 1: body[0].json</h3>
            <p className="text-sm text-gray-600 mb-3">Common GraphCMS format</p>
            <div className="bg-white p-4 rounded border">
              {content1 ? (
                <RichTextContent content={content1} />
              ) : (
                <p className="text-red-500">Failed to adapt content</p>
              )}
            </div>
          </div>

          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">Format 2: body.json</h3>
            <p className="text-sm text-gray-600 mb-3">Alternative format</p>
            <div className="bg-white p-4 rounded border">
              {content2 ? (
                <RichTextContent content={content2} />
              ) : (
                <p className="text-red-500">Failed to adapt content</p>
              )}
            </div>
          </div>

          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">Format 3: content field</h3>
            <p className="text-sm text-gray-600 mb-3">Direct content field</p>
            <div className="bg-white p-4 rounded border">
              {content3 ? (
                <RichTextContent content={content3} />
              ) : (
                <p className="text-red-500">Failed to adapt content</p>
              )}
            </div>
          </div>

          <div className="border p-4 rounded-lg bg-gray-50">
            <h3 className="font-medium mb-2">Format 4: raw array</h3>
            <p className="text-sm text-gray-600 mb-3">Direct rich text nodes</p>
            <div className="bg-white p-4 rounded border">
              {rawContent ? (
                <RichTextContent content={rawContent} />
              ) : (
                <p className="text-red-500">Failed to adapt content</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 p-6 bg-gray-50 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">How to Use</h2>
        <div className="bg-gray-100 p-4 rounded text-sm mb-4 overflow-x-auto">
          <pre>{`import { RichTextContent } from "@/app/utils/markdown";
import { adaptRichTextFromCMS } from "@/app/utils/richTextUtils";

// In your page component:
export default async function MyPage() {
  const data = await fetchFromCMS();
  
  // This will handle any format the CMS returns
  const adaptedContent = adaptRichTextFromCMS(data);
  
  return (
    <div>
      {adaptedContent ? (
        <RichTextContent content={adaptedContent} />
      ) : (
        <p>No content available</p>
      )}
    </div>
  );
}`}</pre>
        </div>
      </div>
    </div>
  );
}
