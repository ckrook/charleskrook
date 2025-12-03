import Image from "next/image";
import Link from "next/link";
import DesktopNav from "./DesktopNav";
import { BlockHeading } from "./parts/BlockHeading";
import { BlockParagraph } from "./parts/BlockParagraph";
import HamburgerMenu from "./HamburgerMenu";

const Header = () => {
  return (
    <header className="px-4 md:px-4 col-start-1 col-end-13 sm:col-start-2 sm:col-end-12 md:col-start-1 md:col-end-13 grid-cols-4 sm:grid-cols-8 py-3 md:py-4 gap-4 md:gap-6  md:grid flex justify-between">
      {/* Logo and Name */}
      <div className="col-span-3 sm:col-span-4 flex items-center gap-2 md:gap-4">
        <Link href="/" className="flex items-center gap-2 md:gap-4">
          <div className="w-[33px] h-[33px] md:w-[45px] md:h-[45px]">
            <Image
              src="/logo-avatar.png"
              alt="Charles Krook"
              className=" rounded-md"
              width={100}
              height={100}
            />
          </div>

          <div className="">
            <BlockHeading headingSize="h2" className="!leading-[20px]">
              Charles Krook
            </BlockHeading>
            <BlockParagraph className="!leading-[20px]">
              Fullstack engineer
            </BlockParagraph>
          </div>
        </Link>
      </div>
      <DesktopNav />

      <div className="md:hidden flex px-4">
        <HamburgerMenu />
      </div>
    </header>
  );
};

export default Header;
