"use client";

import { useState, useEffect } from "react";
import styles from "./nowplaying.module.scss";
import { isNight, trimText } from "@/lib/helpers";
import { TbMusicOff } from "react-icons/tb";
import { BsFillMoonFill } from "react-icons/bs";
import Link from "next/link";

interface NowPlayingData {
  album?: string;
  albumImageUrl?: string;
  artist?: string;
  isPlaying?: boolean;
  songUrl?: string;
  title?: string;
}

export default function NowPlaying() {
  const [data, setData] = useState<NowPlayingData>({
    isPlaying: false,
    title: "",
    artist: "",
    songUrl: "",
  });

  const fetchNowPlaying = async () => {
    try {
      const res = await fetch("/api/now-playing");
      if (res.ok) {
        const newData = await res.json();
        setData(newData);
      }
    } catch (error) {
      console.error("Error fetching now playing:", error);
    }
  };

  useEffect(() => {
    // Fetch on initial load
    fetchNowPlaying();

    // Set up interval to refresh data
    const interval = setInterval(fetchNowPlaying, 60000); // Every minute

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  const nowPlaying = data?.isPlaying ? `${data?.title} - ${data?.artist}` : "";

  return (
    <div className="flex mt-2 justify-start">
      <div className="flex items-center gap-3 bg-stone-300 dark:bg-stone-700 py-1 px-4 rounded-full text-neutral-900 dark:text-neutral-100 font-medium transition-colors duration-200 border border-theme-light">
        {isNight() ? (
          <div className="flex font-medium gap-2 items-center">
            <div className="text-neutral-900 dark:text-neutral-100">
              Sleeping
            </div>
            <BsFillMoonFill className="text-neutral-900 dark:text-neutral-100" />
          </div>
        ) : data?.isPlaying ? (
          <Link
            href={data?.songUrl || "#"}
            className="no-underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex font-semibold text-sm items-center gap-2">
              {nowPlaying.length > 38 ? (
                <div className="text-neutral-900 dark:text-neutral-100">
                  {trimText(nowPlaying, 38)}
                </div>
              ) : (
                <div className="text-neutral-900 dark:text-neutral-100">
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
        ) : (
          <div className="flex font-medium gap-2 items-center">
            <div className="text-neutral-900 dark:text-neutral-100">
              Not listening to music
            </div>
            <TbMusicOff className="w-4 h-4 text-neutral-900 dark:text-neutral-100" />
          </div>
        )}
      </div>
    </div>
  );
}
