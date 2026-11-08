import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { jsonLd, metadata as seoMetadata } from "@/config/seo";
import "./globals.css";

export const metadata = seoMetadata;

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <body className={`${poppins.className} bg-ink text-white antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
