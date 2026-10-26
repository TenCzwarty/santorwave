import { type NextRequest, NextResponse } from "next/server";

/**
 * Deezer Search API Proxy
 *
 * Proxies search requests to Deezer's API to bypass CORS restrictions.
 * No authentication required - Deezer's search API is public.
 *
 * Usage: /api/deezer/search?q=artist+name&limit=12
 */

const MAX_LIMIT = 50;

type DeezerTrack = {
  id: number;
  title: string;
  preview: string;
  artist: {
    id: number;
    name: string;
  };
  album: {
    id: number;
    title: string;
    cover_medium: string;
  };
};

type DeezerSearchResponse = {
  data: DeezerTrack[];
  total: number;
  error?: {
    type: string;
    message: string;
  };
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");
  // Clamp: the value is passed straight on to Deezer.
  const requestedLimit = Number(searchParams.get("limit") ?? 12);
  const limit = String(
    Number.isInteger(requestedLimit)
      ? Math.min(Math.max(requestedLimit, 1), MAX_LIMIT)
      : 12,
  );

  if (!query) {
    return NextResponse.json(
      { error: "Missing 'q' query parameter" },
      { status: 400 }
    );
  }

  try {
    const deezerUrl = new URL("https://api.deezer.com/search");
    deezerUrl.searchParams.set("q", query);
    deezerUrl.searchParams.set("limit", limit);

    const response = await fetch(deezerUrl.toString(), {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; SantorwaveApp/1.0)",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Deezer API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = (await response.json()) as DeezerSearchResponse;

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Deezer search proxy error:", error);
    return NextResponse.json(
      { error: "Failed to search Deezer" },
      { status: 500 }
    );
  }
}
