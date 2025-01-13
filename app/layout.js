import Provider from "@/lib/provider";
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
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
