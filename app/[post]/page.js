"use client"
import { fetchThisStory, isStoryLiked, likeStory } from "@/services/stories";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import Image from "next/image";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";
import { useUserSession } from "../utils/SessionContext";

const edjsParser = {
  parse: (blocks) => {
    return blocks.map(block => {
      switch (block.type) {
        case 'paragraph':
          return `<p>${block.data.text}</p>`;
        case 'header':
          return `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
        case 'list':
          const listItems = block.data.items
            .map(item => `<li>${item.content}</li>`)
            .join('');
          return block.data.style === 'ordered' 
            ? `<ol>${listItems}</ol>` 
            : `<ul>${listItems}</ul>`;
        case 'image':
          return `<figure>
            <img src="${block.data.file.url}" alt="${block.data.caption || ''}" />
            ${block.data.caption ? `<figcaption>${block.data.caption}</figcaption>` : ''}
          </figure>`;
        case 'delimiter':
          return '<div id="delimiter">* * *</div>';
        default:
          return 'This line is not currently supported';
      }
    }).join('');
  }
};

const page = () => {
  const session = useUserSession();
  const { post } = useParams();

  const [story, setStory] = useState(null);
  const [content, setContent] = useState(null);
  const [userLikes, setUserLikes] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchThisStory(post);

      if (response.status === 200) {
        setStory(response.data);

        // Content parsing
        if (response.data.content?.[0]?.blocks) {
          const html = edjsParser.parse(response.data.content[0].blocks);
          
          setContent(html);
        }
      } else {
        console.error(response.message);
      }
    }

    fetch();
  }, []);

  useEffect(() => {
    if (session?.userSession) {
      fetchUserLike();
    }
  }, [session]);

  const fetchUserLike = async () => {
    const response = await isStoryLiked(post, session.userSession.id);

    if (response.status === 200) {
      setUserLikes(response);
    } else {
      console.error(response.message);
    }
  }

  const handleLike = async () => {
    const response = await likeStory(post, session.userSession.id);

    if (response.status != 200) {
      console.error(response.message);
    }
  }

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
                <button onClick={handleLike} className="flex items-center gap-2 w-auto mr-5 group transition-all">
                  { userLikes === true ? (
                    <BiSolidLike 
                      className="text-xl"
                    />
                  ) : (
                    <BiLike 
                      className="text-xl text-gray-400 group-hover:text-black"
                    />
                  )}
                  <div className="text-black/50 text-sm">
                    {new Intl.NumberFormat('en', { notation: 'compact' }).format(story.likes).toLowerCase()}
                  </div>
                </button>
                <button className="flex items-center gap-2 w-auto group transition-all">
                  <FaRegComment 
                    className="text-lg text-gray-400 group-hover:text-black"
                  />
                  <div className="text-black/50 text-sm">
                    {new Intl.NumberFormat('en', { notation: 'compact' }).format(story.comments.length).toLowerCase()}
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
