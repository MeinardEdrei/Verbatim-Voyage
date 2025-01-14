import { useEffect, useState } from "react"

const useTopStories = (stories, topCount) => {
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    const sortedStories = [...stories].sort((a, b) => {
      const aStory = a.likesCount + a.commentsCount;
      const bStory = b.likesCount + b.commentsCount;
      return bStory - aStory;
    });
    setTopStories(sortedStories.slice(0, topCount));
  }, [stories, topCount]);

  return topStories;
};

export default useTopStories
