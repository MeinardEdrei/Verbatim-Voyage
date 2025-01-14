"use client";

import Link from "next/link";
import { PiPuzzlePiece } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
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
      } else if (profileRef.current && !profileRef.current.contains(event.target)){
        setShowProfileModal(false);
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

  const Write = () => {
    return (<>
      {/* Write button */}
      <button
        onClick={() => {
          session?.userStatus === "authenticated" ? redirect("/") : showSignInModal(true);
        }}
        className="inline-flex items-center text-gray-700 hover:text-black ease-in-out duration-200"
      >
        <PiPuzzlePiece className="mr-2 text-2xl" />
        Write
      </button>
    </>)
  }

  return (
    <div>
      <section className="flex justify-between">
        <div className="flex justify-center items-center gap-5">
          <h1 className="text-3xl">Verbatim Voyage</h1>
          <div className="group flex items-center bg-[#f1f1f1] px-4 py-2 rounded-full text-base outline-none focus-within:ease-in-out focus-within:duration-200">
            <CiSearch className="mr-4 text-2xl text-gray-500 group-focus-within:text-black" />
            <input 
              className="bg-transparent outline-none text-sm"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="space-x-2 flex items-center">
          {session?.userStatus === "authenticated" ? (<>
            <Write />
            <div className="flex items-center gap-4">
              {/* Notification button */}
              <button>
                <IoIosNotificationsOutline className="text-[1.8vw] ml-3 text-gray-700 hover:text-black ease-in-out duration-200" />
              </button>
              {/* Profile button */}
              <button onClick={() => setShowProfileModal(true)}>
                <Image
                  src={session.userSession?.user?.image || "/darklogo.svg"}
                  alt={session.userSession?.user?.name || "User"}
                  width={35}
                  height={35}
                  className={
                    session.userSession?.user?.image
                      ? "rounded-full"
                      : "bg-gray animate-pulse rounded-full"
                  }
                />
              </button>
            </div>
          </>) : session?.userStatus === "unauthenticated" ? (<>
            {/* Uauthenticated user buttons */}
            <Write />
            <button
              onClick={() => setShowSignInModal(true)}
              className="ml-5 border border-black px-6 py-3 rounded-full"
            >
              Sign in
            </button>
            <button
              onClick={() => setShowSignUpModal(true)}
              className="text-white bg-[#313131] px-6 py-3 rounded-full"
            >
              Get Started
            </button>
          </>) : null}
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
