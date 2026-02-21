import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Wardhana Flower - Toko Bunga Terbaik di Surabaya",
  description: "Wardhana Flower menyediakan berbagai macam bunga segar, bouquet, bunga papan, standing flower, dan dekorasi bunga untuk berbagai acara di Surabaya. Kualitas premium, desain elegan, dan pengiriman tepat waktu.",
  keywords: "toko bunga surabaya, florist surabaya, bunga bouquet surabaya, bunga papan surabaya, karangan bunga surabaya, dekorasi bunga surabaya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
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
                "addressLocality": "Surabaya",
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
