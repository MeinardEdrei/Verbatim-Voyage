"use client";

import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Template({ children }) {
  return (
    <div>
      <header className="mb-5">
        <Header />
      </header>
      {children}
      <footer className="mt-[25vh]">
        <Footer />
      </footer>
    </div>
  )
}