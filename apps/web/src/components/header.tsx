"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Logo } from "./shared/logo";
import { urls } from "@/constants/urls";

export default function Header() {
  const links = [
    { href: urls.github, Icon: FaGithub },
    { href: urls.twitter, Icon: FaXTwitter },
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 md:px-5 py-2">
        <div>
          <Link href="/" className="cursor-pointer aspect-video">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center sm:gap-4 gap-2">
          <nav className="flex gap-4 text-lg">
            {links.map(({ href, Icon }) => {
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
          </nav>
          <ModeToggle />
        </div>
      </div>
      <hr />
    </div>
  );
}
