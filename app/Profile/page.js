"use client"

import { useEffect, useState } from "react";
import PopularReads from "../components/PopularReads"
import useTopStories from "../utils/TopStories";
import { fetchStories } from "@/services/stories";
import { useUserSession } from "../utils/SessionContext";
import { fetchUser } from "@/services/user";
import Image from "next/image";

const page = () => {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);
  const popular = useTopStories(stories, 3);
  const session = useUserSession();

  useEffect(() => {
    const fetchData = async () => {
      const story = await fetchStories();
      setStories(story.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!session.userSession) return;

      const user = await fetchUser(session?.userSession?.id);
      setUser(user.data);
    }

    fetchData();
  }, [session])

  useEffect(() => {
    const popularCategories = popular.flatMap((story) => story.tags.slice(0, 4))
    setCategories([...new Set(popularCategories)])
  }, [popular]);
  
  return (
    <div hidden={session.userSession ? false : true} className="m-4">
      <section className="grid xl:grid-cols-[70%_30%] gap-10 w-full xl:w-[90%]">
        <div className="flex gap-4">
          {/* User Details */}
          <div>
            <div>
              <Image 
                src={session?.userSession?.user?.image || '/darklogo.svg'}
                width={100}
                height={100}
                alt="User Profile"
                className="rounded-full"
              />
            </div>
            <div>
              <h2 className="capitalize font-bold text-2xl">{session?.userSession?.user?.name}</h2>
            </div>
          </div>
          {/* Liked Stories */}
          <div>

          </div>
          <div>

          </div>
        </div>
        <PopularReads 
          stories={stories}
          categories={categories}
          popular={popular}
        />
      </section>
    </div>
  )
}

export default page
