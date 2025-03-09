import "./globals.css";
import { UserProvider } from "./context/UserContext";

export const metadata = {
  title: "Bostället 2.0",
  description: "Nya generationens häng",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex justify-center">
          <UserProvider>{children}</UserProvider>
      </body>
    </html>
  );
}
