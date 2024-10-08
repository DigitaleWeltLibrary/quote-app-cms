import { Inter } from "next/font/google";
import "../scss/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Geschützter Bereich",
  description: "Das ist ein geschützer Bereich.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
