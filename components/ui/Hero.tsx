"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  ctaText?: string;
  ctaLink?: string;
  isMain?: boolean;
}

export default function Hero({
  title,
  subtitle,
  imageSrc,
  ctaText,
  ctaLink,
  isMain = false,
}: HeroProps) {
  return (
    <div className={`relative ${isMain ? "h-screen min-h-[600px]" : "h-[40vh] min-h-[300px]"} flex items-center justify-center overflow-hidden`}>
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className="absolute inset-0 z-0 bg-primary/70 dark:bg-primary/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-4xl md:text-5xl ${isMain ? "lg:text-7xl" : "lg:text-6xl"} font-bold text-white tracking-tight mb-6`}
        >
          {title}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-lg md:text-xl text-slate-200 mb-8 max-w-2xl mx-auto ${isMain ? "" : "hidden md:block"}`}
        >
          {subtitle}
        </motion.p>
        
        {ctaText && ctaLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href={ctaLink}
              className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-light text-white font-semibold px-6 py-3 rounded-md transition-colors"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}
