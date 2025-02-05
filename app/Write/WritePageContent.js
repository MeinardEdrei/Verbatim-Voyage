"use client"
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ClipLoader } from 'react-spinners';
import { fetchStories, fetchThisStory } from '@/services/stories';
import { uploadImage } from '@/services/cloud';
import { useUserSession } from '../utils/SessionContext';
import HeaderComponent from '../components/Header';
import PublishModal from './PublishModal';

export default function WritePageContent() {
  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState(null);
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [storyImage, setStoryImage] = useState('');
  const [tags, setTags] = useState([]);
  const [tagsOptions, setTagsOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [initialImages, setInitialImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const searchParams = useSearchParams();
  const storyId = searchParams.get('storyId');
  const titleRef = useRef(null);
  const editorRef = useRef(null);
  const editorInitialized = useRef(false);
  const session = useUserSession();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchStories();
      const stories = response.data;
      
      const allTags = stories.flatMap(story => story.tags || []);
      setTagsOptions([...new Set(allTags)]);

      if (storyId) {
        const response = await fetchThisStory(storyId);
        setTitle(response?.data?.title);
        setCaption(response?.data?.caption);
        setTags(response?.data?.tags);
        setContent({
          time: response?.data?.content[0]?.time,
          blocks: response?.data?.content[0]?.blocks,
          version: response?.data?.content[0]?.version
        });
        setStoryImage(response?.data?.image);
        setInitialImages(response?.data?.content[0].blocks
          .filter(block => block.type === 'image' && block.data?.file?.url)
          .map(block => block.data.file.url));
      }
      setLoading(false);
    }

    fetch();
  }, [])

  const publish = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);

    const saveData = await editorRef.current.save();
    setContent( saveData );
  }

  const checkPublishStatus = async () => {
    if (!titleRef.current) return;

    const titleText = titleRef.current.value;
    setTitle(titleText);
    
    if(editorRef.current) {
      const saveData = await editorRef.current.save();
      const contentLength = saveData.blocks.length;
      
      setIsPublishDisabled(titleText === '' && contentLength === 0);

      const currentImages = saveData.blocks
        .filter(block => block.type === 'image' && block.data?.file?.url)
        .map(block => block.data.file.url);

      const imagesToDelete = initialImages
        ?.filter(url => !currentImages.includes(url));

      if (imagesToDelete?.length) {
        setDeletedImages(prev => [
          ...new Set([...prev, ...imagesToDelete])
        ]);
      }
    }
  };

  useEffect(() => {
    checkPublishStatus();
  }, [title])

  useEffect(() => {
    if (storyId && content === null) return;

    if (editorInitialized.current) return;
    editorInitialized.current = true;

    try {
      let editor; 
      
      const initEditor = async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default;
        const Header = (await import('@editorjs/header')).default;
        const Paragraph = (await import('@editorjs/paragraph')).default;
        const List = (await import('@editorjs/list')).default;
        const ImageTool = (await import('@editorjs/image')).default;
        const Quote = (await import('@editorjs/quote')).default;
        const Delimiter = (await import('@editorjs/delimiter')).default;
        const Marker = (await import('@editorjs/marker')).default;
        const LinkTool = (await import('@editorjs/link')).default;

        editor = new EditorJS({
          holder: 'content-editor', 
          placeholder: 'Write your story...',
          data: content,
          tools: {
            header: {
              class: Header,
              inlineToolbar: true,
            },
            paragraph: {
              class: Paragraph,
              inlineToolbar: true,
            },
            list: {
              class: List,
              inlineToolbar: true,
            },
            image: {
              class: ImageTool,
              inlineToolbar: true,
              config: {
                uploader: {
                  async uploadByFile(file) {
                    try {
                      const imageUrl = await uploadImage({ file, session });
                      
                      return {
                        success: 1,
                        file: {
                          url: imageUrl,
                        },
                      };
                    } catch (error) {
                      console.error('Image upload failed:', error);
                      return {
                        success: 0,
                        message: 'Image upload failed.',
                      };
                    }
                  },
                }
              }
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
            },
            delimiter: {
              class: Delimiter,
            },
            marker: {
              class: Marker,
            },
            link: {
              class: LinkTool,
            }
          },
          onChange: checkPublishStatus,
        });
        
        await editor.isReady
        .then(() => {
          editorRef.current = editor;
          checkPublishStatus();
        })
        .catch((error) => {
          console.error("Editor initialization failed: ", error);
        });
      }
  
      initEditor().catch(console.error);

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
          editorInitialized.current = false;
        }
      }
    } catch (error) {
      console.error("Editor creation failed:", error);
    }
  }, [content, storyId]);

  return (
    <div>
      {loading && (
        <div className='fixed bg-white h-screen w-full inset-0 z-50 flex items-center justify-center'>
          <ClipLoader color='#000' size={35} />
        </div>
      )}
      <HeaderComponent publish={publish} isPublishDisabled={isPublishDisabled} />
      <section className='flex justify-center mt-10'>
        <div className='w-[50vw]'>
          <div className='flex flex-col justify-center w-full'>
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id='title'
              placeholder='Title'
              className='outline-none bg-transparent w-full text-4xl'
            />
            <div className='flex'>
              <div
                id='content-editor'
                className='w-full text-2xl'
              ></div>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <PublishModal
          setIsModalOpen={setIsModalOpen}
          title={title}
          setTitle={setTitle}
          content={content}
          tagsOptions={tagsOptions}
          caption={caption}
          setCaption={setCaption}
          tags={tags}
          setTags={setTags}
          storyImage={storyImage}
          storyId={storyId}
          deletedImages={deletedImages}
        />
      )}
    </div>
  )
}