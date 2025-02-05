"use client"
import { useEffect, useState } from "react";
import { RiInformation2Line } from "react-icons/ri";
import { createStory, updateStory } from '@/services/stories';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { deleteImage, uploadImage } from "@/services/cloud";
import { useUserSession } from "../utils/SessionContext";
import { useRouter } from "next/navigation";

export default function PublishModal({ 
    setIsModalOpen, 
    title, setTitle, 
    content, 
    tagsOptions, 
    caption,
    setCaption,
    tags,
    setTags,
    storyImage,
    storyId,
    deletedImages
  }) {
  const [file, setFile] = useState(null);
  const [isMissingFields, setIsMissingFields] = useState(false);
  const session = useUserSession();
  const router = useRouter();

  useEffect(() => {
    if (!title || !(content?.blocks?.length > 0) || !caption || !(tags.length > 0) || (!file && !(storyImage.length > 0))) {
      setIsMissingFields(true);
    } else {
      setIsMissingFields(false);
    }
  }, [title, content, caption, tags, storyImage, file]);
  
  const handleDraft = async () => {
    try {
      let imageUrl = storyImage;
      if (file) {
        imageUrl = await uploadImage({ file, session });
      }

      const deletionPromises = deletedImages.map(async (url) => {
        await deleteImage({
          image_url: url,
          session: session
        });
      });

      await Promise.all(deletionPromises);

      const storyData = {
        image: imageUrl,
        title,
        caption,
        author: session?.userSession?.id,
        content,
        tags,
        status: 'draft'
      };

      const response = storyId 
        ? await updateStory(storyId, storyData)
        : await createStory(storyData);

      if (response.status === 200) {
        alert(storyId ? "Draft updated" : "Saved to draft");
        router.push('/');
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.error("Draft save error: ", error);
    }
  }

  const handlePublish = async () => {
    try {
      let imageUrl = storyImage;
      if (file) {
        imageUrl = await uploadImage({ file, session });
      }

      const deletionPromises = deletedImages.map(async (url) => {
        await deleteImage({
          image_url: url,
          session: session
        });
      });

      await Promise.all(deletionPromises);

      const storyData = {
        image: imageUrl,
        title,
        caption,
        author: session.userSession.id,
        content,
        tags,
        status: "published",
      };

      const response = storyId 
        ? await updateStory(storyId, storyData)
        : await createStory(storyData);

      if (response.status === 200) {
        alert(storyId ? "Story updated successfully" : "Published successfully");
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
                  ) : storyImage ? (
                    <img 
                      src={storyImage}
                      className="w-full h-full object-contain"
                      alt="Story Image"
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
                    defaultValue={caption}
                    placeholder="Caption"
                    onChange={(e) => setCaption(e.target.value)}
                    rows={6}
                    maxLength={300}
                    className="resize-none w-full outline-none px-4 py-2 bg-transparent border border-black/40 min-w-[10vh]"
                  />
                </div>
                { isMissingFields && (
                  <div className="bg-yellow-100 flex flex-col p-2 mb-2">
                    <h2 className="flex items-center font-bold gap-2"><RiInformation2Line /> Incomplete Story Details</h2>
                    <p>Your story is missing details—complete it to bring it to life!</p>
                  </div>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleDraft}
                    className="px-4 py-2 rounded-full bg-transparent"
                  >
                    Save to Draft
                  </button>
                  <button
                    disabled={isMissingFields}
                    onClick={handlePublish}
                    className={isMissingFields ? `opacity-50 bg-black px-4 py-2 rounded-full text-white` : `px-4 py-2 rounded-full bg-black text-white`}
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