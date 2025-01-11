import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


import { IoIosArrowDropright } from "react-icons/io";

export default function Home() {
  return (
    <div>
      {/* Highlights */}
      <section>
        <div className="grid grid-cols-[3fr_1fr] gap-4">
          <div className="h-[100%]">
            <div className="relative">
              <Image 
                src="https://placehold.co/300x200"
                alt="Placeholder"
                width={300}
                height={200}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute z-10 bottom-20 left-10">
                <div className="relative mb-5">
                  <p className="">Hopeful</p>
                  <h2 className="font-bold text-3xl">Lorem Ipsum Lorem Ipsum</h2>
                </div>
                <Link href="/" className="bg-[var(--background)] px-6 py-3 rounded-full inline-flex items-center">
                  Read this story
                  <IoIosArrowDropright className="ml-3 text-xl"/>
                </Link>
              </div>
            </div>
          </div>
          <div className="grid grid-rows-2 gap-4 h-[100%]">
            <div className="relative">
              <Image 
                src="https://placehold.co/300x200"
                alt="Placeholder"
                width={300} 
                height={200}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute z-10 bottom-10 left-10">
                <div className="relative mb-5">
                  <p className="text-sm">Hopeful</p>
                  <h2 className="font-bold text-xl">Lorem Ipsum Lorem Ipsum</h2>
                </div>
                <Link href="/" className="bg-[var(--background)] text-sm px-5 py-2 rounded-full inline-flex items-center">
                  Read this story
                  <IoIosArrowDropright className="ml-3 text-xl"/>
                </Link>
              </div>
            </div>
            <div className="relative">
              <Image 
                src="https://placehold.co/300x200"
                alt="Placeholder"
                width={300} 
                height={200}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute z-10 bottom-10 left-10">
                <div className="relative mb-5">
                  <p className="text-sm">Hopeful</p>
                  <h2 className="font-bold text-xl">Lorem Ipsum Lorem Ipsum</h2>
                </div>
                <Link href="/" className="bg-[var(--background)] text-sm px-5 py-2 rounded-full inline-flex items-center">
                  Read this story
                  <IoIosArrowDropright className="ml-3 text-xl"/>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Stories */}
      <section className="m-4 mt-10">
        <div>
          <div className="">
            <h1 className="text-3xl">Stories that might be for you.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
          </div>
          <div className="flex mt-5 justify-between items-center">
            <div className="space-x-5">
              <button className="bg-[var(--button-selected)] px-7 py-2 font-semibold rounded-full">All</button>
              <button className="px-7 py-2 rounded-full">Fun and Exciting</button>
              <button className="px-7 py-2 rounded-full">Cooking</button>
              <button className="px-7 py-2 rounded-full">Drawing</button>
              <button className="px-7 py-2 rounded-full">Lifestyle</button>
              <button className="px-7 py-2 rounded-full">Chat</button>
              <button className="px-7 py-2 rounded-full">Games</button>
            </div>
            <div className="flex items-center">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Newest</SelectItem>
                  <SelectItem value="dark">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
