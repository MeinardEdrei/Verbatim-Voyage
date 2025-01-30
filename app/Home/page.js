"use client"

import { useEffect, useState } from "react";
import CategorySlider from "../components/CategorySlider"
import { MdArrowOutward } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import useTopStories from "../utils/TopStories";
import { fetchStories } from "@/services/stories";

const page = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [contents, setContents] = useState([]);
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const popular = useTopStories(stories, 3);
  const sliderRightButton = 50;
  const sliderWidth = 85;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchStories();
      setStories(response.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const popularCategories = popular.flatMap((story) => story.tags.slice(0, 4))
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
      <div className="grid xl:grid-cols-[70%_30%] gap-10 w-full xl:w-[90%]">
        <div className="relative m-5">
          {/* Categories */}
          <section className="flex flex-col justify-center">
            <CategorySlider 
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setCurrentPage={setCurrentPage}
              sliderRightButton={sliderRightButton}
              sliderWidth={sliderWidth}
            />
          </section>
          {/* Stories */}
          <section className="flex justify-center">
            <div className="flex flex-col mt-14 gap-14 max-w-full xl:w-[95%]">
              { contents.length > 0 ? (<>
                {contents.map((item) => (
                  <Link href={`/${item._id}`} key={item._id} 
                      className="flex justify-between gap-5">
                    <div className="w-[60%]">
                      <div className="flex items-center gap-3">
                        <Image 
                          src={item.author.image || 'https://github.com/shadcn.png'}
                          alt="Profile"
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                        <h2 className="font-medium text-xs xl:text-sm capitalize">{item.author.name}</h2>
                      </div>
                      <div className="mt-2">
                        <h2 className="font-bold text-base xl:text-2xl text-ellipsis line-clamp-2 overflow-hidden mb-1">{item.title}</h2>
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
                        className="rounded-lg w-[30vw] xl:w-[15vw] h-[110px] xl:h-[140px] object-cover xl:rounded-2xl"
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
                        <h2 className="font-bold text-base text-ellipsis line-clamp-2 overflow-hidden">{item.title}</h2>
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
                      className="bg-[var(--topics)] capitalize rounded-full hover:text-[var(--topics-hover)] px-4 py-2 font-medium text-sm"
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
              <h2 className="text-[var(--copyright)] text-sm">@2025 Verbatim Voyage. All rights reserved.</h2>
              <Link href="/" className="border text-sm mt-4 border-[var(--copyright-border)] p-2 rounded-full flex justify-center items-center">
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
