import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  applicationName: site.name,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    images: [site.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    site: "@solixdb",
    title: site.title,
    description: site.description,
    images: [site.ogImage],
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: site.name,
  url: site.url,
  description: site.description,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
  sameAs: Object.values(site.links),
};

export const llmsTxt = `# ${site.name}

> ${site.description}

- Website: ${site.url}
- GitHub: ${site.links.github}
- X: ${site.links.x}
- Discord: ${site.links.discord}
`;
