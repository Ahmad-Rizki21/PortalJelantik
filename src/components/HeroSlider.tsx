"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  {
    src: "/images/pexels-userpascal-33513532.jpg",
    alt: "Internet cepat untuk keluarga",
  },
  {
    src: "/images/brand-ambassador.png",
    alt: "Layanan Jelantik Terpercaya",
  },
];

export default function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative group w-full h-full">
      <div className="aspect-4/5 rounded-[3rem] overflow-hidden shadow-2xl rotate-3 group-hover:rotate-0 transition-all duration-700 bg-orange-50 relative">
        {images.map((image, index) => (
          <div
            key={image.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Slider Indicators */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-blue-600 w-8" 
                : "bg-blue-200 hover:bg-blue-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 top-8 -right-8 w-72 h-72 bg-blue-200/50 rounded-full blur-3xl opacity-50 animate-pulse"></div>
      <div className="absolute -z-10 -bottom-8 -left-8 w-64 h-64 bg-orange-200/50 rounded-full blur-3xl opacity-50"></div>
    </div>
  );
}
