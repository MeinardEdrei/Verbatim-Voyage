"use client"

import { useState, useEffect } from "react";
import { useUserSession } from "../utils/SessionContext";
import { fetchUserStories } from "@/services/stories";
import { formatDistanceToNow } from 'date-fns';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState('published');
  const [stories, setStories] = useState([]);
  const [sortedStories, setSortedStories] = useState([]);
  const [modal, setModal] = useState(null);
  const { userSession } = useUserSession();

  useEffect(() => {
    if (!userSession) return;
    const fetch = async () => {
      const response = await fetchUserStories(userSession.id);

      if (response.status === 200) {
        setStories(response.data);
        setLoading(false);
      } else {
        alert(response.message);
      }
    }

    fetch();
  }, [userSession]);

  useEffect(() => {
    setSortedStories(stories.filter(story => story.status === activeButton));
  }, [stories, activeButton]);

  return (
    <div className={loading ? `hidden` : `flex justify-center`}>
      <section className="w-11/12 xl:w-[60%] mt-10">
        <div>
          <h2 className="text-2xl xl:text-3xl font-semibold">Stories</h2>
        </div>
        <div className="flex xl:gap-4 mt-5">
          <button 
            onClick={() => setActiveButton('published')}
            className={`${activeButton === "published" ? "bg-[var(--topics)] font-semibold" : ""} py-2 px-7 xl:py-2 text-sm xl:text-base rounded-full`}>Published</button>
          <button 
            onClick={() => setActiveButton('draft')}
            className={`${activeButton === "draft" ? "bg-[var(--topics)] font-semibold" : ""} py-2 px-7 xl:py-2 text-sm xl:text-base rounded-full`}>Draft</button>
        </div>
        <div className="mt-10">
          { sortedStories.length > 0 ? (
            <div className="flex flex-col gap-10">
            { sortedStories.map((item) => (
              <div key={item._id}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                      <Image 
                        src={item.image}
                        height={250}
                        width={250}
                        alt="Story Image"
                        className="rounded-md w-[30vw] xl:w-[15vw] h-[110px] xl:h-[140px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-4 w-[90%]">
                      <div className="space-y-2">
                        <Link href={`/${item._id}`} className="hover:underline font-bold xl:text-xl text-ellipsis line-clamp-2 overflow-hidden">{item.title}</Link>
                        <p className="text-ellipsis line-clamp-2 overflow-hidden text-sm xl:text-base">{item.caption}</p>
                        <p className="text-xs text-[var(--published-date)]">Created {formatDistanceToNow(item.createdAt, { addSuffix: true })}</p>
                      </div>
                      <div className="flex gap-4">
                        <button className="flex items-center text-sm"><CiEdit />&nbsp;Edit</button>
                        <button className="flex items-center text-sm"><AiOutlineDelete />&nbsp;Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          ) : null}
        </div>
      </section>
    </div>
  )
}

export default page
