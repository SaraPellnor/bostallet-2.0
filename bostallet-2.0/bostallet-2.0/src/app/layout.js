import "./globals.css";

export const metadata = {
  title: "Bostället 2.0",
  description: "Nya generationens häng",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex justify-center">
        {children}
      </body>
    </html>
  );
}
