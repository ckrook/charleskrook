"use client";

import Image from "next/image";
import { useRef } from "react";

type CardItemProps = {
  title: string;
  subtitle: string;
  logoImageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  bgColor?: string;
};

export default function CardItem({
  title,
  subtitle,
  logoImageUrl,
  imageWidth = 48,
  imageHeight = 48,
  bgColor,
}: CardItemProps) {
  const cardRef = useRef<HTMLLIElement>(null);

  return (
    <li className="flex w-full" ref={cardRef}>
      <div className="flex items-center">
        <div className="relative overflow-hidden flex items-center justify-center">
          {logoImageUrl && (
            <Image
              src={logoImageUrl}
              alt={`${title} image`}
              width={imageWidth}
              height={imageHeight}
              className="w-auto h-auto rounded-[10px] mr-[11px] border border-neutral-200 dark:border-neutral-800"
              style={{ backgroundColor: bgColor }}
            />
          )}
        </div>
        <div className="flex flex-col">
          <h3 className="font-medium leading-6">{title}</h3>
          <p className="leading-6">{subtitle}</p>
        </div>
      </div>
    </li>
  );
}
