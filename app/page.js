import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { IoIosArrowDropright } from "react-icons/io";

const stories = [
  {
    id: 1,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 2,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 3,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 4,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 5,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 6,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 7,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 8,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 9,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  }
]

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

        <div className="grid grid-cols-3 gap-4 mt-5">
          { 
            stories.map((story) => (
              <div key={story.id} className="flex flex-col">
                <Image 
                  src={story.image}
                  alt="Placeholder"
                  width={300} 
                  height={200}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="mt-3 ml-2 mr-2">
                  <p className="text-[var(--published-date)] text-base mb-2">{story.uploaded}</p>
                  <h3>{story.title}</h3>
                  <span>{story.content}</span>
                </div>
                <div className="flex items-center mt-3 ml-2">
                  <Avatar>
                    <AvatarImage src={story.avatar} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h2 className="font-bold ml-3">{story.name}</h2>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  );
}
