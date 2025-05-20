import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

type MarkdownContentProps = {
  content: string;
  className?: string;
};

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
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mb-3">{children}</h3>
          ),

          // Paragraphs and text - simplified
          p: ({ children }) => (
            <p className="text-neutral-700 mb-4 leading-relaxed">{children}</p>
          ),

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

            // Use a regular img tag for simplicity and reliability
            return (
              <img
                src={src}
                alt={alt || ""}
                className="rounded-lg my-4 max-w-full h-auto"
              />
            );
          },
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
}
