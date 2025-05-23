import React from "react";
import Link from "next/link";

type RichTextNode = {
  type: string;
  children: Array<RichTextChildNode>;
  className?: string;
  [key: string]: any;
};

type RichTextChildNode = {
  text?: string;
  type?: string;
  children?: Array<any>;
  href?: string;
  className?: string;
  openInNewTab?: boolean;
  [key: string]: any;
};

// Sample content from the user's example
const sampleContent = [
  {
    type: "paragraph",
    children: [
      {
        text: "We're going to build a React component that fetches your current Google Calendar status and displays it on your website.",
      },
    ],
  },
  {
    type: "heading-one",
    children: [{ text: "What You'll Need" }],
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
              { text: "Go to the " },
              {
                href: "https://console.developers.google.com/",
                type: "link",
                children: [{ text: "Google Cloud Console" }],
                className: "underline underline-offset-4",
                openInNewTab: true,
              },
              { text: "." },
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
        text: "const GoogleCalendarStatus = () => {\n  // Code here\n  return <div>Status</div>;\n};",
      },
    ],
  },
];

// Standalone implementation
function StandaloneRichText({ content }: { content: Array<RichTextNode> }) {
  if (!content || !Array.isArray(content)) {
    return <div className="text-red-500">Invalid content structure</div>;
  }

  // Helper function for safer mapping
  const safeMap = (
    items: any[] | undefined,
    callback: (item: any, index: number) => React.ReactNode
  ) => {
    if (!items || !Array.isArray(items)) return null;
    return items.map(callback);
  };

  const renderNode = (
    node: RichTextNode | RichTextChildNode,
    index: number
  ) => {
    if (!node) return null;

    switch (node.type) {
      case "paragraph":
        return (
          <p key={index} className="text-gray-700 mb-4 leading-relaxed">
            {safeMap(node.children, (child, i) => renderChild(child, i))}
          </p>
        );

      case "heading-one":
        return (
          <h1 key={index} className="text-3xl font-bold mb-6">
            {safeMap(node.children, (child, i) => renderChild(child, i))}
          </h1>
        );

      case "numbered-list":
        return (
          <ol key={index} className="list-decimal pl-6 mb-4">
            {safeMap(node.children, (child, i) => renderNode(child, i))}
          </ol>
        );

      case "list-item":
        return (
          <li key={index} className="mb-2">
            {safeMap(node.children, (child, i) => renderNode(child, i))}
          </li>
        );

      case "list-item-child":
        return (
          <React.Fragment key={index}>
            {safeMap(node.children, (child, i) => renderChild(child, i))}
          </React.Fragment>
        );

      case "code-block":
        const codeText =
          safeMap(node.children, (child) => child.text || "")?.join("") || "";
        return (
          <pre
            key={index}
            className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto"
          >
            <code className="text-sm whitespace-pre">{codeText}</code>
          </pre>
        );

      default:
        if (node.text !== undefined) {
          return node.text;
        }

        if (node.children && node.children.length > 0) {
          return (
            <React.Fragment key={index}>
              {safeMap(node.children, (child, i) => renderNode(child, i))}
            </React.Fragment>
          );
        }

        console.log("Unknown node type:", node);
        return null;
    }
  };

  const renderChild = (child: RichTextChildNode, index: number) => {
    if (!child) return null;

    if (child.text !== undefined) {
      let textContent = <>{child.text}</>;

      if (child.bold)
        textContent = <strong key={`bold-${index}`}>{textContent}</strong>;
      if (child.italic)
        textContent = <em key={`italic-${index}`}>{textContent}</em>;
      if (child.underline)
        textContent = <u key={`underline-${index}`}>{textContent}</u>;
      if (child.code) {
        textContent = (
          <code
            key={`code-${index}`}
            className="bg-gray-100 px-1.5 py-0.5 rounded text-sm"
          >
            {textContent}
          </code>
        );
      }

      return <React.Fragment key={index}>{textContent}</React.Fragment>;
    }

    if (child.type === "link") {
      return (
        <Link
          key={index}
          href={child.href || "#"}
          className={child.className || "text-blue-600 hover:underline"}
          target={child.openInNewTab ? "_blank" : undefined}
          rel={child.openInNewTab ? "noopener noreferrer" : undefined}
        >
          {safeMap(child.children, (grandChild, i) =>
            renderChild(grandChild, i)
          )}
        </Link>
      );
    }

    if (child.type) {
      return renderNode(child, index);
    }

    return null;
  };

  return (
    <div className="prose max-w-none">
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
}

export default function StandaloneTest() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Standalone Rich Text Test</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <StandaloneRichText content={sampleContent} />
      </div>
    </div>
  );
}
