import DOMPurify from "dompurify";

/**
 * Sanitize WordPress excerpt/content and return clean plain text
 *
 * @param {string} html - HTML string from WP REST API
 * @returns {string} clean text
 */
export function sanitizeExcerpt(html = "") {
  if (!html) return "";

  // 1. Remove all HTML tags safely
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });

  // 2. Decode HTML entities (&nbsp;, &amp;, etc.)
  const textarea = document.createElement("textarea");
  textarea.innerHTML = sanitized;
  let decoded = textarea.value;

  // 3. Normalize whitespace (important for Urdu content)
  decoded = decoded.replace(/\s+/g, " ").trim();

  return decoded;
}
export default sanitizeExcerpt;