import { Button } from "@/components/ui/button";
import { urls } from "@/constants/urls";
import Link from "next/link";
import { FaGithub, FaPlus } from "react-icons/fa6";
import {
  SiShadcnui,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiZod,
  SiReacthookform,
  SiFramer,
} from "react-icons/si";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
const logos = [
  {
    name: "React 19",
    Logo: SiReact,
  },
  {
    name: "TypeScript",
    Logo: SiTypescript,
  },
  {
    name: "Tailwind 4",
    Logo: SiTailwindcss,
  },
  {
    name: "Shadcn",
    Logo: SiShadcnui,
  },
  {
    name: "Zod 4",
    Logo: SiZod,
  },
  {
    name: "React Hook Form",
    Logo: SiReacthookform,
  },
  {
    name: "Motion",
    Logo: SiFramer,
  },
];
export const metadata = {
  title: "Modern Form Builder for Shadcn | formcn",
  description:
    "Easily build forms with validation and auto-generated client- and server-side code.",
};

export default function Home() {
  return (
    <div className=" flex flex-col w-full mx-auto px-2 sm:px-4 py-8 min-h-[calc(100svh-5rem)]">
      <div className="border container border-dashed mb-2 md:grid-cols-8 grid mx-auto grow h-full">
        <div className="md:col-span-1 bg-secondary/25" />
        <div className="md:col-span-6 md:border-x border-dashed py-5 grid place-items-center px-3 grow sm:py-6 md:py-8 md:px-6 w-full">
          <div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl text-center text-pretty font-black mb-2">
              Build production-ready forms <br /> with a few clicks
            </h1>
            <p className="text-muted-foreground text-center text-pretty">
              {metadata.description}
            </p>
            <div className="flex gap-5 py-4 mx-auto w-fit">
              {logos.map(({ name, Logo }) => {
                const Icon = <Logo className="size-6" />;
                return (
                  <TooltipProvider key={name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className="size-full flex justify-center items-center"
                          type="button"
                        >
                          {Icon}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
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
                <Link href="/my-forms?id=template-signup">Create form</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 bg-secondary/25" />
      </div>
    </div>
  );
}
