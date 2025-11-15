import { cn } from "../../../lib/utils";

interface BlockHeadingProps {
  children: React.ReactNode;
  className?: string;
  headingSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const BlockHeading = ({
  children,
  className,
  headingSize = "h2",
}: BlockHeadingProps) => {
  const baseClasses =
    "text-md font-figma font-figma-medium text-figma-text-primary";

  const HeadingTag = headingSize;

  return (
    <HeadingTag className={cn(baseClasses, className)}>{children}</HeadingTag>
  );
};
