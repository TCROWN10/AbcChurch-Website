import 'server-only';
import sanitizeHtml from 'sanitize-html';

/** Allow-list for admin-authored rich text (devotionals, sermons). */
export function sanitizeRichText(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'blockquote', 'h2', 'h3', 'h4',
      'ul', 'ol', 'li', 'a', 'hr', 'span', 'div', 'img', 'figure', 'figcaption',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesAppliedToAttributes: ['href', 'src'],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
    },
  });
}
