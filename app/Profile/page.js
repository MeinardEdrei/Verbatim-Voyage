"use client"

import { useEffect, useRef, useState } from "react";
import PopularReads from "../components/PopularReads"
import useTopStories from "../utils/TopStories";
import { fetchStories, fetchThisStory } from "@/services/stories";
import { useUserSession } from "../utils/SessionContext";
import { fetchUser, updateProfile } from "@/services/user";
import Image from "next/image";

const page = () => {
  const [stories, setStories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState([]);
  const [likedStories, setLikedStories] = useState([]);
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
  }, [session]);

  useEffect(() => {
    const fetchData = async () => {
      if (!session.userSession) return;

      const response = await fetchUser(session?.userSession?.id);
      setUser(response.data);
      setLikedStories(stories.filter(story => 
        response.data.likedStories.includes(story._id)));  
    }

    fetchData();
  }, [session, stories])

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

  const handleProfileChange = async () => {
    try {
      const response = await updateProfile(username, session?.userSession?.id);

      if (response.status === 200) {
        setUsername(response.data.user.name);
        await session.updateSession();
        setIsProfileDialogOpen(false);
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Profile change client error:', error);
    }
  }
  
  return (
    <div hidden={session.userSession ? false : true} className="m-2 w-full h-screen">
      <section className="grid xl:grid-cols-[70%_30%] gap-10 h-full w-full xl:w-[90%]">
        <div className="max-w-full mt-20 xl:mx-20">
          {/* User Details */}
          <div className="w-full h-[30vw] xl:h-[10vw] border-b-2 border-[var(--border-light)]">
            <div className="flex w-full items-center gap-5">
              <div>
                <Image 
                  src={session?.userSession?.image || '/darklogo.svg'}
                  width={120}
                  height={120}
                  alt="User Profile"
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="capitalize font-bold text-xl xl:text-2xl">{session?.userSession?.name}</h2>
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
            { likedStories?.length > 0 ? (
              <div className="flex flex-col gap-10">
                { likedStories.map((item) => (
                  <div key={item._id}>
                    <div className="flex items-center gap-10">
                      <div className="flex flex-col gap-4 w-[60%]">
                        <div className="flex items-center gap-4">
                          <div>
                            <Image 
                              src={item.author.image}
                              height={30}
                              width={30}
                              alt="Author Profile"
                              className="rounded-full"
                            />
                          </div>
                          <h2 className="text-sm xl:text-base capitalize">{item.author.name}</h2>
                        </div>
                        <div className="space-y-2">
                          <h2 className="font-bold xl:text-xl text-ellipsis line-clamp-2 overflow-hidden">{item.title}</h2>
                          <p className="text-ellipsis line-clamp-2 overflow-hidden text-sm xl:text-base">{item.caption}</p>
                        </div>
                      </div>
                      <div>
                        <Image 
                          src={item.image}
                          height={250}
                          width={250}
                          alt="Story Image"
                          className="rounded-md w-[30vw] xl:w-[15vw] h-[110px] xl:h-[140px] object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              <input id="name" value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-72 border border-gray-300 p-1 ml-2 mt-10 rounded-md"
                autoFocus
              />
            </div>
            <button onClick={handleProfileChange} className="m-2 py-2 px-6 text-white bg-black rounded-sm flex place-self-end">Save</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default page
