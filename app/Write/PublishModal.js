"use client"
import { useState } from "react";
import { createStory } from '@/services/stories';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { uploadImage } from "@/services/cloud";
import { useUserSession } from "../utils/SessionContext";
import { useRouter } from "next/navigation";

export default function PublishModal({ 
    modalRef, 
    setIsModalOpen, 
    title, setTitle, 
    content, 
    tagsOptions, 
  }) {
  const [file, setFile] = useState(null);
  const [tags, setTags] = useState([]);
  const [caption, setCaption] = useState('');
  const session = useUserSession();
  const router = useRouter();

  const handleDraft = async () => {
    try {
      const imageUrl = await uploadImage({ file, session })
      const formData = new FormData();
      
      formData.append('image', imageUrl);
      formData.append('title', title);
      formData.append('caption', caption);
      formData.append('author', session?.userSession?.user?.id);
      formData.append('content', JSON.stringify(content));
      formData.append('tags', JSON.stringify(tags));
      formData.append('status', 'draft');

      const response = await createStory(formData);

      if (response.status === 200) {
        alert("Saved to draft")
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.error("Publish error: ", error);
    }
  }

  const handlePublish = async () => {
    try {
      const imageUrl = await uploadImage({ file, session })

      const storyData = {
        image: imageUrl,
        title,
        caption,
        author: session.userSession.id,
        content,
        tags,
        status: "published",
      };

      const response = await createStory(storyData);

      if (response.status === 200) {
        alert("Published")
        router.push('/');
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
          <div className="flex flex-col gap-3">
            <h2 className="text-semibold text-2xl px-5">Story Details</h2>
            <div className="grid xl:grid-cols-2">
              {/* Left side */}
              <div className="flex flex-col gap-3 h-full w-full px-5">
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
                  <Autocomplete 
                    freeSolo 
                    multiple
                    options={Array.isArray(tagsOptions) ? tagsOptions : []}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.tags}
                    value={tags}
                    onChange={(event, newValue) => {
                        if (newValue.length <= 7) {
                          setTags(
                            newValue.map((tag) => {
                              return typeof tag === 'string' ? tag : tag.tags;
                            })
                          )
                        }
                      }}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Tags" disabled={tags.length >= 7}/>
                    )}
                  />
                </div>
              </div>
              {/* Right side */}
              <div className="flex flex-col justify-between h-full w-full px-5">
                <div className="space-y-2">
                  <textarea 
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                    rows={2}
                    maxLength={200}
                    className="resize-none w-full outline-none px-4 py-2 bg-transparent border border-black/40"
                    placeholder="Title"
                  />
                  <textarea 
                    placeholder="Caption"
                    onChange={(e) => setCaption(e.target.value)}
                    rows={6}
                    maxLength={300}
                    className="resize-none w-full outline-none px-4 py-2 bg-transparent border border-black/40 min-w-[10vh]"
                  />
                </div>
                <div className="flex justify-end gap-2 mt-20">
                  <button
                    onClick={handleDraft}
                    className="px-4 py-2 rounded-full bg-transparent"
                  >
                    Save to Draft
                  </button>
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
        </div>
      </section>
    </div>
  )
}