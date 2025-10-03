import Link from "next/link";
import { Logo } from "./shared/logo";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { urls } from "@/constants/urls";

const resources = [
  {
    name: "Nextradar",
    href: "https://nextradar.dev?via=formcn",
  },
  {
    name: "Indie Starter",
    href: "https://indie-starter.dev?via=formcn",
  },
  {
    name: "MyPrompts",
    href: "https://myprompt.cc?via=formcn",
  },
];
const supportLinks = [
  {
    name: "Request feature",
    href: `${urls.github}/discussions`,
  },
  {
    name: "Report bug",
    href: `${urls.github}/issues/new`,
  },
];
//======================================
export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container mx-auto flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          <div className="md:col-span-2 lg:col-span-4 max-w-md space-y-4">
            <Link href="/">
              <Logo />
            </Link>
            <p className="text-muted-foreground text-sm pt-2">
              Build production-ready forms with a few clicks
            </p>
            <div className="flex gap-4">
              <a
                href={urls.github}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub className="size-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={urls.twitter}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaXTwitter className="size-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Resources</h4>
            <ul className="space-y-2 text-sm">
              {resources.map((resource) => {
                return (
                  <li key={resource.name}>
                    <a
                      href={resource.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {resource.name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold">Support</h4>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-border/40 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row border-dashed">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} formcn. All rights reserved.
          </p>
          {/* <p className="text-muted-foreground text-xs">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </p> */}
        </div>
      </div>
    </footer>
  );
}
