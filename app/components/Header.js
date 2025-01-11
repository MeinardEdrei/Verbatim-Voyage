"use client";

import Link from "next/link";

const Header = () => {
  return (
    <div>
      <section className="flex justify-between">
       <div>
        <h1>Verbatim Voyage</h1>
       </div>
       <div>
        <Link href="/">Write</Link>
        <Link href="/">Sign in</Link>
        <Link href="/">Get Started</Link>
       </div>
      </section>
    </div>
  )
}

export default Header
