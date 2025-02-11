import { Geist, Geist_Mono } from "next/font/google";
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
  title: "API PILOT - Test Your APIs Before Building UI",
  description:
    "A powerful API testing tool that helps developers test and debug their APIs with an intuitive interface before building their UI",
  keywords:
    "API testing, REST API, API development, API debugging, HTTP requests, API client",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-black font-serif`}
      >
        <main>{children}</main>
      </body>
    </html>
  );
}
