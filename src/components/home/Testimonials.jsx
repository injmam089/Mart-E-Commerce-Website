// Testimonials - Customer testimonials carousel
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../utils/constants';

import 'swiper/css';
import 'swiper/css/pagination';

const Testimonials = () => {
  return (
    <section className="section-padding bg-white dark:bg-dark-900">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Real reviews from real people</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-14"
          >
            {TESTIMONIALS.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id || index} className="h-auto">
                <div className="card h-full p-6 sm:p-8 flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300">
                  <div>
                    <Quote className="w-10 h-10 text-primary-200 dark:text-primary-900/40 mb-4" />
                    
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-dark-600'}`} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-dark-600 dark:text-dark-300 italic mb-6 leading-relaxed">
                      "{testimonial.comment}"
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary-100 dark:border-primary-900/50"
                    />
                    <div>
                      <h4 className="font-semibold text-dark-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-dark-500 dark:text-dark-400">
                        {testimonial.role || 'Verified Buyer'}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
