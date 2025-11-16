import React, { useMemo } from "react";
import { RichTextContent } from "@/app/utils/markdown";
import { adaptRichTextFromCMS } from "@/app/utils/richTextUtils";
import { BlockParagraph } from "./parts/BlockParagraph";

interface RichTextRendererProps {
  content: any; // Accept any content format
  className?: string;
  debug?: boolean; // Add option to show debug info
  fallback?: React.ReactNode;
}

/**
 * Component that renders rich text content from CMS data
 * This component handles the normalization of different CMS data formats
 * and renders them using the RichTextContent component
 */
const RichTextRenderer = React.memo(
  ({
    content,
    className = "",
    debug = false,
    fallback,
  }: RichTextRendererProps) => {
    const normalizedContent = useMemo(() => {
      // Transform CMS content to normalized rich text format
      return adaptRichTextFromCMS(content);
    }, [content]);

    // Memoize the error state
    const hasError = useMemo(() => !normalizedContent, [normalizedContent]);

    // If content couldn't be normalized, show an error or fallback
    if (hasError) {
      console.error("Failed to normalize rich text content:", content);

      // Try a direct approach if debugging is enabled
      if (debug && content?.children && Array.isArray(content.children)) {
        console.log("Attempting direct children rendering...");
        return (
          <RichTextContent content={content.children} className={className} />
        );
      }

      // Show custom fallback if provided
      if (fallback) {
        return <>{fallback}</>;
      }

      if (debug) {
        return (
          <div
            className="text-red-500 p-4 border border-red-300 rounded-md"
            role="alert"
          >
            <BlockParagraph>Unable to render content</BlockParagraph>
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
                <BlockParagraph>
                  Has children: {content.children ? "Yes" : "No"}
                </BlockParagraph>
              )}
            </div>
          </div>
        );
      }

      return <BlockParagraph>Unable to render content</BlockParagraph>;
    }

    // Render the content using the RichTextContent component
    return (
      <RichTextContent
        content={normalizedContent || []}
        className={className}
      />
    );
  }
);

RichTextRenderer.displayName = "RichTextRenderer";

export { RichTextRenderer };
export default RichTextRenderer;
