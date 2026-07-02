import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar/Navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MyApp",
  description: "MyApp for movies and shows",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("min-h-screen", "h-full", "antialiased", "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />

          {children}

          <Toaster
            position="top-center"
            expand={false}
            richColors={false}
            toastOptions={{
              classNames: {
                toast: "!bg-background !text-foreground !border-border !gap-3 !p-4 !rounded-xl",
                title: "!text-sm !font-semibold !tracking-tight",
                description: "!text-xs !text-muted-foreground",
                actionButton:
                  "!bg-primary !text-primary-foreground !text-xs !font-medium !px-3 !py-1.5 !rounded-md hover:!bg-primary/90 !transition-colors",
                error:
                  "[&_[data-title]]:!text-destructive [&_[data-description]]:!text-destructive/90 [&_[data-icon]]:!text-destructive",
              },
            }}
          />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
