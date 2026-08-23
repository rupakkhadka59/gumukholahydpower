import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import PublicChrome from "@/components/layout/PublicChrome";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Gumu Khola Hydropower",
    default: "Gumu Khola Hydropower | Clean & Renewable Energy",
  },
  icons: {
    icon: "/logo.webp",
  },
  description: "Powering the region with clean, renewable hydropower. Dedicated to environmental responsibility and engineering excellence.",
  keywords: ["Hydropower", "Renewable Energy", "Gumu Khola", "Clean Energy", "Sustainability"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <PublicChrome>{children}</PublicChrome>
      </body>
    </html>
  );
}
