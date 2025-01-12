"use client";

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

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { IoIosArrowDropright } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

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
  },
  {
    id: 10,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 11,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 12,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 13,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 14,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 15,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 16,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 17,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 18,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 19,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 20,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 21,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 22,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 23,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 24,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 25,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 26,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 27,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 28,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 29,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 30,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 31,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 32,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 33,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 34,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 35,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 36,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 37,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 38,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 39,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 40,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 41,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 42,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 43,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 44,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 45,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 46,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 47,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 48,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 49,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
  {
    id: 50,
    name: "John Doe",
    title: "Fashion Forward, Tech Savvy: My Lifestyle Fusion",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image: "https://placehold.co/300x200",
    avatar: "https://github.com/shadcn.png",
    uploaded: "Aug 26, 2024",
  },
]

const categories = [
  {
    id: 1,
    category: "Fun and Exciting",
  },
  {
    id: 2,
    category: "Cooking",
  },
  {
    id: 3,
    category: "Drawing",
  },
  {
    id: 4,
    category: "Lifestyle",
  },
  {
    id: 5,
    category: "Chat",
  },
  {
    id: 6,
    category: "Games",
  },
  {
    id: 7,
    category: "Life",
  },
  {
    id: 8,
    category: "Nature",
  }
]

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 9;

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const currentStories = stories.slice(indexOfFirstStory, indexOfLastStory);

  const totalPages = Math.ceil(stories.length / storiesPerPage);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      setMaxScroll(container.scrollWidth - container.clientWidth);
    }
  }, []);

  const slideRight = () => {
    const newPosition = scrollPosition + containerRef.current.children[0].offsetWidth;
    if (newPosition <= maxScroll) {
      setScrollPosition(newPosition);
    } else {
      setScrollPosition(maxScroll); // Stop at the end
    }
  };

  const slideLeft = () => {
    const newPosition = scrollPosition - containerRef.current.children[0].offsetWidth;
    if (newPosition >= 0) {
      setScrollPosition(newPosition);
    } else {
      setScrollPosition(0); // Stop at the start
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (index) => {
    setCurrentPage(index);
  }

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
      <section className="m-4 mt-10 relative">
        <div>
          <div className="">
            <h1 className="text-3xl">Stories that might be for you.</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
          </div>

          {/* Categories */}
          <div className="flex mt-5 items-center">
            { scrollPosition != 0 && (
              <button
                onClick={slideLeft}
                className="absolute ml-2 bg-gray-200 p-2 rounded-full z-10"
              >
                <IoIosArrowBack />
              </button>
            )}

            {/* Category Items */}
            <div className="w-[70%] overflow-hidden">
              <div ref={containerRef} className="flex gap-10"
                style={{ transform: `translateX(-${scrollPosition}px)`, transition: "transform 0.3s ease" }}
              >
                <button className={`px-7 py-2 rounded-full whitespace-nowrap ${
                    activeCategory === "All" ? "bg-[var(--button-selected)] font-semibold" : "bg-transparent"
                  }`}
                  onClick={() => setActiveCategory("All")}
                >
                  All
                </button>
                {
                  categories.map((item) => (
                    <button key={item.id} className={`px-7 py-2 rounded-full whitespace-nowrap ${
                      activeCategory === item.category ? "bg-[var(--button-selected)] font-semibold" : "bg-transparent"
                    }`}
                    onClick={() => setActiveCategory(item.category)}
                  >
                    {item.category}
                  </button>
                  ))
                }
              </div>
            </div>
            
            { scrollPosition != maxScroll && (
              <button
                onClick={slideRight}
                className="absolute ml-2 right-[26%] bg-gray-200 p-2 rounded-full z-10"
              >
                <IoIosArrowForward />
              </button>
            )}

            {/* Sort button */}
            <div className="ml-auto">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Newest">Newest</SelectItem>
                  <SelectItem value="Oldest">Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">
          { 
            currentStories.map((story) => (
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
        <div className="mt-[10vh]">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrevPage();
                  }}
                />
              </PaginationItem>
              {[...Array(totalPages).keys()]
              .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage))
                .map((index) => {
                const pageNumber = index + 1;
                return (
                <PaginationItem key={index}>
                  <PaginationLink
                    className="cursor-default"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
                )
              })}
              { 
                ((totalPages > 1) && (currentPage < totalPages)) && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              }
              <PaginationItem>
                <PaginationNext 
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNextPage();
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    </div>
  );
}
