"use client"

import { useEffect, useState } from "react";
import CategorySlider from "../components/CategorySlider"
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import useTopStories from "../utils/TopStories";
import { fetchStories } from "@/services/stories";

// const stories = [
//   {
//     id: 1,
//     name: "Alice Johnson",
//     title: "Discovering Hidden Gems: A Journey of Exploration",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Adventure",
//     likesCount: 120,
//     commentsCount: 30,
//   },
//   {
//     id: 2,
//     name: "Michael Smith",
//     title: "A Taste of Home: Comfort Foods I Love",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Cooking",
//     likesCount: 95,
//     commentsCount: 25,
//   },
//   {
//     id: 3,
//     name: "Sophia Brown",
//     title: "Creative Expressions: My Love for Art and Sketching",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Art",
//     likesCount: 80,
//     commentsCount: 18,
//   },
//   {
//     id: 4,
//     name: "David Wilson",
//     title: "Minimalism Matters: Simplifying My Life",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Lifestyle",
//     likesCount: 200,
//     commentsCount: 45,
//   },
//   {
//     id: 5,
//     name: "Emma Davis",
//     title: "Heartfelt Conversations: Sharing Meaningful Moments",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Chat",
//     likesCount: 65,
//     commentsCount: 15,
//   },
//   {
//     id: 6,
//     name: "Oliver Garcia",
//     title: "Winning Streaks: The Ultimate Gaming Adventure",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Games",
//     likesCount: 180,
//     commentsCount: 50,
//   },
//   {
//     id: 7,
//     name: "Isabella Martinez",
//     title: "Everyday Wisdom: Life Lessons Worth Sharing",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Life",
//     likesCount: 90,
//     commentsCount: 20,
//   },
//   {
//     id: 8,
//     name: "James Anderson",
//     title: "The Great Outdoors: Embracing Nature’s Splendor",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Nature",
//     likesCount: 110,
//     commentsCount: 28,
//   },
//   {
//     id: 9,
//     name: "Charlotte Lee",
//     title: "Thrill-Seeker’s Guide: Adventures Beyond Limits",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Fun",
//     likesCount: 130,
//     commentsCount: 35,
//   },
//   {
//     id: 10,
//     name: "William Harris",
//     title: "Fusion Delights: Blending Flavors in the Kitchen",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Cooking",
//     likesCount: 75,
//     commentsCount: 22,
//   },
//   {
//     id: 11,
//     name: "Mia Thomas",
//     title: "Brushstrokes of Imagination: Exploring Abstract Art",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Art",
//     likesCount: 85,
//     commentsCount: 17,
//   },
//   {
//     id: 12,
//     name: "Lucas White",
//     title: "Purposeful Living: Finding Joy in Simplicity",
//     content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
//     image: "https://placehold.co/300x200",
//     avatar: "https://github.com/shadcn.png",
//     uploaded: "Aug 26, 2024",
//     category: "Lifestyle",
//     likesCount: 210,
//     commentsCount: 60,
//   },
// ];
// const categories = [
//   {
//     id: 1,
//     category: "Fun and Exciting",
//   },
//   {
//     id: 2,
//     category: "Cooking",
//   },
//   {
//     id: 3,
//     category: "Drawing",
//   },
//   {
//     id: 4,
//     category: "Lifestyle",
//   },
//   {
//     id: 5,
//     category: "Chat",
//   },
//   {
//     id: 6,
//     category: "Games",
//   },
//   {
//     id: 7,
//     category: "Life",
//   },
//   {
//     id: 8,
//     category: "Nature",
//   }
// ];

const page = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [contents, setContents] = useState([]);
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const popular = useTopStories(stories, 3);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchStories();
      setStories(response.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const popularCategories = popular.flatMap((story) => story.tags.slice(0, 4))
    console.log(popularCategories)
    setCategories([...new Set(popularCategories)])
  }, [popular])

  useEffect(() => {
    if (activeCategory === "All") {
      setContents(stories);
    } else {
      setContents(stories.filter((story) => story.tags.includes(activeCategory)));
    }
  }, [activeCategory, stories])

  return (
    <div className="flex justify-center">
      <div className="grid xl:grid-cols-[70%_30%] w-full xl:w-[90%]">
        <div className="relative m-5">
          {/* Categories */}
          <section className="flex flex-col justify-center">
            <CategorySlider 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setCurrentPage={setCurrentPage}
            />
          </section>
          {/* Stories */}
          <section className="flex">
            <div className="flex flex-col mt-14 gap-14 max-w-full">
              { contents.length > 0 ? (<>
                {contents.map((item) => (
                  <Link href={`/${item._id}`} key={item._id} 
                      className="flex gap-14">
                    <div className="w-[60%]">
                      <div className="flex items-center gap-3">
                        <Image 
                          src={item.author.image || 'https://github.com/shadcn.png'}
                          alt="Profile"
                          width={30}
                          height={30}
                          className="rounded-full"
                        />
                        <h2 className="font-medium text-xs xl:text-base capitalize">{item.author.name}</h2>
                      </div>
                      <div className="mt-2">
                        <h2 className="font-bold text-lg xl:text-2xl mb-1">{item.title}</h2>
                        <p className="font-medium text-sm xl:text-base text-ellipsis line-clamp-2 overflow-hidden">{item.caption}</p>
                        <p className="mt-4 text-[var(--published-date)] font-medium text-xs">{new Date(item.createdAt).toLocaleDateString('en-us', {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}</p>
                      </div>
                    </div>
                    <div>
                      <Image 
                        src={`${item.image}`}
                        alt={item.title}
                        width={220}
                        height={220}
                        className="rounded-lg xl:rounded-2xl"
                      />
                    </div>
                  </Link>
                ))}
              </>) : contents.length === 0 && stories.length === 0 ? (
                  <div key="loading" className="bg-gray-200 rounded-2xl animate-pulse"></div>
                ) : (
                  <div key="no-stories" className="col-start-2 flex justify-center items-center h-[20vh] text-gray-600">
                    No stories written yet.
                  </div>
                )}
            </div>
          </section>
        </div>
        <section className="hidden xl:block sticky top-0 h-screen border-l-black/30 mt-5">
          <div className="flex flex-col gap-20 m-5">
            <div>
              <h2 className="font-bold">Popular Reads</h2>
              <div>
                {popular.map((item) => (
                  <Link href={`/${item._id}`} key={item._id} className="flex gap-3 mt-5">
                    <div className="flex flex-col justify-center">
                      <div className="flex gap-3 items-center mb-2">
                        <Image 
                          src={item.author.image || 'https://github.com/shadcn.png'}
                          alt="Profile"
                          width={25}
                          height={25}
                          className="rounded-full"
                        />
                        <h2 className="font-medium text-xs capitalize">{item.author.name}</h2>
                      </div>
                      <div>
                        <h2 className="font-bold text-base whitespace-nowrap text-ellipsis overflow-hidden">{item.title}</h2>
                        <p className="text-xs text-[var(--published-date)]">{new Date(item.createdAt).toLocaleDateString('en-us', {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-bold mb-4">Recommended Topics</h2>
              <div className="flex flex-wrap w-[20vw] gap-3">
                {categories?.length > 0 ? (
                  categories.slice(0, 7).map((item, index) => (
                    <button key={index}
                      onClick={() => setActiveCategory(item)}
                      className="bg-[#EFEFEF] capitalize rounded-full hover:text-black px-4 py-2 font-medium text-sm text-[#4B4B4B]"
                    >
                      {item}
                    </button>
                  ))
                ) : categories?.length === 0 && stories.length === 0 ? (
                  <div key="loading" className="bg-gray-200 rounded-2xl animate-pulse"></div>
                ) : (
                  <div key="no-stories" className="col-start-2 flex justify-center items-center h-[20vh] text-gray-600">
                    No topics yet.
                  </div>
                )}
              </div>
            </div>
            <div>
              <h2 className="text-gray-800 text-sm">@2025 Verbatim Voyage. All rights reserved.</h2>
              <Link href="/" className="border text-sm mt-4 border-black p-2 rounded-full flex justify-center items-center">
                Made by Meinard Edrei S.&nbsp;
                <MdArrowOutward className="text-xl"/>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default page
