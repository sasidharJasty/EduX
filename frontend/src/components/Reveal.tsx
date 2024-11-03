import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { InView } from "react-intersection-observer";

interface RevealTextProps {
  text: string;
}

const RevealText: React.FC<RevealTextProps> = ({ text }) => {
  const words = text.split(" ");
  const [visibleWords, setVisibleWords] = useState(0);
  const controls = useAnimation();

  // Trigger animation as words come into view
  useEffect(() => {
    controls.start((i) => ({
      opacity: i < visibleWords ? 1 : 0,
      transition: { duration: 0.3 },
    }));
  }, [visibleWords, controls]);

  const handleScroll = (inView: boolean) => {
    if (inView && visibleWords < words.length) {
      setVisibleWords((prev) => prev + 1);
    }
  };

  return (
    <div style={{ position: "fixed", top: "40%", left: "10%", width: "80%" }}>
      <InView as="div" onChange={handleScroll}>
        {words.map((word, index) => (
          <motion.span
            key={index}
            custom={index}
            initial={{ opacity: 0 }}
            animate={controls}
            style={{ marginRight: "8px", display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </InView>
    </div>
  );
};

export default RevealText;
