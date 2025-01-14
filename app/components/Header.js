"use client";

import Link from "next/link";
import { PiPuzzlePiece } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import SignInModal from "./SignInModal";
import { useEffect, useRef, useState } from "react";
import SignUpModal from "./SignUpModal";
import { useUserSession } from "@/app/utils/SessionContext";
import { redirect } from "next/navigation";
import Image from "next/image";
import { signOut } from "next-auth/react";
import ProfileModal from "./ProfileModal";

const Header = () => {
  const session = useUserSession();
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const signInRef = useRef();
  const signUpRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (signInRef.current && !signInRef.current.contains(event.target)) {
        setShowSignInModal(false);
      } else if (
        signUpRef.current &&
        !signUpRef.current.contains(event.target)
      ) {
        setShowSignUpModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div>
      <section className="flex justify-between">
        <div>
          <h1 className="text-3xl">Verbatim Voyage</h1>
        </div>
        <div className="space-x-2 flex items-center">
          <button
            onClick={() => {
              session ? redirect("/") : showSignInModal(true);
            }}
            className="mr-5 inline-flex items-center justify-center"
          >
            <PiPuzzlePiece className="mr-2 text-2xl" />
            Write
          </button>
          {session?.userSession?.user ? (
            <>
              <div className="flex items-center gap-5">
                <button>
                  <IoIosNotificationsOutline className="text-3xl" />
                </button>
                <button onClick={() => setShowProfileModal(true)}>
                  <Image
                    src={session.userSession?.user?.image || "/darklogo.svg"}
                    alt={session.userSession?.user?.name || "User"}
                    width={40}
                    height={40}
                    className={
                      session.userSession?.user?.image
                        ? "rounded-full"
                        : "bg-gray animate-pulse rounded-full"
                    }
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowSignInModal(true)}
                className="border border-black px-6 py-3 rounded-full"
              >
                Sign in
              </button>
              <button
                onClick={() => setShowSignUpModal(true)}
                className="text-white bg-[#313131] px-6 py-3 rounded-full"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </section>
      {showProfileModal && (
        <ProfileModal
          profileRef={profileRef}
          session={session}
          signOut={handleSignOut}
          onClose={setShowProfileModal}
        />
      )}
      {showSignInModal && (
        <SignInModal
          signInRef={signInRef}
          setShowSignUpModal={setShowSignUpModal}
          onClose={setShowSignInModal}
        />
      )}
      {showSignUpModal && (
        <SignUpModal
          signUpRef={signUpRef}
          setShowSignInModal={setShowSignInModal}
          onClose={setShowSignUpModal}
        />
      )}
    </div>
  );
};

export default Header;
