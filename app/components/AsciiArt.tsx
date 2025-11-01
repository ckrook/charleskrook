"use client";
import { useCallback, useEffect, useRef, useState } from "react";

type AsciiArtProps = {
  src: string;
  width: number;
  height: number;
  fontSize?: number;
  isVideo?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

export const AsciiArt = ({
  src,
  width,
  height,
  fontSize = 12,
  isVideo = false,
  autoPlay = true,
  loop = true,
  muted = true,
}: AsciiArtProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const asciiContainerRef = useRef<HTMLDivElement | null>(null);
  const measurmentCharRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [asciiSize, setAsciiSize] = useState<{
    x: number | null;
    y: number | null;
  }>({ x: null, y: null });

  const density = "#@#W$9876543210?!abc;:+=-,._          ";

  const generateAsciiArt = useCallback(
    (source: HTMLImageElement | HTMLVideoElement) => {
      const canvas = canvasRef.current;
      if (!canvas || asciiSize.x === null || asciiSize.y === null) return;

      // Store the values in local variables to ensure TypeScript knows they're not null
      const charWidth = asciiSize.x;
      const charHeight = asciiSize.y;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(source, 0, 0, width, height);
      const pixels = ctx.getImageData(0, 0, width, height).data;
      const asciiWidth = Math.floor(width / charWidth);
      const asciiHeight = Math.floor(height / charHeight);
      let asciiImage = "";
      for (let j = 0; j < asciiHeight; j++) {
        for (let i = 0; i < asciiWidth; i++) {
          const x = Math.floor(i * (width / asciiWidth));
          const y = Math.floor(j * (height / asciiHeight));
          const pixelIndex = (x + y * width) * 4;
          const r = pixels[pixelIndex + 0];
          const g = pixels[pixelIndex + 1];
          const b = pixels[pixelIndex + 2];
          const avg = 255 - (r + g + b) / 3;
          const len = density.length;
          const charIndex = Math.floor((avg / 255) * len);
          const c = density.charAt(charIndex);
          asciiImage += c === " " ? "&nbsp;" : c;
        }
        asciiImage += "<br/>";
      }
      if (asciiContainerRef.current) {
        asciiContainerRef.current.innerHTML = asciiImage;
      }
    },
    [asciiSize.x, asciiSize.y, width, height, density]
  );

  useEffect(() => {
    if (measurmentCharRef.current) {
      const rect = measurmentCharRef.current.getBoundingClientRect();
      setAsciiSize({ x: rect.width, y: rect.height });
    }
  }, [fontSize]);

  useEffect(() => {
    if (asciiSize.x === null || asciiSize.y === null) return;

    if (isVideo) {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedData = () => {
        generateAsciiArt(video);
      };

      const handleTimeUpdate = () => {
        generateAsciiArt(video);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    } else {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        generateAsciiArt(image);
      };
    }
  }, [src, width, height, asciiSize, isVideo, generateAsciiArt]);

  return (
    <div
      style={{ fontSize }}
      className="relative w-full h-full overflow-hidden"
    >
      {(asciiSize.x === null || asciiSize.y === null) && (
        <div ref={measurmentCharRef} className="font-mono opacity-0 absolute">
          M
        </div>
      )}
      <div
        ref={asciiContainerRef}
        className="font-mono leading-none text-stone-400"
        style={{ width, height }}
      />
      <canvas ref={canvasRef} className="hidden" />
      {isVideo && (
        <video
          ref={videoRef}
          src={src}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          className="hidden"
          playsInline
        />
      )}
    </div>
  );
};
