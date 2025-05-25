import React from "react";
import { RichTextContent } from "@/app/utils/markdown";
import { adaptRichTextFromCMS } from "@/app/utils/richTextUtils";

type RichTextRendererProps = {
  content: any; // Accept any content format
  className?: string;
  debug?: boolean; // Add option to show debug info
};

/**
 * Component that renders rich text content from CMS data
 * This component handles the normalization of different CMS data formats
 * and renders them using the RichTextContent component
 */
export function RichTextRenderer({
  content,
  className = "",
  debug = false,
}: RichTextRendererProps) {
  // For debugging - check if content has a children array directly
  if (content?.children && Array.isArray(content.children)) {
    console.log("Content has a direct children array - structure looks good!");
  }

  // Transform CMS content to normalized rich text format
  const normalizedContent = adaptRichTextFromCMS(content);

  // If content couldn't be normalized, show an error
  if (!normalizedContent) {
    console.error("Failed to normalize rich text content:", content);

    // Try a direct approach if debugging is enabled
    if (debug && content?.children && Array.isArray(content.children)) {
      console.log("Attempting direct children rendering...");
      return (
        <RichTextContent content={content.children} className={className} />
      );
    }

    if (debug) {
      return (
        <div className="text-red-500 p-4 border border-red-300 rounded-md">
          <p className="font-semibold mb-2">Unable to render content</p>
          <details>
            <summary className="cursor-pointer text-sm">
              Show content data
            </summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-[300px]">
              {JSON.stringify(content, null, 2)}
            </pre>
          </details>
          <div className="mt-4">
            <p className="text-sm">Content type: {typeof content}</p>
            {typeof content === "object" && content !== null && (
              <p className="text-sm">
                Has children: {content.children ? "Yes" : "No"}
              </p>
            )}
          </div>
        </div>
      );
    }

    return <p className="text-red-500">Unable to render content</p>;
  }

  // Render the content using the RichTextContent component
  return <RichTextContent content={normalizedContent} className={className} />;
}

export default RichTextRenderer;
