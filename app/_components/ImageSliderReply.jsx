import { useState } from "react";
import styles from "./ImageSliderReply.module.css"

export default function ImageSliderReply({ images }) {
  console.log(images, "images");

  const [currentIndex, setIndex] = useState(0);

  // Go to next slide
  function nextSlide() {
    if (currentIndex < images.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  }

  // Go to previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  }

  return (
    <div className="relative border-1">
      <div className={`flex overflow-hidden  gap-2 ${styles.VideoContainer} py-2`}>
        <div
          className="flex gap-2 transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {images.map((el, idx) => (
            <div
              key={idx}
              className={`flex-shrink-0  ${styles.Video} translate-x-[-${idx*100}%]  h-[250px] relative rounded overflow-hidden`}
            >
              {el.type === "video" ? (
                <video controls className="w-full h-full object-cover">
                  <source src={el.url} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={el.url}
                  alt="tweet media"
                  className="w-full h-full object-cover"
                />
              )}



            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className="absolute top-[50%] left-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded"
      >
        &larr;
      </button>
      <button
        onClick={prevSlide}
        className="absolute top-[50%] right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded"
      >
        &rarr;
      </button>
    </div>
  );
}
