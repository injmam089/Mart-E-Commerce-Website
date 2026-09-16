// HeroBanner - Full-width hero carousel
import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { HERO_SLIDES } from '../../utils/constants';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroBanner = () => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] group">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        navigation={{
          nextEl: '.swiper-button-next-hero',
          prevEl: '.swiper-button-prev-hero',
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {HERO_SLIDES.map((slide, index) => (
          <SwiperSlide key={slide.id || index} className="w-full h-full relative overflow-hidden">
            {({ isActive }) => (
              <>
                {/* Background Image & Gradient */}
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    transform: isActive ? 'scale(1.05)' : 'scale(1)'
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient || 'from-dark-900/90 to-transparent'}`} />

                {/* Content */}
                <div className="container-custom relative h-full flex flex-col justify-center">
                  <div className="max-w-2xl">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <h2 className="text-lg sm:text-xl font-semibold text-secondary-400 mb-2 sm:mb-4">
                        {slide.subtitle}
                      </h2>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 sm:mb-6">
                        {slide.title}
                      </h1>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <p className="text-base sm:text-lg text-gray-200 max-w-lg mb-8">
                        {slide.description}
                      </p>
                    </motion.div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    >
                      <Link to={slide.link} className="btn btn-lg btn-primary inline-flex items-center gap-2">
                        {slide.cta}
                        <ArrowRight className="w-5 h-5" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom Navigation Arrows */}
      <button className="swiper-button-prev-hero absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
      </button>
      <button className="swiper-button-next-hero absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
      </button>
    </div>
  );
};

export default HeroBanner;
