import "../globals.css";

import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";
import PortableText from "./portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { ThemeProvider } from "next-themes";
import Header from "@/app/components/Header";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || demo.title;
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await sanityFetch({ query: settingsQuery });
  const footer = data?.footer || [];
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en" className={`${inter.variable} `}>
      <body className="bg-light-background text-light-primary dark:bg-dark-background dark:text-dark-primary">
        <ThemeProvider attribute="class">
          <section className="min-h-screen">
            <Header />
            {isDraftMode && <AlertBanner />}
            <main>{children}</main>
            <footer className="flex flex-col items-center">
              <div className="container mx-auto px-5">
                {footer.length > 0 ? (
                  <PortableText
                    className="prose-sm text-pretty bottom-0 w-full max-w-non py-12 text-center md:py-20"
                    value={footer as PortableTextBlock[]}
                  />
                ) : (
                  <div className="flex flex-col items-center py-28 lg:flex-row">
                    <h3 className="mb-10 text-center text-4xl font-bold leading-tight tracking-tighter lg:mb-0 lg:w-1/2 lg:pr-4 lg:text-left lg:text-5xl">
                      Built with Next.js.
                    </h3>
                  </div>
                )}
              </div>
            </footer>
          </section>
          {isDraftMode && <VisualEditing />}
        </ThemeProvider>
      </body>
    </html>
  );
}
