import { cn } from "../../../lib/utils";

interface BlockParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export const BlockParagraph = ({
  children,
  className,
}: BlockParagraphProps) => {
  return (
    <p
      className={cn(
        "text-md font-figma font-figma-medium text-figma-text-secondary",
        className
      )}
    >
      {children}
    </p>
  );
};
