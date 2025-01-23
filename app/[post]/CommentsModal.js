import { MdOutlineSendTimeExtension } from "react-icons/md";

const CommentsModal = ({ commentsRef, userComment, setUserComment, handleSendComment }) => {
  return (
    <div 
      ref={commentsRef}
      className="z-50 fixed top-0 right-0 h-[100vh] w-[30vw] bg-white
      p-5 border-l-2 border-gray-200"
    >
      <section className="">
        <div>
          <h2 className="text-lg font-bold mb-4">Comments</h2>
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
      </section>
    </div>
  )
}

export default CommentsModal
