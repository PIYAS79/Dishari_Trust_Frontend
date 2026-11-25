import type { Metadata } from "next";
import { Hind_Siliguri, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const hind = Hind_Siliguri({
  subsets: ["latin", "bengali"],
  weight: ["400", "500", "700"],
  variable: "--font-hind",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-serif-ns",
});

export const metadata: Metadata = {
  title: "DISHARI Trust - Home",
  description:
    "DISHARI Trust provides residential care, rehabilitation, therapy and skill development for adults with special needs from Bangladesh Army families.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hind.variable} ${serif.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans text-ink bg-ivory antialiased">
        {children}
      </body>
    </html>
  );
}