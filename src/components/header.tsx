import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { urls } from '@/constants/urls'
import { ModeToggle } from './mode-toggle'
import { Logo } from './shared/logo'

const links = [
	{
		label: 'Roadmap',
		href: 'https://formcn.featurebase.app/',
		target: '_blank',
		rel: 'noopener noreferrer',
	},
	{
		label: 'Hire me',
		href: urls.twitter,
		target: '_blank',
		rel: 'noopener noreferrer',
	},
]

const socialLinks = [
	{ href: urls.github, Icon: FaGithub },
	{ href: urls.twitter, Icon: FaXTwitter },
]

export function Header() {
	return (
		<div>
			<div className="flex flex-row items-center justify-between px-2 md:px-5 py-2">
				<div>
					<Link to="/" className="cursor-pointer aspect-video">
						<Logo />
					</Link>
				</div>

				{/* Desktop Navigation */}
				<div className="hidden md:flex items-center sm:gap-4 gap-2">
					<nav className="flex gap-2 items-center">
						<Button variant="ghost" size="sm">
							<Link to="/changelog">Changelog</Link>
						</Button>
						{links.map(({ href, label, target, rel }) => {
							return (
								<Button key={href} variant="ghost" size="sm">
									<a href={href} target={target} rel={rel}>
										{label}
									</a>
								</Button>
							)
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
							)
						})}
					</div>
					<ModeToggle />
				</div>

				{/* Mobile Dropdown Menu */}
				<div className="md:hidden flex items-center gap-2">
					<ModeToggle />
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm" className="p-2">
								<Menu size={20} />
								<span className="sr-only">Open menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="sm:w-56 w-64 px-3 py-4">
							<DropdownMenuItem asChild>
								<Link to="/changelog" className="w-full">
									Changelog
								</Link>
							</DropdownMenuItem>
							{links.map(({ href, label, target, rel }) => {
								return (
									<DropdownMenuItem key={href} asChild>
										<a href={href} target={target} rel={rel} className="w-full">
											{label}
										</a>
									</DropdownMenuItem>
								)
							})}
							<DropdownMenuSeparator />
							<div className="flex items-center justify-center gap-4 p-2">
								{socialLinks.map(({ href, Icon }) => {
									return (
										<a
											key={href}
											href={href}
											target="_blank"
											rel="noopener noreferrer"
											className="p-1 hover:bg-accent rounded-md transition-colors"
										>
											<Icon size={16} />
										</a>
									)
								})}
							</div>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>

			<hr />
		</div>
	)
}
