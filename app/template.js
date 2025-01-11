"use client";

import Header from "./components/Header";

export default function Template({ children }) {
  return (
    <div>
      <main>
        <Header />
      </main>
      {children}
    </div>
  )
}