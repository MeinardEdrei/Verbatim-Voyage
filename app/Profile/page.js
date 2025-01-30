"use client"

import { useEffect, useRef, useState } from "react";
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
  const [username, setUsername] = useState('');
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const popular = useTopStories(stories, 3);
  const session = useUserSession();
  const profileDialogRef = useRef();

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDialogRef.current && !profileDialogRef.current.contains(event.target)) {
        setIsProfileDialogOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);
  
  return (
    <div hidden={session.userSession ? false : true} className="m-2 w-full h-screen">
      <section className="grid xl:grid-cols-[70%_30%] gap-10 h-full w-full xl:w-[90%]">
        <div className="max-w-full mt-20 xl:mx-20">
          {/* User Details */}
          <div className="w-full h-[30vw] xl:h-[10vw] border-b-2 border-[var(--border-light)]">
            <div className="flex w-full items-center gap-5">
              <div>
                <Image 
                  src={session?.userSession?.user?.image || '/darklogo.svg'}
                  width={120}
                  height={120}
                  alt="User Profile"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="capitalize font-bold text-xl xl:text-2xl">{session?.userSession?.user?.name}</h2>
                <div className="flex gap-2 text-xs xl:text-sm mt-2">
                  <p>1 following</p>
                  <p>2 followers</p>
                </div>
                <button onClick={() => setIsProfileDialogOpen(true)} className="bg-[var(--button-selected)] text-sm mt-4 text-white px-6 py-2 rounded-full">Edit Profile</button>
              </div>
            </div>
            <div>
            </div>
          </div>
          {/* Liked Stories */}
          <div className="mt-14">
            <div className="">
              <h2 className="underline text-xs xl:text-sm mb-7">Liked Stories</h2>
            </div>
            { user?.likedStories?.length > 0 ? (
              user.likedStories.map((item) => (
                <div key={item._id}>
                </div>
              ))
            ) : (
              <p className="place-self-center text-xs">Read more stories so you can see your favorites here.</p>
            )}
          </div>
        </div>
        <PopularReads 
          stories={stories}
          categories={categories}
          popular={popular}
        />
      </section>
      { isProfileDialogOpen === true && (
        <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full backdrop-blur-sm">
          <div ref={profileDialogRef} 
            className="flex flex-col p-5 justify-between w-[85vw] xl:w-[27vw] h-[50vw] xl:h-[20vw] bg-[var(--background-white)] border border-gray-300 rounded-lg"
          >
            <div>
              <h2 className="font-bold">Edit Profile</h2>
              <label htmlFor="name">Username</label>
              <input id="name" onChange={(e) => setUsername(e.target.value)}
                className="w-72 border border-gray-300 p-1 ml-2 mt-10 rounded-md"
                autoFocus
              />
            </div>
            <button className="m-2 py-2 px-6 text-white bg-black rounded-sm flex place-self-end">Save</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default page
