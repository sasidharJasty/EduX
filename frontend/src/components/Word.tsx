import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface WordByWordGradientProps {
  text: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  className?: string;
}

const Word: React.FC<WordByWordGradientProps> = ({
  text,
  gradientFrom = 'from-purple-400',
  gradientVia = 'via-pink-500',
  gradientTo = 'to-red-500',
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const words = text.split(" ");

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100" ref={ref}>
      <motion.p className={`text-4xl md:text-6xl font-bold text-center flex flex-wrap gap-2 ${className}`}>
        {words.map((word, index) => {
          const start = index / words.length;
          const end = start + 1 / words.length;
          const opacity: MotionValue<number> = useTransform(scrollYProgress, [start, end], [1, 0]);

          return (
            <motion.span
              key={index}
              style={{ opacity }}
              className={`text-transparent bg-clip-text bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo}`}
            >
              {word}
            </motion.span>
          );
        })}
      </motion.p>
      <div className="h-[200vh]" />
    </div>
  );
};

export default Word;
