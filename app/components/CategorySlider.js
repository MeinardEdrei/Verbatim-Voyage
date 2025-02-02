"use client";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRef, useState, useEffect } from "react";

export default function CategorySlider({ 
  categories, 
  activeCategory, 
  setActiveCategory, 
  setCurrentPage,
  sliderRightButton,
  sliderWidth,
  loading,
}) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      setMaxScroll(container.scrollWidth - container.clientWidth);
    }
  }, [categories]);

  const slideRight = () => {
    const newPosition = scrollPosition + containerRef.current.children[0].offsetWidth;
    setScrollPosition(Math.min(newPosition, maxScroll));
  };

  const slideLeft = () => {
    const newPosition = scrollPosition - containerRef.current.children[0].offsetWidth;
    setScrollPosition(Math.max(newPosition, 0));
  };

  return (
    <div className="relative flex items-center">
      {scrollPosition !== 0 && (
        <button
          onClick={slideLeft}
          className="absolute ml-2 bg-[var(--slider-button)] p-2 rounded-full z-10"
        >
          <IoIosArrowBack />
        </button>
      )}

      <div className={`w-[70vw] xl:w-[${sliderWidth}%] overflow-hidden`}>
        <div 
          ref={containerRef} 
          className="flex xl:gap-5"
          style={{ transform: `translateX(-${scrollPosition}px)`, transition: "transform 0.3s ease" }}
        >
          <button
            className={`text-sm xl:text-base px-7 py-2 whitespace-nowrap ${
              activeCategory === "All" ? "border-b-2 border-[var(--button-selected)] font-semibold" : "bg-transparent"
            }`}
            onClick={() => {
              setCurrentPage(1);
              setActiveCategory("All");
            }}
          >
            All
          </button>
          { loading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <div key={index} className="animate-pulse bg-gray-200 px-7 py-2 rounded-lg"></div>
              ))}
            </>
          ) : categories?.map((item, index) => (
            <button
              key={index}
              className={`text-sm xl:text-base px-7 py-2 whitespace-nowrap ${
                activeCategory === item ? "border-b-2 border-[var(--button-selected)] font-semibold" : "bg-transparent"
              }`}
              onClick={() => {
                setCurrentPage(1);
                setActiveCategory(item);
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {scrollPosition !== maxScroll && (
        <button
          onClick={slideRight}
          className={`absolute ml-2 right-0 lg:right-${sliderRightButton} bg-[var(--slider-button)] p-2 rounded-full z-10`}
        >
          <IoIosArrowForward />
        </button>
      )}
    </div>
  );
}
