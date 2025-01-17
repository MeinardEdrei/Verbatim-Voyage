"use client"
import { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';
import HeaderComponent from '../components/Header';

const page = () => {
  const [isPublishDisabled, setIsPublishDisabled] = useState(false);
  const [editorInitialized, setEditorInitialized] = useState(false);
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);
  const titleRef = useRef(null);

  const publish = async () => {
    const saveData = await editorRef.current.save();
    console.log(saveData);
  }

  const checkPublishStatus = async () => {
    const titleText = titleRef.current.value.trim();
    setTitle(titleText);
    
    if(editorRef.current) {
      const saveData = await editorRef.current.save();
      const contentLength = saveData.blocks.length;
      
      setIsPublishDisabled(titleText === '' && contentLength === 0);
    }
  };

  useEffect(() => {
    checkPublishStatus();
  }, [title, editorRef])

  useEffect(() => {
    if (!editorInitialized) {
      const editor = new EditorJS({
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
                uploadByFile(file) {
                  // Image upload handling here
                }
              }
            }
          },
          quote: {
            class: Quote,
            inlineToolbar: true,
          },
          delimiter: {
            class: Delimiter,
          }
        },
        onChange: checkPublishStatus,
      });
      
      editor.isReady
      .then(() => {
        editorRef.current = editor;
        setEditorInitialized(true);
        checkPublishStatus();
      })
      .catch((error) => {
        console.error("Editor initialization failed: ", error);
      });
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
    </div>
  )
}

export default page