import { type NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

const responseHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;

  // Strip .json extension if present
  const registryId = id.endsWith(".json") ? id.slice(0, -5) : id;

  try {
    const registryItem = await redis.get(registryId);
    if (!registryItem) {
      return new NextResponse("Registry item not found", {
        status: 404,
        headers: responseHeaders,
      });
    }
    return new NextResponse(JSON.stringify(registryItem), {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Something went wrong", {
      status: 500,
      headers: responseHeaders,
    });
  }
};
