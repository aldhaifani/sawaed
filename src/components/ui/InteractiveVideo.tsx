"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const InteractiveVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const { innerWidth } = window;
      // Map mouse position from -1 to 1
      const xPercent = (clientX / innerWidth - 0.5) * 2;

      // Define the maximum movement in pixels
      const movementRange = 40;

      gsap.to(video, {
        x: xPercent * movementRange,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="/vid.mp4"
      autoPlay
      loop
      muted
      className="mb-4 w-1/3 rounded-lg shadow-2xl"
    />
  );
};

export default InteractiveVideo;
