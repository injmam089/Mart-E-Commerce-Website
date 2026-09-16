import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Shield, Users, Rocket, Target, Award, Globe } from 'lucide-react';
import { useRef } from 'react';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const Counter = ({ end, duration = 2, label, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      const animateCount = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      requestAnimationFrame(animateCount);
    }
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="card p-6 text-center bg-white dark:bg-dark-800 border border-gray-100 dark:border-dark-700 shadow-lg hover:-translate-y-1 transition-transform">
      <h3 className="text-4xl font-extrabold gradient-text mb-2">
        {count.toLocaleString()}{suffix}
      </h3>
      <p className="font-medium text-dark-600 dark:text-dark-400">{label}</p>
    </div>
  );
};

const About = () => {
  const teamMembers = [
    { name: 'Sarah Jenkins', role: 'CEO & Founder', bio: 'Former retail executive with 15 years of industry experience building digital brands.', image: 'https://picsum.photos/seed/sarah/200/200' },
    { name: 'Marcus Chen', role: 'Chief Technology Officer', bio: 'Tech visionary obsessed with creating seamless, blazing-fast user experiences.', image: 'https://picsum.photos/seed/marcus/200/200' },
    { name: 'Elena Rodriguez', role: 'Head of Design', bio: 'Award-winning designer ensuring every pixel on NovaMart is perfect.', image: 'https://picsum.photos/seed/elena/200/200' },
    { name: 'David Kim', role: 'VP of Operations', bio: 'Logistics master guaranteeing your packages arrive safely and on time.', image: 'https://picsum.photos/seed/david/200/200' },
  ];

  return (
    <motion.div 
      className="min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4 }}
    >
      {/* Hero Section */}
      <section className="py-20 md:py-28 text-center px-4 relative overflow-hidden bg-gray-50 dark:bg-dark-900 border-b border-gray-200 dark:border-dark-800">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] pointer-events-none"></div>
        <div className="container-custom relative z-10">
          <motion.h1 
            className="text-4xl md:text-6xl font-extrabold gradient-text mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            About NovaMart
          </motion.h1>
          <motion.p 
            className="text-xl text-dark-600 dark:text-dark-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Redefining the online shopping experience since 2020 with premium quality, unmatched variety, and customer-first design.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-dark-900 dark:text-dark-100 mb-6">Our Story</h2>
            <div className="space-y-4 text-dark-600 dark:text-dark-400 text-lg">
              <p>
                Founded in 2020 amidst a rapidly changing retail landscape, NovaMart was born from a simple idea: shopping online shouldn't feel like navigating a maze. We set out to build a platform that combines the aesthetics of luxury retail with the convenience of modern e-commerce.
              </p>
              <p>
                What started as a small curated collection of lifestyle products out of a tiny New York apartment has grown into a global marketplace. We now partner with over 100 premium brands across tech, fashion, and home goods.
              </p>
              <p>
                Our mission is to empower consumers with choice, quality, and a delightfully simple purchasing journey. Every product on NovaMart is vetted, and every interaction is designed with you in mind.
              </p>
            </div>
          </motion.div>
          <motion.div 
            className="rounded-2xl overflow-hidden shadow-2xl relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="https://picsum.photos/seed/novamart-story/800/600" alt="NovaMart Office" className="w-full h-auto object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/40 to-transparent"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-50 dark:bg-dark-800">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <Counter end={10000} suffix="+" label="Products Available" duration={2} />
            <Counter end={50000} suffix="+" label="Happy Customers" duration={2.5} />
            <Counter end={100} suffix="+" label="Partner Brands" duration={1.5} />
            <Counter end={4.9} suffix="/5" label="Average Rating" duration={1} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark-900 dark:text-dark-100 mb-4">Our Core Values</h2>
          <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">The principles that guide every decision we make.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Quality First', desc: 'We never compromise on quality. Every item is verified for authenticity and durability.' },
            { icon: Users, title: 'Customer Focus', desc: 'Your satisfaction is our north star. We offer 24/7 support and hassle-free returns.' },
            { icon: Rocket, title: 'Constant Innovation', desc: 'We continuously evolve our platform to bring you the fastest, most intuitive experience.' }
          ].map((value, idx) => (
            <motion.div 
              key={idx}
              className="card p-8 bg-white dark:bg-dark-800 text-center hover-lift"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="w-16 h-16 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6">
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-dark-900 dark:text-dark-100 mb-3">{value.title}</h3>
              <p className="text-dark-600 dark:text-dark-400">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50 dark:bg-dark-900 border-t border-gray-200 dark:border-dark-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-900 dark:text-dark-100 mb-4">Our Leadership</h2>
            <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">The passionate individuals driving NovaMart forward.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div 
                key={idx}
                className="card bg-white dark:bg-dark-800 overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 gap-4">
                    <a href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary-500 transition-colors">
                      <Globe className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-dark-900 dark:text-dark-100">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-dark-600 dark:text-dark-400 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden bg-primary-600 dark:bg-primary-900">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        <div className="container-custom relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start shopping?</h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto text-lg">Join thousands of satisfied customers and discover premium products curated just for you.</p>
          <Link to="/products" className="btn btn-lg bg-white text-primary-900 hover:bg-gray-100 shadow-xl border-none">
            Shop Now
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
