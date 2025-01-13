import SessionProvider from "@/utils/SessionContext";
import "./globals.css";

export const metadata = {
  title: "Verbatim Voyage",
  description: "A blog website made by Meinard Edrei",
  icons: { icon: "/darklogo.svg" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
