import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define types for the rich text content
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

type MarkdownContentProps = {
  content: string;
  className?: string;
};

// New component for rich text content
type RichTextContentProps = {
  content: Array<RichTextNode>;
  className?: string;
};

export function RichTextContent({
  content,
  className = "",
}: RichTextContentProps) {
  if (!content || !Array.isArray(content)) {
    console.error("RichTextContent received invalid content:", content);
    return <div className="text-red-500">Invalid content structure</div>;
  }

  // Safety function to prevent errors when mapping over undefined children
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

    // Handle different node types
    switch (node.type) {
      case "paragraph":
        // Check if this is the first paragraph to apply serif styling
        const isFirstParagraph = index === 0;
        return (
          <p
            key={index}
            className={`mb-8 leading-relaxed ${isFirstParagraph ? "lede" : ""}`}
          >
            {safeMap(node.children, (child, i) => renderChild(child, i))}
          </p>
        );

      case "heading-one":
        return (
          <h1 key={index} className="text-3xl font-semibold mb-6">
            {safeMap(node.children, (child, i) => renderChild(child, i))}
          </h1>
        );

      case "heading-two":
        return (
          <h2 key={index} className="text-2xl font-semibold mb-4">
            {safeMap(node.children, (child, i) => renderChild(child, i))}
          </h2>
        );

      case "heading-three":
        return (
          <h3 key={index} className="text-xl font-semibold mb-3">
            {safeMap(node.children, (child, i) => renderChild(child, i))}
          </h3>
        );

      case "numbered-list":
        return (
          <ol key={index} className="list-decimal pl-6 mb-4">
            {safeMap(node.children, (child, i) => renderNode(child, i))}
          </ol>
        );

      case "bulleted-list":
        return (
          <ul key={index} className="list-disc pl-6 mb-4">
            {safeMap(node.children, (child, i) => renderNode(child, i))}
          </ul>
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
            className="bg-neutral-100 p-4 rounded-lg my-4 overflow-x-auto dark:bg-neutral-800 dark:text-neutral-200"
          >
            <code className="text-sm whitespace-pre">{codeText}</code>
          </pre>
        );

      case "image":
        if (node.src) {
          return (
            <div
              key={index}
              className="col-span-12 md:col-span-8 md:col-start-3 rounded-none md:rounded-lg overflow-hidden"
            >
              <div className="relative w-full h-[400px] md:h-[500px] bg-stone-950 gradient-to-r from-stone-950 to-stone-900">
                <Image
                  src={node.src}
                  alt={node.alt || ""}
                  fill
                  objectFit="cover"
                  unoptimized
                />
              </div>
            </div>
          );
        }
        return null;

      default:
        // If node has text, render it directly
        if (node.text !== undefined) {
          return node.text;
        }

        // Otherwise try to render children if they exist
        if (node.children && node.children.length > 0) {
          return (
            <React.Fragment key={index}>
              {safeMap(node.children, (child, i) => renderNode(child, i))}
            </React.Fragment>
          );
        }

        // Fallback for unknown or empty nodes
        console.log("Unknown node type:", node);
        return null;
    }
  };

  const renderChild = (child: RichTextChildNode, index: number) => {
    if (!child) return null;

    // Handle leaf nodes with text
    if (child.text !== undefined) {
      let textContent = <>{child.text}</>;

      // Apply styling based on marks
      if (child.bold)
        textContent = <strong key={`bold-${index}`}>{textContent}</strong>;
      if (child.italic)
        textContent = <em key={`italic-${index}`}>{textContent}</em>;
      if (child.underline)
        textContent = <u key={`underline-${index}`}>{textContent}</u>;
      if (child.code)
        textContent = (
          <code
            key={`code-${index}`}
            className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm"
          >
            {textContent}
          </code>
        );

      return <React.Fragment key={index}>{textContent}</React.Fragment>;
    }

    // Handle link nodes
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

    // Handle other node types
    if (child.type) {
      return renderNode(child, index);
    }

    console.log("Unknown child node:", child);
    return null;
  };

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      {content.map((node, index) => renderNode(node, index))}
    </div>
  );
}

export function MarkdownContent({
  content,
  className = "",
}: MarkdownContentProps) {
  // Ensure content is a string and sanitize it
  const sanitizedContent =
    typeof content === "string" ? content.replace(/\u00a0/g, " ") : "";

  return (
    <div className={`prose prose-lg max-w-none prose-pre:p-0 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml={false}
        components={{
          // Headings - simplified to avoid parsing issues
          h1: ({ children }) => (
            <h1 className="text-3xl font-semibold mb-6">{children}</h1>
          ),
          h2: ({ children }) => <h2>{children}</h2>,
          h3: ({ children }) => <h3>{children}</h3>,

          // Paragraphs and text - simplified
          p: ({ children }) => <p>{children}</p>,

          // Code blocks - simplified using any to bypass type checking
          code: (props: any) => {
            const { inline, children } = props;
            return inline ? (
              <code className="bg-neutral-100 px-1.5 py-0.5 rounded text-sm">
                {children}
              </code>
            ) : (
              <pre className="bg-neutral-100 p-4 rounded-lg my-4 overflow-x-auto">
                <code className="text-sm">{children}</code>
              </pre>
            );
          },

          // Image handling
          img: (props: any) => {
            const { src, alt } = props;
            if (!src) return null;

            // Check if the source is an external URL
            const isExternal =
              src.startsWith("http") || src.startsWith("https");

            if (isExternal) {
              return (
                <div className="col-span-12 md:col-span-8 md:col-start-3 rounded-none md:rounded-lg overflow-hidden">
                  <div className="relative w-full h-[400px] md:h-[500px] bg-stone-950 gradient-to-r from-stone-950 to-stone-900">
                    <Image
                      src={src}
                      alt={alt || ""}
                      fill
                      objectFit="cover"
                      unoptimized
                    />
                  </div>
                </div>
              );
            }

            // For local images with known dimensions
            return (
              <div className="col-span-12 md:col-span-8 md:col-start-3 rounded-none md:rounded-lg overflow-hidden">
                <div className="relative w-full h-[400px] md:h-[500px] bg-stone-950 gradient-to-r from-stone-950 to-stone-900">
                  <Image
                    src={src}
                    alt={alt || ""}
                    fill
                    objectFit="cover"
                    unoptimized
                  />
                </div>
              </div>
            );
          },
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
}
