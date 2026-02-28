import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://wardhanaflower.com"),
  title: {
    default: "Wardhana Flower - Toko Bunga & Rental Tanaman Depok",
    template: "%s | Wardhana Flower",
  },
  description: "Wardhana Flower menyediakan bunga segar premium dan layanan rental tanaman hias profesional untuk kantor & event di Depok. Kualitas terbaik, pengiriman cepat.",
  keywords: ["toko bunga depok", "florist depok", "rental tanaman depok", "sewa tanaman hias", "karangan bunga depok"],
  authors: [{ name: "Wardhana Flower" }],
  creator: "Wardhana Flower",
  publisher: "Wardhana Flower",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Wardhana Flower - Toko Bunga & Rental Tanaman Depok",
    description: "Bunga segar premium dan rental tanaman hias profesional di Depok.",
    url: "https://wardhanaflower.com",
    siteName: "Wardhana Flower",
    images: [
      {
        url: "/images/wf.png",
        width: 1200,
        height: 630,
        alt: "Wardhana Flower Depok",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wardhana Flower - Toko Bunga & Rental Tanaman Depok",
    description: "Bunga segar premium dan rental tanaman hias profesional di Depok.",
    images: ["/images/wf.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/wf.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <meta name="google-site-verification" content="gve1ARrosoR6XE4BhMIUALxuldc2ismxgPVzfZmLC8I" />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Wardhana Flower",
              "image": "https://wardhanaflower.com/logo.png",
              "@id": "https://wardhanaflower.com",
              "url": "https://wardhanaflower.com",
              "telephone": "+628123456789",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Kayoon No. 1",
                "addressLocality": "Depok",
                "postalCode": "60271",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -7.2655,
                "longitude": 112.7483
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "sameAs": [
                "https://www.facebook.com/wardhanaflower",
                "https://www.instagram.com/wardhanaflower"
              ]
            }),
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
