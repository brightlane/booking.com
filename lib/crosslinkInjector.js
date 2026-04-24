import { pages } from "./pagesIndex";

/**
 * Cross-Link Injector (SEO-safe version)
 * - avoids spam linking
 * - limits links per page
 * - matches titles + keywords
 * - prevents over-optimization penalties
 */

const MAX_LINKS_PER_PAGE = 5;

export function injectCrossLinks(htmlContent, currentSlug = null) {
  if (!htmlContent) return htmlContent;

  let output = htmlContent;
  let linkCount = 0;

  // Remove current page from linking targets
  const linkablePages = pages.filter(p => p.slug !== currentSlug);

  // Prioritize high-value pages first
  const sortedPages = [...linkablePages].sort(
    (a, b) => (b.priority || 0) - (a.priority || 0)
  );

  for (const page of sortedPages) {
    if (linkCount >= MAX_LINKS_PER_PAGE) break;

    const linkHTML = createLink(page);

    // 1. Try exact title match first
    const titleRegex = new RegExp(`\\b${escapeRegex(page.title)}\\b`, "i");

    if (titleRegex.test(output)) {
      output = output.replace(titleRegex, linkHTML);
      linkCount++;
      continue;
    }

    // 2. Try keyword matches
    if (page.keywords && page.keywords.length) {
      for (const keyword of page.keywords) {
        if (linkCount >= MAX_LINKS_PER_PAGE) break;

        const keywordRegex = new RegExp(`\\b${escapeRegex(keyword)}\\b`, "i");

        if (keywordRegex.test(output)) {
          output = output.replace(keywordRegex, linkHTML);
          linkCount++;
          break;
        }
      }
    }
  }

  return output;
}

/**
 * Creates internal link HTML
 */
function createLink(page) {
  return `<a href="/blog/${page.slug}" class="internal-link" data-slug="${page.slug}">
    ${page.title}
  </a>`;
}

/**
 * Prevent regex injection / breaking content
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
