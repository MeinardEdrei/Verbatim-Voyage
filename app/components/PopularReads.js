"use client"
import Image from "next/image";
import Link from "next/link"
import { MdArrowOutward } from "react-icons/md";

const PopularReads = ({ popular, categories, stories, loading }) => {
  return (
    <section className="hidden xl:block sticky top-0 h-screen border-l-black/30 mt-5">
      <div className="flex flex-col gap-20 m-5">
        <div>
          <h2 className="font-bold">Popular Reads</h2>
          <div>
            { loading ? (
              <div className="mt-5">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse bg-gray-200 rounded-lg h-[10vh] mb-2 w-full"></div>
                ))}
              </div>
            ) : popular.map((item) => (
              <Link href={`/${item._id}`} key={item._id} className="flex gap-3 mt-5">
                <div className="flex flex-col justify-center">
                  <div className="flex gap-3 items-center mb-2">
                    <Image 
                      src={item.author.image || 'https://github.com/shadcn.png'}
                      alt="Profile"
                      width={25}
                      height={25}
                      className="rounded-full"
                    />
                    <h2 className="font-medium text-xs capitalize">{item.author.name}</h2>
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-ellipsis line-clamp-2 overflow-hidden">{item.title}</h2>
                    <p className="text-xs text-[var(--published-date)]">{new Date(item.createdAt).toLocaleDateString('en-us', {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-bold mb-4">Recommended Topics</h2>
          <div className="flex flex-wrap w-[20vw] gap-3">
            { loading ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse bg-gray-200 px-7 py-2 rounded-lg"></div>
                ))}
              </>
            ) : categories?.length > 0 ? (
              categories.slice(0, 7).map((item, index) => (
                <button key={index}
                  onClick={() => setActiveCategory(item)}
                  className="bg-[var(--topics)] capitalize rounded-full hover:text-[var(--topics-hover)] px-4 py-2 font-medium text-sm"
                >
                  {item}
                </button>
              ))
            ) : categories?.length === 0 && stories.length === 0 ? (
              <div key="loading" className="bg-gray-200 rounded-2xl animate-pulse"></div>
            ) : (
              <div key="no-stories" className="col-start-2 flex justify-center items-center h-[20vh] text-gray-600">
                No topics yet.
              </div>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-[var(--copyright)] text-sm">@2025 Verbatim Voyage. All rights reserved.</h2>
          <Link href="/" className="border text-sm mt-4 border-[var(--copyright-border)] p-2 rounded-full flex justify-center items-center">
            Made by Meinard Edrei S.&nbsp;
            <MdArrowOutward className="text-xl"/>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default PopularReads
