import Image from "next/image";
import { MdOutlineSendTimeExtension } from "react-icons/md";
import { formatDistanceToNow } from 'date-fns';
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { FcLike } from "react-icons/fc";
import { BsFeather } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { deleteComment, likeComment } from "@/services/stories";

const CommentsModal = ({ story, post, session, comments, replies, commentsRef, setIsCommentsOpen, userComment, setUserComment, handleSendComment }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])

  const handleDeleteComment = async (id) => {
    const response = await deleteComment(post, id);

    if (response.status != 200) {
      console.error(response.message);
    }
  }

  const handleLikeComment = async (id) => {
    const response = await likeComment(post, id, session.userSession.id);

    if (response.status != 200) {
      console.error(response.data.message);
    }
  }

  return (
    <div 
      ref={commentsRef}
      className="z-50 fixed top-0 right-0 h-[100vh] overflow-y-scroll w-full xl:w-[30vw] bg-white
      p-5 border-l-2 border-gray-200"
      style={{ scrollbarWidth: 'thin' }}
    >
      <section className="">
        <button onClick={() => setIsCommentsOpen(false)} className="flex items-center gap-2 text-sm xl:hidden mb-5">
          <FaArrowLeftLong className="text-sm"/>
          Back to story
        </button>
        <div>
          <h2 className="text-lg font-bold mb-4">
            Comments ({new Intl.NumberFormat('en', { notation: 'compact' }).format(comments.length).toLowerCase()})
          </h2>
        </div>
        <div className="flex border border-black rounded-lg p-1">
          <textarea 
          value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            autoFocus
            placeholder="What do you think about this story?"
            className="outline-none w-full resize-none p-2"
          />
          <button
            onClick={handleSendComment}
            className="text-2xl mr-2"
          >
            <MdOutlineSendTimeExtension />
          </button>
        </div>
        <div className="mt-5">
          { comments.length > 0 ? (
            comments
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((item) => (
              <div key={item._id} className="flex gap-2 p-2 mb-2">
                <div>
                  <Image 
                    src={item.user.image || 'https://github.com/shadcn.png'}
                    width={40}
                    height={40}
                    alt="Profile"
                    className="rounded-full"
                  />
                </div>
                <div className="relative w-full">
                  {/* Comments */}
                  <div className="bg-gray-100 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold capitalize">{item.user.name}</h2>
                      {item.user._id === story.author._id && (
                        <p className="flex items-center gap-2 text-xs font-bold text-gray-500"><BsFeather />Author</p>
                      )}
                      <p className="text-[var(--published-date)] text-xs">
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <p className="text-base">{item.commentText}</p>
                  </div>
                  { session?.userSession?.id === item.user._id && (
                    <button onClick={() => setIsMenuOpen(item._id)} className="absolute top-3 right-2">
                      <HiDotsVertical />
                    </button>
                  )}
                  { isMenuOpen === item._id && (
                    <div ref={menuRef}>
                      <button 
                        className="absolute bg-gray-500 text-white p-1 top-8 text-sm right-4 rounded-sm" 
                        onClick={() => handleDeleteComment(item._id)}
                        >
                          Delete
                        </button>
                    </div>
                  )}
                  {/* Likes and Replies */}
                  <div className="px-2 py-1 flex justify-between bg-gray-50 text-gray-500 rounded-md">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLikeComment(item._id)}
                        className={item.likes.find(user => user._id === session?.userSession?.id) ? `text-xs font-bold` : `text-xs`}
                      >
                        {item.likes.length} Like
                      </button>
                      <button
                        className="text-xs"
                      >
                        Reply
                      </button>
                    </div>
                    {item.likes.find(user => user._id === story.author._id) && (
                      <p className="text-xs font-bold flex items-center gap-2">
                        <FcLike />
                        Liked by Author 
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ): null}
        </div>
      </section>
    </div>
  )
}

export default CommentsModal
