"use client"
import { fetchThisStory, isStoryLiked, likeStory, sendComment } from "@/services/stories";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react";
import { useUserSession } from "../utils/SessionContext";
import { edjsParser } from "@/utils/editorHelper";
import Image from "next/image";
import CommentsModal from "./CommentsModal";

const page = () => {
  const session = useUserSession();
  const { post } = useParams();

  const [story, setStory] = useState(null);
  const [content, setContent] = useState(null);
  const [userLikes, setUserLikes] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [userComment, setUserComment] = useState('');
  const [comments, setComments] = useState(null);
  const [commentLikes, setCommentLikes] = useState(0);
  const [replies, setReplies] = useState(null);
  const commentsRef = useRef();

  useEffect(() => {
    if (session.userSession) {
      const eventSource = new EventSource(`/api/story/stream?storyId=${post}&userId=${session.userSession.id}`);

      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setLikesCount(data.likes);
        setUserLikes(data.isLiked);
        setComments(data.comments);
        setCommentsCount(data.comments.length);
        setReplies(data.comments.replies);
      }
  
      eventSource.onerror = (error) => {
        console.error("SSE error:", error);
        eventSource.close();
      };
    
      return () => {
        eventSource.close();
      };
    }
  }, [session])

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
    const handleClickOutside = (event) => {
      if (commentsRef.current && !commentsRef.current.contains(event.target)) {
        setIsCommentsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  const handleSendComment = async () => {
    const formData = new FormData();
    formData.append('userId', session.userSession.id);
    formData.append('storyId', post);
    formData.append('userComment', userComment);

    const response = await sendComment(formData);
    
    if (response.status === 200) {
      setUserComment('');
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
                    {new Intl.NumberFormat('en', { notation: 'compact' }).format(likesCount).toLowerCase()}
                  </div>
                </button>
                <button onClick={() => setIsCommentsOpen(true)} className="flex items-center gap-2 w-auto group transition-all">
                  <FaRegComment 
                    className="text-lg text-gray-400 group-hover:text-black"
                  />
                  <div className="text-black/50 text-sm">
                    {new Intl.NumberFormat('en', { notation: 'compact' }).format(commentsCount).toLowerCase()}
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
      { isCommentsOpen === true && (
        <CommentsModal 
          commentsRef={commentsRef}
          setIsCommentsOpen={setIsCommentsOpen}
          comments={comments}
          commentLikes={commentLikes}
          replies={replies}
          userComment={userComment}
          setUserComment={setUserComment}
          handleSendComment={handleSendComment}
          session={session}
          post={post}
          story={story}
        />
      )}
    </div>
  )
}

export default page
