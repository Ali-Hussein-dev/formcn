import { type NextRequest } from "next/server";
import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { aiFormSchema } from "@/form-builder/lib/ai-form-schema";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { headers } from "next/headers";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(5, "60s"),
  ephemeralCache: new Map(),
  analytics: true,
});

export const POST = async (req: NextRequest) => {
  try {
    // return new Response("Rate limit exceeded. Please try again later.", {
    //   status: 429,
    // });
    const body = await req.json();
    const prompt = body.prompt || "";
    if (process.env.NODE_ENV !== "development") {
      const headersList = await headers();
      const ip = headersList.get("x-forwarded-for") ?? "anonymous";
      const { success, limit, reset, remaining } = await ratelimit.limit(ip);

      if (!success) {
        return new Response("Rate limit exceeded. Please try again later.", {
          status: 429,
          headers: {
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": reset.toString(),
          },
        });
      }
    }
    const res = streamObject({
      model: openai("gpt-4o-mini"),
      // @ts-ignore error message is verbose and messy
      schema: aiFormSchema,
      prompt: prompt,
      system:
        "You are an advanced form generator. Based on the provided form schema and user input, generate a JSON representation of the form elements. Note that the form schema can include both input fields and text-based elements such as titles and descriptions. Exclude any form buttons from the output. Ensure the JSON follows the schema and fully reflects the user’s requirements",
      maxRetries: 2,
      onError: (event) => {
        console.log(event.error);
      },
      output: "object",
    });
    return res.toTextStreamResponse();
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
