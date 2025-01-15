import type { Metadata } from "next";

import { geistMono, geistSans } from "@/fonts";
import { LayoutProps } from "@/types/app";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | Computer Repair Shop",
    default: "Computer Repair Shop",
  },
  description: "Dan`s Computer Repair Shop",
  applicationName: "Repair Shop",
  icons: "/favicon/favicon.ico",
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
