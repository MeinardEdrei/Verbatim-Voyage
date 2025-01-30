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
import CategorySlider from "./components/CategorySlider";
import useTopStories from "./utils/TopStories";
import { fetchStories } from "@/services/stories";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const sliderRightButton = 30;
  const sliderWidth = 70;

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 9;

  const indexOfLastStory = currentPage * storiesPerPage;
  const indexOfFirstStory = indexOfLastStory - storiesPerPage;
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentStories, setCurrentStories] = useState(stories.slice(indexOfFirstStory, indexOfLastStory));
  const topStories = useTopStories(stories, 3);

  const [totalPages, setTotalPages] = useState(Math.ceil(stories.length / storiesPerPage));

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchStories();

      if (response.status === 200) {
        setStories(response.data);
      } else {
        console.error(response.message);
      }
    }

    fetch();
  }, [])

  useEffect(() => {
    const popularCategories = topStories.flatMap((story) => story.tags.slice(0, 4))
    setCategories([...new Set(popularCategories)])
  }, [topStories])

  // Stories category filter
  useEffect(() => {
    let filteredStories;
    
    if (activeCategory === "All") {
      filteredStories = stories;
    } else {
      filteredStories = stories.filter((a) => a.tags === activeCategory);
    }

    setTotalPages(Math.ceil(filteredStories.length / storiesPerPage));

    setCurrentStories(filteredStories.slice(indexOfFirstStory, indexOfLastStory));
  }, [activeCategory, stories, currentPage]);

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

  const handleSortButton = (value) => {
    setSortBy(value)

    const sortedStories = 
      currentStories.sort((a, b) => {
        return value === "Newest" 
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
    
    setCurrentStories(sortedStories);
  }

  return (
    <div>
      {/* Highlights */}
      <section>
        <div className="grid xl:grid-cols-[3fr_1fr] gap-4">
          {/* Main Highlight */}
          {topStories.length > 0 ? (
            <>
            <div className="h-[100%]">
              <div className="relative group">
                <Image 
                  src={topStories[0].image}
                  alt={topStories[0].title}
                  width={300}
                  height={200}
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition-all rounded-2xl"></div>
                <div className="absolute z-10 bottom-7 xl:bottom-20 left-10">
                  <div className="relative mb-3 xl:mb-5">
                    <p className="text-xs xl:text-sm text-white">{topStories[0].tags[0]}</p>
                    <h2 className="font-bold xl:text-3xl text-white">{topStories[0].title}</h2>
                  </div>
                  <Link href={`/${topStories[0]._id}`} className="group-hover:bg-gray-100 transition bg-[var(--background)] text-sm px-3 py-2 xl:text-base xl:px-6 xl:py-3 rounded-full inline-flex items-center">
                    Read this story
                    <IoIosArrowDropright className="ml-2 xl:ml-3 text-lg xl:text-xl"/>
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid-rows-2 gap-4 h-[100%] xl:grid hidden">
              {topStories.slice(1, 3).map((story) => (
                <div key={story._id} className="relative group">
                  <Image 
                    src={story.image}
                    alt={story.title}
                    width={300} 
                    height={200}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition-all rounded-2xl"></div>
                  <div className="absolute z-10 bottom-10 left-10 w-[80%]">
                    <div className="relative mb-5">
                      <p className="text-sm text-white">{story.tags[0]}</p>
                      <h2 className="font-bold text-xl truncate text-white">{story.title}</h2>
                    </div>
                    <Link href={`/${story._id}`} className="group-hover:bg-gray-100 transition bg-[var(--background)] text-sm px-5 py-2 rounded-full inline-flex items-center">
                      Read this story
                      <IoIosArrowDropright className="ml-3 text-xl"/>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            </>
          ) : (
            <>
            <div className="h-[80vh] bg-gray-200 rounded-2xl animate-pulse"></div>
            <div className="grid grid-rows-2 gap-4 h-[80vh] bg-gray-200 rounded-2xl animate-pulse"></div>
            </>
          )}
        </div>
      </section>

      {/* Suggested Stories */}
      <section className="m-4 mt-10 relative">
        <div>
          <div className="">
            <h1 className="text-xl xl:text-3xl">Stories that might be for you.</h1>
            <p className="text-sm xl:text-base">Explore stories that inspire, entertain, and resonate—handpicked just for you.</p>
          </div>
        
          <div className="hidden xl:flex mt-5 items-center">
          {/* Categories */}
            <CategorySlider
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setCurrentPage={setCurrentPage}
              sliderRightButton={sliderRightButton}
              sliderWidth={sliderWidth}
            />

            {/* Sort button */}
            <div className="ml-auto">
              <Select onValueChange={handleSortButton} defaultValue={sortBy}>
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

        <div className="grid xl:grid-cols-3 gap-12 xl:gap-4 mt-7 xl:mt-5">
          { currentStories.length > 0 ? (
            currentStories.map((story) => (
              <Link href={`/${story._id}`} key={story._id} className="flex flex-col">
                <Image 
                  src={story.image}
                  alt="Placeholder"
                  width={300} 
                  height={200}
                  className="w-full h-full xl:h-[300px] object-cover rounded-2xl"
                />
                <div className="mt-3 ml-2 mr-2">
                  <p className="text-[var(--published-date)] text-xs xl:text-sm mb-2">{new Date(story.createdAt).toLocaleDateString('en-us', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}</p>
                  <h3>{story.title}</h3>
                  <span className="text-sm xl:text-base mt-1 text-ellipsis line-clamp-2">{story.caption}</span>
                </div>
                <div className="flex items-center mt-5 xl:mt-3 ml-2">
                  <Image 
                    src={story.author.image || 'https://github.com/shadcn.png'}
                    width={25}
                    height={25}
                    alt="CN"
                    className="rounded-full"
                  />
                  <h2 className="font-medium text-sm ml-3 capitalize">{story.author.name}</h2>
                </div>
              </Link>
            ))
          ) : currentStories.length === 0 ? (
            <div className="col-start-2 flex justify-center items-center h-[20vh] text-gray-600">No stories written yet.</div>
          ) : (
            <>
            <div className="bg-gray-200 rounded-2xl animate-pulse"></div>
            </>
          )}
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
