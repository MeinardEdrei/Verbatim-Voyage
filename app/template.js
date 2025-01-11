"use client";

import Header from "./components/header";

export default function Template({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}