"use client";

import Image from "next/image";
import { useRef } from "react";

interface CardItemProps {
  title: string;
  subtitle: string;
  logoImageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  bgColor?: string;
  industry?: string;
  rounded?: boolean;
}

const CardItem = ({
  title,
  subtitle,
  logoImageUrl,
  imageWidth = 48,
  imageHeight = 48,
  bgColor,
  industry,
  rounded = false,
}: CardItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex w-full" ref={cardRef}>
      <div className="flex items-center">
        <div className="relative overflow-hidden flex items-center justify-center">
          {logoImageUrl && (
            <Image
              src={logoImageUrl}
              alt={`${title} image`}
              width={imageWidth}
              height={imageHeight}
              className={`w-auto h-auto rounded-figma-sm mr-[11px] border border-figma-border-primary ${
                rounded ? "rounded-full" : ""
              }`}
              style={{ backgroundColor: bgColor }}
            />
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-figma-regular leading-6 text-figma-text-primary text-figma-base font-figma">
            {title}
          </h3>
          <p className="leading-6 text-figma-text-secondary text-figma-base font-figma font-figma-regular">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
