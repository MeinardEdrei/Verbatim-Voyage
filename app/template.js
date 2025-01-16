"use client";

import { usePathname } from "next/navigation";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Template({ children }) {
  const pathname = usePathname();

  return (
    <div>
      <header className="mb-5">
        <Header />
      </header>
      {children}
      {pathname != "/Home" && pathname != "/Notification" && pathname != "/Profile"
        && pathname != "/Search" && pathname != "/Write" && (
        <footer className="mt-[25vh]">
          <Footer />
        </footer>
      )}
    </div>
  )
}