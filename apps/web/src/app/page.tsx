import { Button } from "@/components/ui/button";
import { urls } from "@/constants/urls";
import Link from "next/link";
import { FaGithub } from "react-icons/fa6";
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
import { cn } from "@/lib/utils";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { FiGitCommit, FiTerminal } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

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
    "Build production-ready forms effortlessly using shadcn, react, typescript, tailwindcss, zod, react hook form, motion, and more.",
};
const features = [
  {
    icon: SiReact,
    title: "Production-ready code",
    text: "No inconsistent AI generated code, always consistent battle-tested code and easily maintainable",
  },
  {
    icon: FiGitCommit,
    title: "Single/Multi-step forms",
    text: "Easily choose between one step and multi-step forms that suit your needs",
  },
  {
    icon: SiZod,
    title: "Client/server side validation",
    text: "Client/server side validation with Zod and next-safe-action",
  },
  {
    icon: FiTerminal,
    title: "Easy to use",
    text: "You can bring generated code and dependencies to your project with one command, powered by shadcn registry CLI",
  },
  {
    icon: BsStars,
    title: "Formcn AI",
    text: "Scaffold your form components instantly without creating each form field manually",
  },
];

// const testimonial = [
//   {
//     name: "John Doe",
//     src: "",
//     text: "",
//   },
// ];
const CtaButton = () => (
  <Link href="/my-forms?id=template-signup">
    <Button className="font-semibold">Get Started</Button>
  </Link>
);
const CardDecorator = ({ children }: { children: React.ReactNode }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative size-32 mx-auto duration-200 [--color-border:color-mix(in_oklab,var(--foreground)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--foreground)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--primary)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--primary)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);
export default function Home() {
  return (
    <div className=" flex flex-col w-full mx-auto px-2 sm:px-4 py-8 h-full">
      <div className="border container border-dashed mb-2 mx-auto grow min-h-screen flex flex-col">
        <div className="py-5 px-3 sm:py-6 md:py-8 md:px-6 w-full grow">
          <div className="h-[80vh] grid place-items-center">
            <div className="">
              <h1 className="text-2xl md:text-4xl lg:text-5xl text-center text-pretty font-black mb-2">
                Build production-ready forms <br /> with a few clicks
              </h1>
              <p className="text-muted-foreground text-center text-pretty max-w-xl mx-auto">
                Client and server side validation, accessible with ARIA and
                well-styled shadcn components
              </p>
              <div className="mx-auto pt-6 w-fit flex gap-4 ">
                <a href={urls.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">
                    <FaGithub />
                    Star on Github
                  </Button>
                </a>
                <CtaButton />
              </div>
            </div>
          </div>
        </div>
        <div className="border-t w-full border-dashed p-1">
          <div className="dark:bg-muted/40 bg-muted text-card-foreground py-6 md:py-8 ">
            <h2 className="text-lg sm:text-xl text-center text-pretty font-bold mb-2 text-primary/85">
              Powered by Tech Stack You Trust
            </h2>
            <div className="flex gap-5 lg:gap-14 md:gap-8 py-5 mx-auto w-fit">
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
          </div>
        </div>
        <div className="border-t border-dashed w-full">
          <h2 className="text-lg sm:text-2xl md:text-3xl text-center text-pretty font-bold text-primary/85 py-8 border-b border-dashed capitalize">
            Build your forms with confidence
          </h2>
          <div className="grid md:grid-cols-6 grid-cols-1">
            {features.map((o, i) => (
              <div
                key={o.title}
                className={cn(
                  "grow h-full",
                  i < 3 && "md:col-span-2",
                  i == 3 && "md:col-span-3",
                  i == 4 && "md:col-span-3"
                )}
              >
                <div
                  className={cn(
                    "h-full border-dashed",
                    i < 4 && "border-b md:border-b-0",
                    i < 3 && "md:border-b",
                    i == 1 && "md:border-x",
                    i == 2 && "md:border-r",
                    i == 3 && "md:border-r md:col-span-3",
                    i == 4 && "md:border-r md:col-span-3"
                  )}
                >
                  <div className="p-4 lg:p-6 rounded-xl">
                    <CardDecorator>
                      <o.icon className="size-6" />
                    </CardDecorator>
                    <CardTitle className="mb-3 text-xl gap-2 pt-3 text-center ">
                      {o.title}
                    </CardTitle>
                    <CardDescription className="text-center text-balance">
                      {o.text}
                    </CardDescription>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full border-t border-dashed h-full overflow-hidden p-1">
          <div className="w-full relative py-8 flex justify-center">
            {/* Gradient Diagonal Lines Pattern */}
            <div
              className="absolute inset-0 -z-10 pointer-events-none "
              style={{
                backgroundImage: `
                      repeating-linear-gradient(45deg, 
                        var(--muted) 0px, 
                        var(--muted) 1px, 
                        transparent 1px, 
                        transparent 5px)`,
              }}
            />
            <CtaButton />
          </div>
        </div>
      </div>
    </div>
  );
}
