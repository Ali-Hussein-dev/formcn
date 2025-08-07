import { Button } from "@/components/ui/button";
import { urls } from "@/constants/urls";
import { FormBuilder } from "@/form-builder/components/form-builder";
import { FaGithub } from "react-icons/fa6";

export const metadata = {
  title: "Modern Form Builder for Shadcn | formcn",
  description:
    "Easily build single- and multi-step forms with auto-generated client- and server-side code.",
};

export default function Home() {
  return (
    <div className="container flex flex-col w-full mx-auto px-2 sm:px-4 py-8">
      <div>
        <div className="border border-dashed mb-2 md:grid-cols-8 grid mx-auto">
          <div className="md:col-span-1" />
          <div className="md:col-span-6 md:border-x border-dashed py-5 px-3 grow sm:py-6 md:py-8 md:px-6 w-full">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-pretty font-bold mb-2">
              Modern Form Builder for Shadcn
            </h1>
            <p className="text-muted-foreground text-center text-pretty">
              {metadata.description}
            </p>
            <div className="mx-auto pt-4 w-fit">
              <Button asChild variant={"outline"} size="sm">
                <a
                  href={urls.github}
                  className="rounded-full mx-auto px-5 block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Star on Github
                  <FaGithub className="inline-block ml-2" />
                </a>
              </Button>
            </div>
          </div>
          <div className="md:col-span-1" />
        </div>
      </div>
      <div>
        <FormBuilder />
      </div>
    </div>
  );
}
