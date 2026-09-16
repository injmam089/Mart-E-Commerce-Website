import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { cn } from '../../utils/helpers';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// ProductImageGallery - Image gallery for product details page
const ProductImageGallery = ({ images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const fallbackImage = 'https://picsum.photos/seed/product/800/800';
  const displayImages = images && images.length > 0 ? images : [fallbackImage, fallbackImage + '?1', fallbackImage + '?2'];

  const handleMouseMove = (e) => {
    if (!isHovering) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Main Image Slider */}
      <div 
        className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50 dark:bg-dark-800 border border-gray-100 dark:border-dark-700"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full h-full"
        >
          {displayImages.map((src, index) => (
            <SwiperSlide key={index} className="w-full h-full cursor-crosshair">
              <div 
                className="w-full h-full overflow-hidden flex items-center justify-center"
              >
                <motion.img
                  key={`img-${index}`}
                  src={src}
                  alt={`Product View ${index + 1}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                  }}
                  className={cn(
                    "w-full h-full object-cover transition-transform duration-200",
                    isHovering ? "scale-150" : "scale-100"
                  )}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnails */}
      <div className="w-full h-20 sm:h-24 px-1">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          breakpoints={{
            640: { slidesPerView: 5 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="h-full py-1"
        >
          {displayImages.map((src, index) => (
            <SwiperSlide key={`thumb-${index}`} className="h-full">
              <div 
                className={cn(
                  "w-full h-full rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200",
                  activeIndex === index 
                    ? "border-primary-500 opacity-100" 
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <img 
                  src={src} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductImageGallery;
