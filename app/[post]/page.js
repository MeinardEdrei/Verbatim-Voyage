"use client"
import { fetchThisStory } from "@/services/stories";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
const edjsHTML = require("editorjs-html");

const data = {
  storyLikes: 1000,
  storyComments: 10,
  userLikes: false,
}

const page = () => {

  const edjsParser = edjsHTML({ delimiter: () => '<div id="delimiter">* * *</div>' }, { strict: true });

  const { post } = useParams();
  const [story, setStory] = useState([]);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchThisStory(post);

      if (response.status === 200) {
        setStory(response.data);

        // Content parsing
        const parsedHTML = edjsParser.parse(response.data.content);
        console.log(parsedHTML);

        setContent(parsedHTML);
      } else {
        console.error(response.message);
      }
    }

    fetch();
  }, []);

  return (
    <div className="h-screen">
      <section className="flex justify-center mt-16">
        {story && story.length != 0 ? (
          <div className="xl:w-[50%]">
            {/* Title */}
            <div>
              <h1 id="content-title" className="text-5xl font-bold">{story.title}</h1>
            </div>
            {/* Author */}
            <div className="flex items-center mt-5 mb-10">
              <Image 
                src={story?.author?.image}
                width={40}
                height={40}
                alt="A"
                className="rounded-full mr-3"
              />
              <div>
                <h2 className="text-bold">{story.author.name}</h2>
                <p className="text-xs text-[var(--published-date)]">
                  {new Date(story.createdAt).toLocaleDateString("en-us", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}</p>
              </div>
            </div>
            {/* Likes & Comments */}
            <div className="py-2 my-4 border-y-2 border-gray-100">
              <div className="flex items-center">
                <button className="flex items-center gap-2 w-auto mr-5 group transition-all">
                  { data.userLikes ? (
                    <BiSolidLike 
                      className="text-xl"
                    />
                  ) : (
                    <BiLike 
                      className="text-xl text-gray-400 group-hover:text-black"
                    />
                  )}
                  <div className="text-black/50 text-sm">
                    {new Intl.NumberFormat('en', { notation: 'compact' }).format(data.storyLikes).toLowerCase()}
                  </div>
                </button>
                <button className="flex items-center gap-2 w-auto group transition-all">
                  <FaRegComment 
                    className="text-lg text-gray-400 group-hover:text-black"
                  />
                  <div className="text-black/50 text-sm">
                    {new Intl.NumberFormat('en', { notation: 'compact' }).format(data.storyComments).toLowerCase()}
                  </div>
                </button>
              </div>
            </div>
            {/* Story Image */}
            <div className="w-full mt-10">
              <Image 
                src={story.image}
                width={350}
                height={350}
                alt="Story Image"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Content */}
            <div 
              className="editor-content space-y-4 mt-10 text-2xl mb-[10vw]"
              dangerouslySetInnerHTML={{ __html: content }}>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default page
