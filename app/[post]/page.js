"use client"
import { fetchThisStory } from "@/services/stories";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

const page = () => {
  const { post } = useParams();
  const [story, setStory] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const response = await fetchThisStory(post);

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
      <p>Post ID: {post}</p>
    </div>
  )
}

export default page
