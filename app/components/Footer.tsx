import Link from "next/link";
import NowPlaying from "./parts/NowPlaying/NowPlaying";

const Footer = () => {
  return (
    <footer className="col-span-12 sm:col-start-1 sm:col-end-13 py-8 md:py-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 md:gap-8">
        <div className="flex flex-col gap-2">
          <div>
            <Link
              href="/changelog"
              className="text-sm text-figma-text-tertiary font-figma font-figma-medium hover:text-figma-text-primary transition-colors"
            >
              Changelog
            </Link>
          </div>
        </div>
        <div className="flex justify-start md:justify-end items-center w-full md:w-auto">
          <NowPlaying />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
