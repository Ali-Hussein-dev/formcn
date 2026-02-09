'use client'

import { Link } from '@tanstack/react-router'
import { FaArrowLeft } from 'react-icons/fa6'
import { ModeToggle } from '@/components/mode-toggle'
import { ScrollFadeEffect } from '@/components/scroll-fade-effect'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { cn } from '@/lib/utils'

interface SidebarWrapperProps {
	children: React.ReactNode
	className?: string
}

export function SidebarWrapper({ children, className }: SidebarWrapperProps) {
	const isMobile = useIsMobile()
	return (
		<div
			className={
				'flex flex-col sticky top-0 md:h-screen bg-sidebar/30 md:border-r'
			}
		>
			{/* Logo at the top */}
			<div className="shrink-0 px-3 h-[3.7rem] flex items-center justify-start w-full gap-2 border-b">
				<Link to="/" className="cursor-pointer">
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
			<div className="shrink-0 px-3 h-[3rem] items-center justify-between border-t hidden md:flex">
				<Button
					size="sm"
					onClick={() => window.history.back()}
					variant="outline"
					className="flex justify-center gap-2 grow"
				>
					<FaArrowLeft />
					Back
				</Button>
				<ModeToggle />
			</div>
		</div>
	)
}
