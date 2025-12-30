"use client"

import { Logo } from "@/components/shared/logo"
import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { FaArrowLeft } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/hooks/use-mobile"
import { ScrollFadeEffect } from "@/components/scroll-fade-effect"

interface SidebarWrapperProps {
  children: React.ReactNode
  className?: string
}

export function SidebarWrapper({ children, className }: SidebarWrapperProps) {
  const router = useRouter()
  const isMobile = useIsMobile()
  return (
    <div
      className={
        'flex flex-col sticky top-0 lg:h-screen bg-sidebar/30 lg:border-r-2'
      }
    >
      {/* Logo at the top */}
      <div className="shrink-0 px-3 h-[4rem] flex items-center justify-start w-full gap-2 border-b">
        <Link href="/" className="cursor-pointer">
          <Logo />
        </Link>
      </div>

      {/* Main content area - scrollable */}
      {!isMobile ? (
        <ScrollFadeEffect
          className={cn('grow lg:h-[calc(100vh-6rem)]', className)}
        >
          {children}
        </ScrollFadeEffect>
      ) : (
        <div>{children}</div>
      )}

      {/* Mode toggle at the bottom */}
      <div className="shrink-0 px-3 h-[3rem] items-center justify-between border-t hidden lg:flex">
        <Button
          size="sm"
          onClick={() => router.back()}
          variant="outline"
          className="flex justify-center gap-2 grow"
        >
          <>
            <FaArrowLeft />
            Back
          </>
        </Button>
        <ModeToggle />
      </div>
    </div>
  )
}
