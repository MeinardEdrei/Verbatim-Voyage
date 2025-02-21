import { maskEmail2 } from "maskdata";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { IoStatsChartOutline } from "react-icons/io5";
import { PiPuzzlePiece } from "react-icons/pi";

const ProfileModal = ({ session, profileRef, signOut }) => {
  const censoredEmail = maskEmail2(session?.userSession?.email)
  return (
    <div ref={profileRef} 
      className="z-50 absolute right-[1vw] top-[8vh] bg-[var(--background)] p-10 min-w-[20vw] h-[60%] border border-black/30 rounded-lg"
      >
      <div className="text-gray-600 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-8">
          <div className="xl:hidden border-b-2 pb-5 border-b-black/5">
            <Link
              href="/Write"
              className="flex items-center gap-6"
            >
              <PiPuzzlePiece 
                className="text-2xl text-gray-500"
              /> 
              Write
            </Link>
          </div>
          <Link
            href={`/Profile`}
            className="flex items-center gap-7"
          >
            <FaRegUser 
              className="text-xl text-gray-500"
            /> 
            Profile
          </Link>
          <Link
            href="/Stories"
            className="flex items-center gap-7"
          >
            <IoDocumentTextOutline 
              className="text-xl text-gray-500"
            /> 
            Stories
          </Link>
          <Link
            href="/"
            className="flex items-center gap-7"
          >
            <IoStatsChartOutline 
              className="text-xl text-gray-500"
            /> 
            Stats
          </Link>
        </div>

        <div className="border-t-2 pt-5 border-black/5 space-y-1">
          <button onClick={() => signOut()}>Sign out</button>
          <p className="text-sm text-gray-400"
          >
            {censoredEmail}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
