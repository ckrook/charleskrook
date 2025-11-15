"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { BlockParagraph } from "./BlockParagraph";
import { BlockHeading } from "./BlockHeading";

interface CardItemProps {
  title: string;
  subtitle: string;
  logoImageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
  bgColor?: string;
  industry?: string;
  rounded?: boolean;
  arrow?: boolean;
  linkUrl?: string;
  asLink?: boolean; // New prop to control whether to render as link
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
  arrow = false,
  linkUrl,
  asLink = true, // Default to true for backward compatibility
}: CardItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const content = (
    <div className="flex justify-between w-full" ref={cardRef}>
      <div className="flex items-center gap-4">
        <div className="relative overflow-hidden flex items-center justify-center">
          {logoImageUrl ? (
            <Image
              src={logoImageUrl}
              alt={`${title} image`}
              width={imageWidth}
              height={imageHeight}
              className={`w-auto h-auto rounded-xl mr-[11px] border border-stone-900 ${
                rounded ? "rounded-full" : ""
              }`}
              style={{ backgroundColor: bgColor }}
            />
          ) : (
            <div
              className="bg-figma-background-secondary rounded-full flex items-center justify-center text-xl"
              style={{ width: imageWidth, height: imageHeight }}
            >
              {title.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <BlockHeading headingSize="h3">{title}</BlockHeading>
          <BlockParagraph>{subtitle}</BlockParagraph>
        </div>
      </div>
      {arrow && (
        <Image src="/arrow.svg" alt="Arrow right" width={24} height={24} />
      )}
    </div>
  );

  // Conditionally render as link or div
  if (asLink && linkUrl) {
    return (
      <Link
        target="_blank"
        href={linkUrl}
        className="flex justify-between w-full"
      >
        {content}
      </Link>
    );
  }

  return <div className="flex justify-between w-full">{content}</div>;
};

export default CardItem;
