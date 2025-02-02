"use client";

import { usePathname } from "next/navigation";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    <div>
      {pathname != "/Write" && (
        <header className="mb-5">
          <Header />
        </header>
      )}
      {children}
      {pathname === "/" && (
          <footer className="mt-[15vh]">
            <Footer />
          </footer>
        )}
    </div>
  )
}