// ============================================================
// Lightweight HTML sanitizer (no dependencies)
// ============================================================
// Suitable for trusted-ish rich text like Shopify product descriptions.
// Strips <script>/<style>, event handlers (onclick=...), and dangerous
// URL schemes (javascript:, data:) to prevent stored XSS.

// Tags that are removed entirely, including their content.
const BLOCKED_TAGS = /<(script|style|iframe|object|embed|link|meta|base|form)[\s\S]*?<\/\1\s*>/gi;
// Self-closing / unclosed variants of the same dangerous tags.
const BLOCKED_TAGS_SELF = /<\/?(script|style|iframe|object|embed|link|meta|base|form)\b[^>]*>/gi;
// Inline event handlers: onclick="...", onmouseover='...', onload=... .
const EVENT_HANDLERS = /\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
// Dangerous URL schemes inside href/src.
const DANGEROUS_URI = /(href|src|xlink:href)\s*=\s*("|')?\s*(javascript|data|vbscript):[^"'>\s]*/gi;

export function sanitizeHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(BLOCKED_TAGS, '')
    .replace(BLOCKED_TAGS_SELF, '')
    .replace(EVENT_HANDLERS, '')
    .replace(DANGEROUS_URI, '$1=""');
}
