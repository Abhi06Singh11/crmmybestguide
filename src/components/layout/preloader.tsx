'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const useTypewriter = (text: string, speed = 60) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting) {
        if (index < text.length) {
          setDisplayText((prev) => prev + text.charAt(index));
          setIndex((prev) => prev + 1);
        } else {
          // Pause at the end
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        if (index > 0) {
          setDisplayText((prev) => prev.substring(0, prev.length - 1));
          setIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
        }
      }
    };

    const timeout = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed]);

  return displayText;
};

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const taglineText = useTypewriter("We Build. You Grow. Simple..!");

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Minimum display time

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="preloader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onAnimationComplete={() => {
            document.body.style.overflow = 'auto';
          }}
        >
          <svg className="h-auto w-[140px]" viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="preloader_gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
            <path
              d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
              strokeWidth="5"
              stroke="hsl(var(--primary))"
              className="opacity-10"
              fill="none"
            ></path>
            <path
              d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"
              strokeWidth="5"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
              stroke="url(#preloader_gradient)"
              className="animate-preloader-anim [filter:drop-shadow(0_0_8px_hsl(var(--primary)/0.7))]"
            ></path>
          </svg>
          <div className="mt-[25px] font-headline text-3xl font-bold tracking-wider text-foreground">
            MyBestGuide
          </div>
          <div className="mt-[10px] h-5 min-w-[1px] whitespace-nowrap border-r-2 border-accent text-sm text-muted-foreground animate-blinkCursor">
            {taglineText}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
