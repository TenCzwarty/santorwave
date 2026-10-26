import { type NextRequest, NextResponse } from "next/server";

/**
 * Audio Proxy API Route
 *
 * This endpoint proxies external audio files (like Deezer previews)
 * through our server, adding proper CORS headers so the Web Audio API
 * can analyze the audio for visualization.
 *
 * Usage: /api/audio-proxy?url=https://example.com/audio.mp3
 *
 * Why is this needed?
 * - The Web Audio API's `createMediaElementSource()` requires audio to be
 *   same-origin OR have proper CORS headers
 * - External CDNs don't always provide these headers
 * - By proxying through our server, the audio becomes "same-origin"
 */

const ALLOWED_DOMAINS = [
  "dzcdn.net", // Deezer CDN (covers cdns-preview-X.dzcdn.net)
  "audio-ssl.itunes.apple.com", // Apple Music previews
];

/**
 * Exact host or a real subdomain of it. A bare `endsWith(domain)` also let
 * through look-alikes such as `evil-dzcdn.net`.
 */
const isAllowedHost = (hostname: string) =>
  ALLOWED_DOMAINS.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
  );

/** Upstream headers worth passing on — Range support is what makes seeking work. */
const FORWARDED_HEADERS = [
  "Content-Type",
  "Content-Length",
  "Content-Range",
  "Accept-Ranges",
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const audioUrl = searchParams.get("url");

  if (!audioUrl) {
    return NextResponse.json(
      { error: "Missing 'url' query parameter" },
      { status: 400 }
    );
  }

  // Validate the URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(audioUrl);
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // Security: Only allow specific domains (prevent abuse)
  if (parsedUrl.protocol !== "https:" || !isAllowedHost(parsedUrl.hostname)) {
    return NextResponse.json(
      {
        error: "Domain not allowed",
        allowed: ALLOWED_DOMAINS,
      },
      { status: 403 }
    );
  }

  try {
    // Fetch the audio from the external source
    const range = request.headers.get("Range");
    const response = await fetch(audioUrl, {
      headers: {
        // Some CDNs require a user-agent
        "User-Agent": "Mozilla/5.0 (compatible; AudioProxy/1.0)",
        ...(range ? { Range: range } : {}),
      },
    });

    // A redirect could otherwise walk us off the allow-list.
    if (!isAllowedHost(new URL(response.url).hostname)) {
      return NextResponse.json(
        { error: "Redirected to a domain that is not allowed" },
        { status: 403 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch audio: ${response.status}` },
        { status: response.status }
      );
    }

    const headers = new Headers({
      // These headers allow the Web Audio API to work
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      // Cache the audio for 1 hour to reduce repeated fetches
      "Cache-Control": "public, max-age=3600",
    });
    for (const name of FORWARDED_HEADERS) {
      const value = response.headers.get(name);
      if (value) headers.set(name, value);
    }
    if (!headers.has("Content-Type")) headers.set("Content-Type", "audio/mpeg");

    // Stream instead of buffering the whole file, and keep a 206 a 206 so the
    // browser can seek (Safari will not play media without range support).
    return new NextResponse(response.body, {
      status: response.status,
      headers,
    });
  } catch (error) {
    console.error("Audio proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy audio" },
      { status: 500 }
    );
  }
}
