import {
  getSiteUrl,
  SITE_ADDRESS,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_NAME_AMPERSAND,
  SITE_PHONE_E164,
} from "@/app/lib/site-config";

/**
 * Organization + WebSite structured data for the homepage.
 * Helps search engines understand the brand (including alternate spellings).
 */
export default function OrganizationJsonLd() {
  const url = getSiteUrl();
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DryCleaningOrLaundry",
        "@id": `${url}/#business`,
        name: SITE_NAME,
        alternateName: [
          SITE_NAME_AMPERSAND,
          "washandwow",
          "Wash and wow",
          "Wash and Wow laundry",
        ],
        url,
        image: `${url}/opengraph-image`,
        telephone: SITE_PHONE_E164,
        email: SITE_EMAIL,
        address: {
          "@type": "PostalAddress",
          streetAddress: SITE_ADDRESS,
          addressCountry: "IN",
        },
        areaServed: { "@type": "Country", name: "India" },
        description: SITE_DESCRIPTION,
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: SITE_NAME,
        alternateName: [SITE_NAME_AMPERSAND, "washandwow"],
        publisher: { "@id": `${url}/#business` },
        inLanguage: "en-IN",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
