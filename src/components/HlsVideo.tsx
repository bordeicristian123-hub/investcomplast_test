import Hls from 'hls.js';
import { useEffect, useRef } from 'react';

interface HlsVideoProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  desaturated?: boolean;
}

export const HlsVideo = ({
  src,
  className = '',
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  desaturated = false,
}: HlsVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        if (autoPlay) video.play().catch(() => {});
      });
      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      video.addEventListener('loadedmetadata', () => {
        if (autoPlay) video.play().catch(() => {});
      });
    }
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      className={`${className} ${desaturated ? 'saturate-0' : ''}`}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
    />
  );
};
