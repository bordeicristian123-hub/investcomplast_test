import React, { useRef, useEffect, useState } from 'react';

interface HeroVideoProps {
  src: string;
  overlayOpacity?: number;
}

const HeroVideo: React.FC<HeroVideoProps> = ({ src, overlayOpacity = 0.4 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // Autoplay might be blocked — that's okay
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        onCanPlayThrough={() => setIsLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms]"
        style={{ opacity: isLoaded ? 1 : 0 }}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80"
        style={{ opacity: overlayOpacity + 0.6 }}
      />

      {/* Subtle blue tint overlay */}
      <div className="absolute inset-0 bg-blue-950/30 mix-blend-multiply" />

      {/* Noise texture for premium grain effect */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default HeroVideo;
