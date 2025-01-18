"use client"
import { useState } from "react";
import { createStory } from '@/services/stories';

export default function PublishModal({ modalRef, setIsModalOpen, title, setTitle, content }) {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [caption, setCaption] = useState('');

  const handlePublish = async () => {
    try {
      const storyData = {
        title: title,
        caption: caption,
        content: content,
        tags: tags,
      }
      const response = await createStory(storyData);

      if (response.status === 200) {
        alert("Published")
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.error("Publish error: ", error);
    }
  }

  return (
    <div className="z-10 fixed top-0 left-0 w-full h-full backdrop-blur-md p-20">
      <section className="flex justify-center">
        <div 
          ref={modalRef} 
          className="flex flex-col justify-center bg-[var(--background)] w-[100%] xl:w-[80%] h-[80vh] xl:h-[50vh]
          border border-black/30 rounded-sm"
        >
          <div className="grid xl:grid-cols-2">
            {/* Left side */}
            <div className="flex flex-col gap-3 h-full w-full p-5">
              <h2 className="text-semibold text-2xl">Story Details</h2>
              {/* Image Upload */}
              <div className="w-full h-[30vh] bg-gray-300 cursor-pointer border border-black/30 border-dashed" 
                onClick={() => document.getElementById("file-input").click()}
              >
                <input 
                  id="file-input"
                  type="file"
                  accept="image/*"
                  hidden
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <div className="flex flex-col justify-center w-full h-full">
                  {file ? (
                    <img 
                      src={URL.createObjectURL(file)} 
                      className="w-full h-full object-contain"
                      alt="Uploaded Preview"
                    />
                  ) : (
                    <p className="text-center font-bold text-white backdrop-blur-sm z-20">Upload an image</p>
                  )}
                </div>
              </div>
              {/* Tags */}
              <div>
                <input 
                  placeholder="Tags"
                  className="w-full outline-none px-4 py-2 bg-transparent border border-black/10"
                />
              </div>
            </div>
            {/* Right side */}
            <div className="flex flex-col justify-between h-full w-full p-5">
              <div className="space-y-2">
                <input 
                  placeholder={title || "Title"}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full outline-none px-4 py-2 bg-transparent border border-black/10"
                />
                <input 
                  placeholder="Caption"
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full outline-none px-4 py-2 bg-transparent border border-black/10 min-w-[10vh]"
                />
              </div>
              <div className="flex justify-end gap-2 mt-20">
                <button
                  onClick={handlePublish}
                  className="px-4 py-2 rounded-full bg-black text-white"
                >
                  Publish
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full bg-transparent border border-black/20"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}