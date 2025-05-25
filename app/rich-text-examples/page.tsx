import React from "react";
import RichTextRenderer from "@/app/components/RichTextRenderer";

// Example of a content object from content.json
const exampleContent1 = {
  content: {
    json: {
      children: [
        {
          type: "heading-one",
          children: [{ text: "Example 1: Content in json.children format" }],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "This is an example of content where the rich text is in ",
            },
            { text: "content.json.children", bold: true },
            { text: " format." },
          ],
        },
      ],
    },
  },
};

// Example of content in body array format
const exampleContent2 = {
  body: [
    {
      json: {
        children: [
          {
            type: "heading-one",
            children: [
              { text: "Example 2: Content in body[0].json.children format" },
            ],
          },
          {
            type: "paragraph",
            children: [
              {
                text: "This is an example of content where the rich text is in ",
              },
              { text: "body[0].json.children", bold: true },
              { text: " format." },
            ],
          },
        ],
      },
    },
  ],
};

// Example of direct rich text array
const exampleContent3 = [
  {
    type: "heading-one",
    children: [{ text: "Example 3: Direct rich text array" }],
  },
  {
    type: "paragraph",
    children: [
      { text: "This is an example of content provided directly as a " },
      { text: "rich text array", bold: true },
      { text: "." },
    ],
  },
  {
    type: "paragraph",
    children: [
      { text: "The " },
      { text: "adaptRichTextFromCMS", italic: true },
      {
        text: " function handles all these different formats so you don't have to worry about it.",
      },
    ],
  },
];

export default function RichTextExamplesPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Rich Text Rendering Examples</h1>

      <div className="space-y-12">
        <section className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Example 1: content.json.children format
          </h2>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <RichTextRenderer content={exampleContent1} />
          </div>
          <div className="mt-4">
            <details>
              <summary className="cursor-pointer text-blue-600">
                View content structure
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded-lg overflow-auto text-xs">
                {JSON.stringify(exampleContent1, null, 2)}
              </pre>
            </details>
          </div>
        </section>

        <section className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Example 2: body[0].json.children format
          </h2>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <RichTextRenderer content={exampleContent2} />
          </div>
          <div className="mt-4">
            <details>
              <summary className="cursor-pointer text-blue-600">
                View content structure
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded-lg overflow-auto text-xs">
                {JSON.stringify(exampleContent2, null, 2)}
              </pre>
            </details>
          </div>
        </section>

        <section className="p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Example 3: Direct rich text array
          </h2>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <RichTextRenderer content={exampleContent3} />
          </div>
          <div className="mt-4">
            <details>
              <summary className="cursor-pointer text-blue-600">
                View content structure
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded-lg overflow-auto text-xs">
                {JSON.stringify(exampleContent3, null, 2)}
              </pre>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
}
