"use client"

import { CiSearch } from "react-icons/ci";
import { HiOutlineX } from "react-icons/hi";

const searches = [
  { id: 1, name: "Hello" },
  { id: 2, name: "AOk" },
  { id: 3, name: "Ajdjnsdfknskd" },
];

const page = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full mt-10">
        <div className="group flex items-center bg-[#f1f1f1] px-4 py-2 rounded-full text-base outline-none focus-within:ease-in-out focus-within:duration-200">
          <CiSearch className="mr-4 text-2xl text-gray-500 group-focus-within:text-black" />
          <input 
            className="bg-transparent outline-none text-sm w-full"
            placeholder="Search"
          />
        </div>
        <div className="flex flex-col mt-10 ml-3 mr-3">
          <h2 className="font-bold">
            Recent Searches
          </h2>
          <div className="flex flex-col gap-10 mt-5 w-full">
            {searches.map((search) => (
              <div key={search.id}
                className="flex justify-between"
              >
                <p className="text-gray-500 text-sm">{search.name}</p>
                <button
                >
                  <HiOutlineX className="text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
