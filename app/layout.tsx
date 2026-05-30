import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

export const metadata: Metadata = {
  title: "Ayush Shah — Frontend Developer",
  description: "Portfolio of Ayush Shah. Make it Last.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      {/* 
        bg-[#0f0f0f] prevents white flash on load. 
        overflow-x-hidden prevents horizontal scroll from GSAP animations.
      */}
      <body
        className="bg-[#0f0f0f] text-white overflow-x-hidden"
        suppressHydrationWarning
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
