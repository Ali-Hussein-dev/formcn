import { type NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import path from "path";
import fs from "fs";

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


export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const body = await req.json();
    const { registryDependencies, dependencies, files, name } = body;
    const { id: key } = await params;
    const registry = {
      $schema: "https://ui.shadcn.com/schema/registry.json",
      homepage: "https://formcn.dev",
      author: "formcn (https://formcn.dev)",
      name,
      dependencies,
      registryDependencies,
      type: "registry:block",
      files,
    };
    const isDev = process.env.NODE_ENV === "development";
    if (isDev) {
      // Create public/r directory if it doesn't exist
      const publicDir = path.join(process.cwd(), "public", "r");
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      const registryPath = path.join(publicDir, `${key}.json`);
      fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));

      // console.log(`Registry file generated at ${registryPath}`);

      return NextResponse.json({
        data: {
          id: `http://localhost:3000/r/${key}.json`,
        },
        error: null,
      });
    } else {
      await redis.set(key, JSON.stringify(registry), {
        ex: 60 * 60 * 24, // 1 day
      });
      return NextResponse.json({
        data: {
          id: `@formcn/${key}`,
        },
        error: null,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: null, error });
  }
};
