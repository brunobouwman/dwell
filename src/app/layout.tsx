import Header from "@/components/Header/Header";
import Providers from "@/components/Providers/Providers";
import "./globals.css";

export const metadata = {
  title: "dWell",
  description: "Decentralized Wellness",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <section className="pt-20 h-full w-full">{children}</section>
        </Providers>
      </body>
    </html>
  );
}
