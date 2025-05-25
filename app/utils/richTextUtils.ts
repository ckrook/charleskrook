/**
 * Utilities for working with rich text content from various CMS formats
 */

type RichTextNode = {
  type: string;
  children: Array<any>;
  [key: string]: any;
};

/**
 * Normalize rich text content from various formats into the expected format
 * This helps handle different ways the CMS might provide the data
 */
export function normalizeRichTextContent(content: any): RichTextNode[] | null {
  // Case 1: Already in the correct format (array of nodes)
  if (
    Array.isArray(content) &&
    content.length > 0 &&
    content[0].type &&
    content[0].children
  ) {
    return content;
  }

  // Case 2: Nested in a json property (typical GraphCMS format)
  if (content?.json && Array.isArray(content.json)) {
    return content.json;
  }

  // Case 3: json with children array (as shown in your debug output)
  if (content?.json?.children && Array.isArray(content.json.children)) {
    return content.json.children;
  }

  // Case 4: Direct children array at the top level (matches your console.log output)
  if (content?.children && Array.isArray(content.children)) {
    return content.children;
  }

  // Case 5: GraphCMS raw format - often a stringified JSON
  if (typeof content === "string") {
    try {
      const parsedContent = JSON.parse(content);

      // Check different possible structures in the parsed content
      if (parsedContent.children && Array.isArray(parsedContent.children)) {
        return parsedContent.children;
      }

      if (parsedContent.json && parsedContent.json.children) {
        return parsedContent.json.children;
      }

      if (
        Array.isArray(parsedContent) &&
        parsedContent.length > 0 &&
        parsedContent[0].type
      ) {
        return parsedContent;
      }

      // If we have a parsable string but no recognized structure, convert to paragraph
      return [
        {
          type: "paragraph",
          children: [{ text: content }],
        },
      ];
    } catch (e) {
      // If it's not valid JSON, treat as simple string (Case 7)
      return [
        {
          type: "paragraph",
          children: [{ text: content }],
        },
      ];
    }
  }

  // Case 6: Array of objects with json property (another common CMS format)
  if (Array.isArray(content) && content[0]?.json) {
    // Check if json has a children property
    if (content[0].json?.children && Array.isArray(content[0].json.children)) {
      return content[0].json.children;
    }
    return content[0].json;
  }

  // Case 7: Debug object with the structure
  console.log("Could not normalize rich text content. Got:", content);
  return null;
}

/**
 * Apply the normalizeRichTextContent function to cms data that might be in varying formats
 */
export function adaptRichTextFromCMS(data: any): RichTextNode[] | null {
  if (!data) return null;

  // Common CMS format: data.body.json or data.body[0].json
  if (data.body) {
    if (Array.isArray(data.body) && data.body[0]?.json) {
      // Check if json has a children property (YOUR SPECIFIC FORMAT)
      if (
        data.body[0].json?.children &&
        Array.isArray(data.body[0].json.children)
      ) {
        return data.body[0].json.children;
      }
      return normalizeRichTextContent(data.body[0].json);
    }
    if (data.body.json) {
      // Check if json has a children property
      if (data.body.json?.children && Array.isArray(data.body.json.children)) {
        return data.body.json.children;
      }
      return normalizeRichTextContent(data.body.json);
    }
    return normalizeRichTextContent(data.body);
  }

  // Direct content field
  if (data.content) {
    return normalizeRichTextContent(data.content);
  }

  // Raw data may already be in the right format
  return normalizeRichTextContent(data);
}
