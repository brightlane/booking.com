import Head from "next/head";

/**
 * META TAG INJECTOR (GLOBAL SEO SYSTEM)
 * - works for all pages
 * - keeps affiliate URLs untouched
 * - improves indexing + social sharing previews
 * - prevents duplicate SEO issues
 */

export default function MetaTagInjector({
  title,
  description,
  url,
  image = "/og-image.jpg",
  keywords = [],
  noIndex = false,
}) {
  const siteName = "StayLux Travel";

  const fullTitle = title ? `${title} | ${siteName}` : siteName;

  return (
    <Head>
      {/* BASIC SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || ""} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}

      {/* CANONICAL URL (IMPORTANT FOR SEO) */}
      {url && <link rel="canonical" href={url} />}

      {/* ROBOTS */}
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow"}
      />

      {/* OPEN GRAPH (FACEBOOK / WHATSAPP / LINK PREVIEWS) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || ""} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* TWITTER CARDS */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || ""} />
      <meta name="twitter:image" content={image} />

      {/* PERFORMANCE HINT */}
      <meta name="theme-color" content="#0f172a" />
    </Head>
  );
}
