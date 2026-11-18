import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "L'BURN — Mon espace",
  description: "Retrouver où on en est dans son parcours, à son rythme.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <footer className={styles.piedDePage}>
          <p className={styles.logo}>Femmes En Équilibre</p>
          <p className={styles.signature}>Soutenir · Accompagner · Rebondir</p>
        </footer>
      </body>
    </html>
  );
}
