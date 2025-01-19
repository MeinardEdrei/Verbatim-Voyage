"use client"
import { useParams } from "next/navigation"

const page = () => {
  const { user, post } = useParams();

  return (
    <div>
      <h1>Post by {user}</h1>
      <p>Post ID: {post}</p>
    </div>
  )
}

export default page
