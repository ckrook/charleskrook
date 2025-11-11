import { getRecentlyPlayed } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await getRecentlyPlayed();

  if (response.status > 400) {
    return NextResponse.json({ hasData: false });
  }

  const data = await response.json();

  if (!data.items || data.items.length === 0) {
    return NextResponse.json({ hasData: false });
  }

  // Get the most recent track (first item in the array)
  const recentTrack = data.items[0];
  const track = recentTrack.track;

  const title = track.name;
  const artist = track.artists.map((_artist: any) => _artist.name).join(", ");
  const album = track.album.name;
  const albumImageUrl = track.album.images[0]?.url;
  const songUrl = track.external_urls.spotify;
  const playedAt = recentTrack.played_at;

  return NextResponse.json(
    {
      album,
      albumImageUrl,
      artist,
      hasData: true,
      songUrl,
      title,
      playedAt,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    }
  );
}
