import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = "https://linyu-portfolio-mvp.montesrratvjkyu1314.chatgpt.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "codeJokerYang · Developer Portfolio",
  description: "codeJokerYang 的公开开发者作品集，展示 Java 全栈、AI Agent、多端应用与 GitHub 项目。",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "codeJokerYang · Developer Portfolio",
    description: "Java 全栈、AI Agent 与多端应用实践。",
    url: siteUrl,
    siteName: "codeJokerYang Portfolio",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og-codejokeryang.png", width: 1536, height: 1024, alt: "codeJokerYang developer portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "codeJokerYang · Developer Portfolio",
    description: "Java 全栈、AI Agent 与多端应用实践。",
    images: ["/og-codejokeryang.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body></html>;
}
