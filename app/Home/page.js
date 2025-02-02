"use client"

import { useEffect, useState } from "react";
import CategorySlider from "../components/CategorySlider";
import Image from "next/image";
import Link from "next/link";
import useTopStories from "../utils/TopStories";
import { fetchStories } from "@/services/stories";
import PopularReads from "../components/PopularReads";

const page = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [contents, setContents] = useState([]);
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const popular = useTopStories(stories, 3);
  const sliderRightButton = 50;
  const sliderWidth = 85;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetchStories();
      setStories(response.data);
      setLoading(false);
    };

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
  }, [activeCategory, stories]);

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
              loading={loading}
            />
          </section>
          {/* Stories */}
          <section className="flex justify-center">
            <div className="flex flex-col mt-14 gap-14 max-w-full xl:w-[95%]">
              {loading ? (
                <>
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-[20vh] w-full"></div>
                  ))}
                </>
              ) : contents.length > 0 ? (
                contents.map((item) => (
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
                ))
              ) : (
                <div className="col-start-2 flex justify-center items-center h-[20vh] text-gray-600">
                  No stories written yet.
                </div>
              )}
            </div>
          </section>
        </div>
        <PopularReads 
          popular={popular}
          categories={categories}
          stories={stories}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default page;
