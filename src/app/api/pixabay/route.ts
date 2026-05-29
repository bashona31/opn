import { NextRequest, NextResponse } from "next/server";

const PIXABAY_API_KEY = "54574139-b6d1a32cfd4a3801fecdbc9b2";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "3d robot";
  const perPage = searchParams.get("per_page") || "6";

  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=illustration&per_page=${perPage}&safesearch=true`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Pixabay API error: ${res.status}`);
    }

    const data = await res.json();

    const images = data.hits.map((hit: any) => ({
      id: hit.id,
      url: hit.largeImageURL,
      webformatURL: hit.webformatURL,
      tags: hit.tags,
      user: hit.user,
      likes: hit.likes,
      views: hit.views,
    }));

    return NextResponse.json({ images, total: data.totalHits });
  } catch (error) {
    console.error("Pixabay API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
