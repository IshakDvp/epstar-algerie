import type { Metadata } from "next";
import { Alexandria, Manrope, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import JourneyNav from "./components/journey-nav";
import "./refinement.css";
import {headers} from "next/headers";
import {publicContentContext} from "../worker/public-content-context";
import ContentProvider from "./components/content-provider";
import {defaultContact} from "./content-model";
import {builtinPages} from "./page-registry";
import ThemeProvider from "./components/theme-provider";
import {themeBootstrap} from "./theme-bootstrap";
import {homeAnchorBootstrap} from "./home-anchor-bootstrap";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const alexandria = Alexandria({
  variable: "--font-alexandria",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-noto-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "EPSTAR Algérie | Agencement et mobilier sur mesure",
  description: "Conception, fabrication et installation sur mesure pour pharmacies, bureaux, commerces et chambres en Algérie.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Request-scoped published data, shared by SSR and hydration. No mutable cache.
  const requestHeaders=await headers();
  const initialTheme=/(?:^|;\s*)epstar-theme=dark(?:;|$)/.test(requestHeaders.get("cookie")||"")?"dark":"light";
  const languageCookie=(requestHeaders.get("cookie")||"").match(/(?:^|;\s*)epstar-language=(ar|en|fr)(?:;|$)/)?.[1];
  const initialLang=languageCookie==="ar"?"ar":languageCookie==="en"?"en":"fr";
  const content=publicContentContext.getStore()??{contact:defaultContact,offers:[],pages:builtinPages};
  return (
    <html lang={initialLang} dir={initialLang==="ar"?"rtl":"ltr"} data-theme={initialTheme} suppressHydrationWarning>
      <head><style>{`html[data-theme="dark"],html[data-theme="dark"] body{background:#0b1418;color:#edf1f2}html[data-theme-pending] body{visibility:hidden}`}</style><script dangerouslySetInnerHTML={{__html:themeBootstrap+homeAnchorBootstrap}}/></head>
      <body
        className={`${manrope.variable} ${alexandria.variable} ${notoArabic.variable} antialiased`}
      >
        <ThemeProvider initialTheme={initialTheme} initialLang={initialLang}><ContentProvider value={content}><JourneyNav/>{children}</ContentProvider></ThemeProvider>
      </body>
    </html>
  );
}
