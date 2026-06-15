import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./navbar";
import { siteConfig } from "../lib/siteConfig";
import { ThemeProvider } from "./components/ThemeProvider";
import CustomCursor from "./components/CustomCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  alternates: {
    canonical: siteConfig.canonicalUrl,
  },
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    siteName: siteConfig.title,
    images: [siteConfig.image],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.image],
  },
  icons: {
    icon: siteConfig.icon,
    apple: siteConfig.icon,
  },
  verification: {
    google: siteConfig.googleVerification,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  authors: [
    {
      name: siteConfig.author.name,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (!theme) theme = 'dark'; // Hard default to dark
                  
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
        <ThemeProvider>
          <CustomCursor />
          <Navbar />

          {/* Google Analytics */}
          {siteConfig.gaId && (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}`}
                strategy="afterInteractive"
              />
              <Script id="gtag-init" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.gaId}');`}
              </Script>
            </>
          )}

          <main>{children}</main>
        </ThemeProvider>

        {/* Enhanced Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.author.name,
              url: siteConfig.siteUrl,
              description: siteConfig.description,
              image: siteConfig.image,
              jobTitle: siteConfig.author.jobTitle,
              sameAs: siteConfig.author.sameAs,
            }),
          }}
        />
      </body>
    </html>
  );
}
