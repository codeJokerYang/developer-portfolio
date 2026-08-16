import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://linyu-portfolio-mvp.montesrratvjkyu1314.chatgpt.site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3f4ef",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "codeJokerYang · Developer Portfolio",
  description: "codeJokerYang 的公开开发者作品集，展示 Java 全栈、AI Agent、多端应用与 GitHub 项目。",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
  openGraph: {
    title: "codeJokerYang · Developer Portfolio",
    description: "Java 全栈、AI Agent 与多端应用实践。",
    url: siteUrl,
    siteName: "codeJokerYang Portfolio",
    locale: "zh_CN",
    type: "website",
    images: [{ url: "/og-codejokeryang.webp", width: 1536, height: 1024, alt: "codeJokerYang developer portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "codeJokerYang · Developer Portfolio",
    description: "Java 全栈、AI Agent 与多端应用实践。",
    images: ["/og-codejokeryang.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
