"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef, useState, useEffect } from "react";

export default function CategorySlider({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  setCurrentPage 
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      setMaxScroll(container.scrollWidth - container.clientWidth);
    }
  }, []);

  const slideRight = () => {
    const newPosition = scrollPosition + containerRef.current.children[0].offsetWidth;
    setScrollPosition(Math.min(newPosition, maxScroll));
  };

  const slideLeft = () => {
    const newPosition = scrollPosition - containerRef.current.children[0].offsetWidth;
    setScrollPosition(Math.max(newPosition, 0));
  };

  return (
    <>
      {scrollPosition !== 0 && (
        <button
          onClick={slideLeft}
          className="absolute ml-2 bg-gray-200 p-2 rounded-full z-10"
        >
          <IoIosArrowBack />
        </button>
      )}

      <div className="w-[70%] overflow-hidden">
        <div 
          ref={containerRef} 
          className="flex gap-5"
          style={{ transform: `translateX(-${scrollPosition}px)`, transition: "transform 0.3s ease" }}
        >
          <button
            className={`px-7 py-2 rounded-full whitespace-nowrap ${
              activeCategory === "All" ? "bg-[var(--button-selected)] font-semibold" : "bg-transparent"
            }`}
            onClick={() => {
              setCurrentPage(1);
              setActiveCategory("All");
            }}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              className={`px-7 py-2 rounded-full whitespace-nowrap ${
                activeCategory === item.category ? "bg-[var(--button-selected)] font-semibold" : "bg-transparent"
              }`}
              onClick={() => {
                setCurrentPage(1);
                setActiveCategory(item.category);
              }}
            >
              {item.category}
            </button>
          ))}
        </div>
      </div>

      {scrollPosition !== maxScroll && (
        <button
          onClick={slideRight}
          className="absolute ml-2 right-[26%] bg-gray-200 p-2 rounded-full z-10"
        >
          <IoIosArrowForward />
        </button>
      )}
    </>
  );
}
