import { Geist, Geist_Mono } from "next/font/google";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileBottomNav from "../components/MobileBottomNav/MobileBottomNav";
import Providers from "../components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "sevilla - Premium Kitchen Appliances",
  description: "Top quality kitchen chimneys, induction cookers, gas stoves, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-800 pb-16 md:pb-0`}
      >
        <Providers>
          <Header />
          <main className="min-h-screen flex flex-col bg-white">
            {children}
          </main>
          <MobileBottomNav />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
