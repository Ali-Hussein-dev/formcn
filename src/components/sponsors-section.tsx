'use client'

import { Button } from '@/components/ui/button'
import { urls } from '@/constants/urls'

type Sponsor = {
  name: string
  logo: string
  url: string
  tier?: 'platinum' | 'gold' | 'silver'
}

const goldSponsors: Sponsor[] = [
  {
    name: 'Shadcn Studio',
    logo: 'https://cdn.shadcnstudio.com/ss-assets/favicon/apple-touch-icon.png',
    url: urls.sponsors.shadcnStudio,
    tier: 'gold',
  },
]

const currentSponsors: Sponsor[] = [
  // Add more sponsors here as needed
]

export function SponsorsSection() {
  const allSponsors = [...goldSponsors, ...currentSponsors]

  if (allSponsors.length === 0) {
    return null
  }

  return (
			<div className="w-full border-t border-dashed">
				<div className="">
					{goldSponsors.length > 0 && (
						<div className="">
							<div className="py-8">
								<h3 className="text-sm font-semibold text-center uppercase tracking-wider">
									Sponsors
								</h3>
								<p className="text-sm text-muted-foreground text-center">
									Huge thanks to our sponsors for their support.
								</p>
							</div>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mx-auto border-y border-dashed">
								<div className="border-r border-dashed"></div>
								{goldSponsors.map((sponsor) => (
									<a
										key={sponsor.name}
										href={sponsor.url}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex flex-col items-center gap-3 p-4 rounded-lg border-r border-dashed hover:bg-muted/50 transition-colors"
									>
										<div className="relative size-16 flex items-center justify-center">
											<img
												src={sponsor.logo}
												alt={sponsor.name}
												className="size-12 object-contain"
												onError={(e) => {
													const target = e.target as HTMLImageElement
													target.style.display = 'none'
												}}
											/>
										</div>
										<div className="text-center">
											<p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
												{sponsor.name}
											</p>
										</div>
									</a>
								))}

								<div className="border-r border-dashed"></div>
							</div>
							<div className="flex justify-center py-4">
								<Button variant="ghost" asChild className="h-full py-2">
									<a
										href={urls.sponsor}
										target="_blank"
										rel="noopener noreferrer"
									>
										Become a Sponsor
									</a>
								</Button>
							</div>
						</div>
					)}

					{currentSponsors.length > 0 && (
						<div className="mb-8">
							<h3 className="text-sm font-semibold text-muted-foreground mb-4 text-center uppercase tracking-wider">
								Current Sponsors
							</h3>
							<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
								{currentSponsors.map((sponsor) => (
									<a
										key={sponsor.name}
										href={sponsor.url}
										target="_blank"
										rel="noopener noreferrer"
										className="group flex flex-col items-center gap-3 p-4 rounded-lg border border-dashed hover:border-primary/30 hover:bg-muted/50 transition-colors"
									>
										<div className="relative size-16 flex items-center justify-center">
											<img
												src={sponsor.logo}
												alt={sponsor.name}
												className="size-12 object-contain"
												onError={(e) => {
													const target = e.target as HTMLImageElement
													target.style.display = 'none'
												}}
											/>
										</div>
										<p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors text-center">
											{sponsor.name}
										</p>
									</a>
								))}
							</div>
						</div>
					)}

					{/*  <div className="flex justify-center border-t border-dashed pt-8">
          
        </div> */}
				</div>
			</div>
		)
}
