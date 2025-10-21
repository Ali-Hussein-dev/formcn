"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Logo } from "./shared/logo";
import { urls } from "@/constants/urls";
import { Button } from "@/components/ui/button";

const links = [
  {
    label: "Hire me",
    href: "https://ali-hussein.com",
    target: "_blank",
    rel: "noopener noreferrer",
  },
];

const socialLinks = [
  { href: urls.github, Icon: FaGithub },
  { href: urls.twitter, Icon: FaXTwitter },
];

export default function Header() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 md:px-5 py-2">
        <div>
          <Link href="/" className="cursor-pointer aspect-video">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center sm:gap-4 gap-2">
          <nav className="flex gap-2 items-center">
            <Button variant="ghost" size="sm">
              <Link href="/changelog">Changelog</Link>
            </Button>
            {links.map(({ href, label, target, rel }) => {
              return (
                <Button key={href} variant="ghost" size="sm">
                  <a href={href} target={target} rel={rel}>
                    {label}
                  </a>
                </Button>
              );
            })}
          </nav>
          <div className="flex gap-4">
            {socialLinks.map(({ href, Icon }) => {
              return (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
