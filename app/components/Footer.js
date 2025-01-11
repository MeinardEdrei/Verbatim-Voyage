import Link from "next/link"
import { MdArrowOutward } from "react-icons/md";

const Footer = () => {
  return (
    <div className="m-4">
      <div className="flex flex-col border border-black/30 rounded-2xl px-10 py-5">
        <div className="flex justify-between">
          <h1 className="text-3xl">Verbatim Voyage</h1>
          <Link href="/" className="border border-black p-4 rounded-full flex items-center">
            Made by Meinard Edrei S.&nbsp;
            <MdArrowOutward className="text-2xl"/>
          </Link>
        </div>
        <div>
          <p className="text-[#747474] font-light">@2025 Verbatim Voyage. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
