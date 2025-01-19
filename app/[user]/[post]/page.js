"use client"
import { fetchThisStory } from "@/services/stories";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

const page = () => {
  const { user, post } = useParams();
  const [story, setStory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchThisStory({ user, post });

      if (response.status === 200) {
        setStory(response);
      } else {
        console.error(response.message);
      }
    }

    fetch();
  }, []);

  return (
    <div>
      <h1>Post by {user}</h1>
      <p>Post ID: {post}</p>
    </div>
  )
}

export default page
