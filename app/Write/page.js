"use client"
import { useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Quote from '@editorjs/quote';
import Delimiter from '@editorjs/delimiter';

const page = () => {

  useEffect(() => {
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
    });
  }, []);

  return (
    <div>
      <section className='flex justify-center mt-10'>
        <div className='w-[50vw]'>
          <div className='flex flex-col justify-center w-full'>
            <input 
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