"use client";

import { useState, useEffect } from "react";
import styles from "./nowplaying.module.scss";
import { trimText } from "@/lib/helpers";
import Link from "next/link";

interface NowPlayingData {
  album?: string;
  albumImageUrl?: string;
  artist?: string;
  hasData?: boolean;
  songUrl?: string;
  title?: string;
  playedAt?: string;
}

const NowPlaying = () => {
  const [data, setData] = useState<NowPlayingData>({
    hasData: false,
    title: "",
    artist: "",
    songUrl: "",
  });

  const fetchLatestPlaying = async () => {
    try {
      const res = await fetch("/api/now-playing");
      if (res.ok) {
        const newData = await res.json();
        setData(newData);
      }
    } catch (error) {
      console.error("Error fetching latest playing:", error);
    }
  };

  useEffect(() => {
    // Fetch on initial load
    fetchLatestPlaying();

    // Set up interval to refresh data
    const interval = setInterval(fetchLatestPlaying, 60000); // Every minute

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  // If no data, don't render anything
  if (!data?.hasData) {
    return null;
  }

  const nowPlaying = `${data?.title} - ${data?.artist}`;

  return (
    <div className="flex mt-2 justify-center">
      <div className="flex items-center gap-3  rounded-full text-neutral-900 dark:text-neutral-100 font-medium transition-colors duration-200 ">
        <Link
          href={data?.songUrl || "#"}
          className="no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex font-medium text-xs items-center gap-2 ">
            {nowPlaying.length > 38 ? (
              <div className="text-stone-500 dark:text-gray-300">
                {trimText(nowPlaying, 38)}
              </div>
            ) : (
              <div className="text-stone-500 dark:text-gray-300">
                {nowPlaying}
              </div>
            )}
            <div className={`${styles.icon} ${styles.darkModeEnabled}`}>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
              <span className={styles.bar}></span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NowPlaying;
