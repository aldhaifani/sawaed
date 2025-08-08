import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { LenisProvider } from "@/providers/lenis-provider";
import { I18nProvider } from "@/providers/i18n-provider";

export const metadata: Metadata = {
  title: "Sawaed",
  description: "Sawaed - Your companion to success.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <I18nProvider>
          <LenisProvider>{children}</LenisProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
