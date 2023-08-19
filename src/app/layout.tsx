import Wrapper from "@/components/Wrapper";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social App",
  description: "Assignment for surge global",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn("w-screen h-auto", inter.className)}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
