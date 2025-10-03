import React, { useState, useEffect } from 'react';

const banners = [
  'https://i.postimg.cc/Pq0qsHHw/Picsart-25-10-03-16-00-25-027.jpg',
  'https://i.postimg.cc/Kj2vj5RM/20251003-160122-0000.png',
  'https://i.postimg.cc/prHXrBp9/20251003-160256-0000.png',
  'https://i.postimg.cc/MTRpzLK2/20251003-160650-0000.png',
  'https://i.postimg.cc/rsNyrtr5/Untitled-design-20251003-160811-0000.png',
  'https://i.postimg.cc/4ygNy1mm/Untitled-design-20251003-160845-0000.png',
  'https://i.postimg.cc/QC3xCqHd/Untitled-design-20251003-160919-0000.png'
];

export const BannerCarousel: React.FC = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full overflow-hidden">
      <div className="relative w-full h-40 md:h-64 rounded-lg overflow-hidden shadow-lg">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ${
              index === currentBanner ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </div>
        ))}
        
        {/* Indicator dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {banners.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentBanner 
                  ? 'w-6 bg-white shadow-lg' 
                  : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
