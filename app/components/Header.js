"use client";

import Link from "next/link";
import { PiPuzzlePiece } from "react-icons/pi";

const Header = () => {
  return (
    <div>
      <section className="flex justify-between">
       <div>
        <h1 className="text-3xl">Verbatim Voyage</h1>
       </div>
       <div className="space-x-2 flex items-center">
        <Link href="/" className="mr-5 inline-flex items-center justify-center">
          <PiPuzzlePiece className="mr-2 text-2xl" />
          Write
        </Link>
        <Link href="/" className="border border-black px-6 py-3 rounded-full">Sign in</Link>
        <Link href="/" className="text-white bg-[#313131] px-6 py-3 rounded-full">Get Started</Link>
       </div>
      </section>
    </div>
  )
}

export default Header
