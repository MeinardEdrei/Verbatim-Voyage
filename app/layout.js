import "./globals.css";

export const metadata = {
  title: "Verbatim Voyage",
  description: "A blog website made by Meinard Edrei",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
