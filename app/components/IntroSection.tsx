"use client";

import Image from "next/image";

export default function IntroSection() {
  return (
    <section className="py-8 md:py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal leading-tight tracking-tight dark:text-white">
          Charles is a Stockholm based software engineer at Umain whose work
          takes form in{" "}
          <span
            className="italic font-serif inline-block relative"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#F91414",
              textDecorationThickness: "2px",
              textUnderlineOffset: "4px",
            }}
          >
            e-commerce
          </span>{" "}
          sites, multibrand{" "}
          <span
            className="italic font-serif inline-block relative"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#F91414",
              textDecorationThickness: "2px",
              textUnderlineOffset: "4px",
            }}
          >
            designsystem
          </span>{" "}
          and{" "}
          <span
            className="italic font-serif inline-block relative"
            style={{
              textDecoration: "underline",
              textDecorationColor: "#F91414",
              textDecorationThickness: "2px",
              textUnderlineOffset: "4px",
            }}
          >
            content
          </span>{" "}
          websites.
          <Image
            src="/pixelheart.png"
            alt="Pixelheart"
            width={40}
            height={40}
            className="inline-block w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ml-2 align-middle"
          />
        </h1>
      </div>
    </section>
  );
}
