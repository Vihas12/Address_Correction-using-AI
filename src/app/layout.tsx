import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/component/footer";
import Navbar from "@/component/navbar";
import KindeWrapper from "./KindeWrapper"; // ✅ important

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Adder",
  description: "AI Adder, is an intelligent address completion tool powered by AI. It streamlines the process of filling out address forms by accurately predicting and auto-completing address fields using machine learning models trained on user data. This tool enhances user experience by providing fast and precise form-filling capabilities, making it especially useful for developers and users looking for efficient data entry solutions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <KindeWrapper>
          <Navbar />
          {children}
          <Footer />
        </KindeWrapper>
      </body>
    </html>
  );
}
