"use client";
import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { Logo } from "./shared/logo";

export default function Header() {
  const links = [
    { href: "https://github.com/Ali-Hussein-dev/formcn", Icon: FaGithub },
    { href: "https://x.com/alibey_10", Icon: FaXTwitter },
  ];

  return (
    <div>
      <div className="flex flex-row items-center justify-between px-2 py-1">
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
