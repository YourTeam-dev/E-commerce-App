import React, { useState } from "react";

const ImageContainer = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const baseUrl = process.env.REACT_APP_IMAGE_URL;
  const nextSlide = () => setCurrent((current + 1) % images.length);
  const prevSlide = () =>
    setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="w-full p-5 bg-[#f9f9f9] rounded-[10px] flex flex-col items-center shadow-[0_0_10px_rgba(0,0,0,0.2)] mb-3">
      <div className="relative w-full max-w-[1000px] h-[400px] overflow-hidden rounded-[10px]">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={`${baseUrl}${img}`}
              alt={`Product ${index}`}
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-white text-3xl font-bold bg-black/50 w-[30px] h-[30px] rounded-full flex items-center justify-center z-20"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white text-3xl font-bold bg-black/50 w-[30px] h-[30px] rounded-full flex items-center justify-center z-20"
        >
          ›
        </button>
      </div>

      <div className="mt-5 flex gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={`${baseUrl}${img}`}
            alt={`Thumbnail ${index}`}
            onClick={() => setCurrent(index)}
            className={`w-[80px] h-[80px] object-cover rounded-md cursor-pointer border-2 transition-opacity duration-300 ${
              index === current
                ? "border-black opacity-100"
                : "border-transparent opacity-40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageContainer;
