"use client";

import Link from "next/link";
import { PiPuzzlePiece } from "react-icons/pi";
import SignInModal from "./SignInModal";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const signInRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (signInRef.current && !signInRef.current.contains(event.target)) {
        setShowSignInModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <button onClick={() => setShowSignInModal(true)} className="border border-black px-6 py-3 rounded-full">Sign in</button>
        <Link href="/" className="text-white bg-[#313131] px-6 py-3 rounded-full">Get Started</Link>
       </div>
      </section>
      {showSignInModal && <SignInModal signInRef={signInRef} />}
    </div>
  )
}

export default Header
