import { Button } from "@/components/ui/button";
import { urls } from "@/constants/urls";
import Link from "next/link";
import { FaGithub, FaPlus } from "react-icons/fa6";

export const metadata = {
  title: "Modern Form Builder for Shadcn | formcn",
  description:
    "Easily build single- and multi-step forms with auto-generated client- and server-side code.",
};

export default function Home() {
  return (
    <div className=" flex flex-col w-full mx-auto px-2 sm:px-4 py-8 min-h-[calc(100svh-5rem)]">
      <div className="border container border-dashed mb-2 md:grid-cols-8 grid mx-auto grow h-full">
        <div className="md:col-span-1 bg-secondary/25" />
        <div className="md:col-span-6 md:border-x border-dashed py-5 grid place-items-center px-3 grow sm:py-6 md:py-8 md:px-6 w-full">
          <div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl text-center text-pretty font-black mb-2">
              Modern Form Builder for Shadcn
            </h1>
            <p className="text-muted-foreground text-center text-pretty">
              {metadata.description}
            </p>
            <div className="mx-auto pt-4 w-fit flex gap-4">
              <Button asChild variant="outline">
                <a
                  href={urls.github}
                  className="rounded-full mx-auto px-5 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="" />
                  Star on Github
                </a>
              </Button>
              <Button>
                <FaPlus />
                <Link href="/my-forms">Create form</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 bg-secondary/25" />
      </div>
    </div>
  );
}
