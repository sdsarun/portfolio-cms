import "./globals.css";

// core
import type { Metadata } from "next";

// components
import { Providers } from "@/shared/providers/providers";
import { WebVitals } from "@/shared/analytics/web-vitals/web-vitals";

// configs
import { NotoSans, NotoSansMono } from "@/shared/constants/fonts";

export const metadata: Metadata = {
  title: "sdsarun | portfolio-cms",
  description: "You dont have permission to access this"
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${NotoSans.variable} ${NotoSansMono.variable}`}>
      <body className={`antialiased sm:subpixel-antialiased`}>
        <Providers>{children}</Providers>
        <WebVitals />
      </body>
    </html>
  );
}
