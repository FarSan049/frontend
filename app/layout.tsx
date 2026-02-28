import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import favicon from "./lib/favicon.png"; // import favicon.png

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wardhanaflower.com"),
  title: {
    default: "Wardhana Flower - Toko Bunga & Rental Tanaman",
    template: "%s | Wardhana Flower",
  },
  description: "Wardhana Flower menyediakan bunga segar premium dan layanan rental tanaman hias profesional untuk kantor & event. Kualitas terbaik, pengiriman cepat.",
  keywords: ["toko bunga", "florist", "rental tanaman", "sewa tanaman hias", "karangan bunga"],
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
    title: "Wardhana Flower - Toko Bunga & Rental Tanaman",
    description: "Bunga segar premium dan rental tanaman hias profesional.",
    url: "https://wardhanaflower.com",
    siteName: "Wardhana Flower",
    images: [
      {
        url: "/images/favicon.png",
        width: 1200,
        height: 630,
        alt: "Wardhana Flower",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wardhana Flower - Toko Bunga & Rental Tanaman",
    description: "Bunga segar premium dan rental tanaman hias profesional.",
    images: ["/images/wf.png"],
  },
  icons: {
    icon: favicon.src,
    apple: favicon.src,
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
              "image": "https://wardhanaflower.com/images/wf.png",
              "@id": "https://wardhanaflower.com",
              "url": "https://wardhanaflower.com",
              "telephone": "+6281288339325",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Raya Parung Ciputat, Serua, Bojongsari, Kota Depok, Jawa Barat",
                "addressLocality": "Depok",
                "postalCode": "16517",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -6.3500,
                "longitude": 106.7833
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
