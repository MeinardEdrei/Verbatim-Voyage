"use client";

import Link from "next/link";
import { PiPuzzlePiece } from "react-icons/pi";
import SignInModal from "./SignInModal";
import { useEffect, useRef, useState } from "react";
import SignUpModal from "./SignUpModal";

const Header = () => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const signInRef = useRef();
  const signUpRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
        if 
      ( signInRef.current && !signInRef.current.contains(event.target)) {
        setShowSignInModal(false);
      } else if 
      ( signUpRef.current && !signUpRef.current.contains(event.target)) {
        setShowSignUpModal(false);
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
        <button onClick={() => setShowSignUpModal(true)} className="text-white bg-[#313131] px-6 py-3 rounded-full">Get Started</button>
       </div>
      </section>
      {
        showSignInModal && 
        <SignInModal 
          signInRef={signInRef} 
          setShowSignUpModal={setShowSignUpModal}
          onClose={setShowSignInModal}
      />}
      {
        showSignUpModal && 
        <SignUpModal 
          signUpRef={signUpRef} 
          setShowSignInModal={setShowSignInModal}
          onClose={setShowSignUpModal}
        />}
    </div>
  )
}

export default Header
