"use client"

import { useState, useEffect } from "react";
import { useUserSession } from "../utils/SessionContext";
import { changeStoryStatusToDraft, deleteStory, fetchUserStories } from "@/services/stories";
import { formatDistanceToNow } from 'date-fns';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState('published');
  const [openDraftDialogId, setOpenDraftDialogId] = useState(null);
  const [openDeleteDialogId, setOpenDeleteDialogId] = useState(null);
  const [publishedCount, setPublishedCount] = useState(0);
  const [draftsCount, setDraftsCount] = useState(0);
  const [stories, setStories] = useState([]);
  const [sortedStories, setSortedStories] = useState([]);
  const [modal, setModal] = useState(null);
  const { userSession } = useUserSession();

  const fetch = async () => {
    const response = await fetchUserStories(userSession.id);

    if (response.status === 200) {
      setStories(response.data);
      setPublishedCount(response.data.filter(story => story.status === 'published').length);
      setDraftsCount(response.data.filter(story => story.status === 'draft').length);
      setLoading(false);
    } else {
      alert(response.message);
    }
  }

  useEffect(() => {
    if (!userSession) return;
    fetch();
  }, [userSession]);

  useEffect(() => {
    setSortedStories(stories.filter(story => story.status === activeButton));
  }, [stories, activeButton]);

  const handleDeleteStory = async (story) => {
    const response = await deleteStory(story);

    if (response.status === 200) {
      alert('Story deleted permanently');
      fetch();
      setOpenDeleteDialogId(null);
    } else {
      alert(response.message);
    }
  }

  const handleDraft = async (story) => {
    const response = await changeStoryStatusToDraft(story);

    if (response.status === 200) {
      alert('Story has been saved to draft');
      fetch();
      setOpenDraftDialogId(null);
    } else {
      alert(response.message);
    }
  }

  return (
    <div className={loading ? `hidden` : `flex justify-center`}>
      <section className="w-11/12 xl:w-[60%] mt-10">
        <div>
          <h2 className="text-2xl xl:text-3xl font-semibold">Stories</h2>
        </div>
        <div className="flex xl:gap-4 mt-5">
          <button 
            onClick={() => setActiveButton('published')}
            className={`${activeButton === "published" 
              ? "bg-[var(--topics)] font-semibold" 
              : ""} py-2 px-7 xl:py-2 text-sm xl:text-base rounded-full`}
              >
                Published ({new Intl.NumberFormat('en', { notation: 'compact' }).format(publishedCount).toLowerCase()})
          </button>
          <button 
            onClick={() => setActiveButton('draft')}
            className={`${activeButton === "draft" 
              ? "bg-[var(--topics)] font-semibold" 
              : ""} py-2 px-7 xl:py-2 text-sm xl:text-base rounded-full`}
              >
                Draft ({new Intl.NumberFormat('en', { notation: 'compact' }).format(draftsCount).toLowerCase()})
          </button>
        </div>
        <div className="mt-10">
          { sortedStories.length > 0 ? (
            <div className="flex flex-col gap-10">
            { sortedStories.map((item) => (
              <div key={item._id}>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-5">
                    <div>
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        height={250} 
                        width={250} 
                        alt="Story Image" 
                        className="rounded-md w-[30vw] xl:w-[15vw] h-[110px] xl:h-[140px] object-cover"
                      />
                    ) : (
                      <div className="w-[30vw] xl:w-[15vw] h-[110px] xl:h-[140px] flex items-center justify-center bg-gray-200 text-gray-600 font-semibold rounded-md">
                        No Image
                      </div>
                    )}
                    </div>
                    <div className="flex flex-col gap-4 w-[90%]">
                      <div className="space-y-2">
                        {item.status === 'published' ? (
                          <Link href={`/${item._id}`} className="hover:underline font-bold xl:text-xl text-ellipsis line-clamp-2 overflow-hidden">{item.title || 'Draft'}</Link>
                        ) : (
                          <div className="font-bold xl:text-xl text-ellipsis line-clamp-2 overflow-hidden">{item.title || 'Draft'}</div>
                        )}
                        <p className="text-ellipsis line-clamp-2 overflow-hidden text-sm xl:text-base">{item.caption || ''}</p>
                        <p className="text-xs text-[var(--published-date)]">Created {formatDistanceToNow(item.createdAt, { addSuffix: true })}</p>
                      </div>
                      <div className="flex gap-4">
                        <Link href={`/Write?storyId=${item._id}`} className={activeButton === 'published' ? `hidden` : `hover:underline flex items-center text-sm`}><CiEdit />&nbsp;Edit</Link>
                        <button onClick={() => setOpenDraftDialogId(item._id)} className={activeButton === 'draft' ? `hidden` : `hover:underline flex items-center text-sm`}><CiEdit />&nbsp;Draft</button>
                        <button onClick={() => setOpenDeleteDialogId(item._id)} className="flex items-center text-sm"><AiOutlineDelete />&nbsp;Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
                { openDeleteDialogId === item._id && (
                  <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full backdrop-blur-sm">
                    <div 
                      className="flex flex-col p-5 justify-between w-[85vw] xl:w-[27vw] h-[50vw] xl:h-[20vw] bg-[var(--background-white)] border border-gray-300 rounded-lg"
                    >
                      <div>
                        <h2 className="font-bold text-xl">Remove Story Permanently?</h2>
                        <p>This story will be deleted forever. You won&#39;t be able to recover it.</p>
                      </div>
                      <div className="flex">
                        <button onClick={() => handleDeleteStory(item._id)} className="m-2 py-2 px-6 text-white bg-red-500 rounded-sm flex place-self-end">Remove</button>
                        <button onClick={() => setOpenDeleteDialogId(null)} className="m-2 py-2 px-6 text-white bg-black rounded-sm flex place-self-end">Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
                { openDraftDialogId === item._id && (
                  <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full backdrop-blur-sm">
                    <div 
                      className="flex flex-col p-5 justify-between w-[85vw] xl:w-[27vw] h-[50vw] xl:h-[20vw] bg-[var(--background-white)] border border-gray-300 rounded-lg"
                    >
                      <div>
                        <h2 className="font-bold text-xl">Move your work to drafts?</h2>
                        <p>Your work will be saved as a draft and will not be visible to public. You can continue editing it later.</p>
                      </div>
                      <div className="flex">
                        <button onClick={() => handleDraft(item._id)} className="m-2 py-2 px-6 text-white bg-green-500 rounded-sm flex place-self-end">Move to Drafts</button>
                        <button onClick={() => setOpenDraftDialogId(null)} className="m-2 py-2 px-6 text-white bg-black rounded-sm flex place-self-end">Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
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
