import React, { useState } from "react";
import { useEffect } from "react";
import { getHeroSlider } from "../../../API/Hero";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getHeroSlider().then((res) => setSlides(res));
  }, []);
  const nextSlide = () => setCurrent((current + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((current - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0  flex flex-col items-center justify-center text-center text-white px-4">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl mb-6">{slide.subtitle}</p>
            <button
              onClick={() => (window.location.href = "/products")}
              className="bg-[#d58a94] hover:bg-[#c27781] transition px-6 py-3 rounded-full text-white font-semibold"
            >
              Gooo to it
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold z-10"
      >
        ‹
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold z-10"
      >
        ›
      </button>
    </div>
  );
};

export default HeroSlider;
