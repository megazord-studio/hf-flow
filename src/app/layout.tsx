import {ThemeProvider} from "@/app/components/theme-provider";
import React from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "HF Flow",
  description: "Create HF model flows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
