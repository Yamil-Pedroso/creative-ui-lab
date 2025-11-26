"use client";

import React, { useRef, useEffect } from "react";

interface VideoCompProps {
  videoUrl: string;
  width?: number;
  height?: number;
  className?: string;
  speed?: number; // 👈 nueva prop para controlar velocidad
}

const VideoComp: React.FC<VideoCompProps> = ({
  videoUrl,
  width,
  height,
  className,
  speed = 0.8, // 👈 por defecto el video será 50% más lento
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  }, [speed]);

  return (
    <div className={className}>
      <video
        ref={videoRef}
        src={videoUrl}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        className="smooth-loop"
      />
    </div>
  );
};

export default VideoComp;
