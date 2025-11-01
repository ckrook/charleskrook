"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface NowPlayingClientProps {
  children: React.ReactNode;
}

const NowPlayingClient = ({ children }: NowPlayingClientProps) => {
  const router = useRouter();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Refresh the server component every 5 seconds to get live updates
    intervalRef.current = setInterval(() => {
      router.refresh();
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [router]);

  return <>{children}</>;
};

export default NowPlayingClient;
