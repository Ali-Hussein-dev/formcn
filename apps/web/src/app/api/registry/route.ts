import { type NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { registryDependencies, dependencies, files, name } = body;
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
    // Create public/r directory if it doesn't exist
    const publicDir = path.join(process.cwd(), "public", "r");
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const isDev = process.env.NODE_ENV === "development";
    const registryPath = path.join(publicDir, `${name}.json`);
    fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));

    // console.log(`Registry file generated at ${registryPath}`);

    return NextResponse.json({
      data: {
        id: isDev ? `http://localhost:3000/r/${name}.json` : `@formcn/${name}`,
      },
      error: null,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ data: null, error });
  }
};
