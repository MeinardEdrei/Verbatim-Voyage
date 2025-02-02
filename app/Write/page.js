"use client"
import { useEffect, useRef, useState } from 'react';

import HeaderComponent from '../components/Header';
import PublishModal from './PublishModal';
import { fetchStories } from '@/services/stories';
import { uploadImage } from '@/services/cloud';
import { useUserSession } from '../utils/SessionContext';

const page = () => {
  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  const [tagsOptions, setTagsOptions] = useState([]);
  const titleRef = useRef(null);
  const editorRef = useRef(null);
  const editorInitialized = useRef(false);
  const modalRef = useRef(null);
  const session = useUserSession();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchStories();
      setTagsOptions(response);
    }

    fetch();
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [])

  const publish = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);

    const saveData = await editorRef.current.save();
    console.log('Save Data:', saveData);
    setContent( saveData );
  }

  const checkPublishStatus = async () => {
    const titleText = titleRef.current.value;
    setTitle(titleText);
    
    if(editorRef.current) {
      const saveData = await editorRef.current.save();
      const contentLength = saveData.blocks.length;
      
      setIsPublishDisabled(titleText === '' && contentLength === 0);
    }
  };

  useEffect(() => {
    checkPublishStatus();
  }, [title])

  useEffect(() => {
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

        editorRef.current = editor;
        
        await editor.isReady
        .then(() => {
          checkPublishStatus();
        })
        .catch((error) => {
          console.error("Editor initialization failed: ", error);
        });
      }
  
      initEditor();
      
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
  }, []);

  return (
    <div>
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
            modalRef={modalRef} 
            setIsModalOpen={setIsModalOpen}
            title={title}
            setTitle={setTitle}
            content={content}
            tagsOptions={tagsOptions}
          />
        )}
    </div>
  )
}

export default page