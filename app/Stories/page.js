"use client"

import { useState, useEffect } from "react";
import { useUserSession } from "../utils/SessionContext";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState('Published');
  const [stories, setStories] = useState([]);
  const { userSession } = useUserSession();

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchUserStories(userSession.id);

      if (response.status === 200) {
        setStories(response.data);
        setLoading(false);
      } else {
        alert(response.message);
      }
    }

    fetch();
  }, [])

  return (
    <div className={loading ? `hidden` : `flex justify-center`}>
      <section className="w-11/12 xl:w-[60%] mt-10">
        <div>
          <h2 className="text-2xl xl:text-3xl font-semibold">Stories</h2>
        </div>
        <div className="flex xl:gap-2 mt-5">
          <button 
            onClick={() => handleAllNotifications()}
            className={`${activeButton === "Published" ? "bg-[var(--topics)] font-semibold" : ""} py-2 px-7 xl:py-2 text-sm xl:text-base rounded-full`}>Published</button>
          <button 
            onClick={() => handleAllNotifications()}
            className={`${activeButton === "Draft" ? "bg-[var(--topics)] font-semibold" : ""} py-2 px-7 xl:py-2 text-sm xl:text-base rounded-full`}>Draft</button>
          <button 
            onClick={() => handleResponsesNotifications()}
            className={`${activeButton === "Responses" ? "bg-[var(--topics)] font-semibold" : ""} py-2 px-7 xl:py-2 text-sm xl:text-base rounded-full`}>Responses</button>
        </div>
        <div>

        </div>
      </section>
    </div>
  )
}

export default page
