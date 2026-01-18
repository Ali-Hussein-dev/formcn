'use client'

const ShadcnStudio = () => (
  <a
    href={
      'https://shadcnstudio.com/?utm_source=formcn&utm_medium=banner&utm_campaign=github'
    }
    target="_blank"
    rel="noopener noreferrer"
    className="group/left flex flex-1 items-center justify-center py-1.5 group-hover:border-primary/30 group-hover:bg-background/90 h-full"
  >
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex items-center gap-2 text-foreground/90 group-hover/left:text-primary">
        <svg
          viewBox="0 0 328 329"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-8"
          aria-hidden="true"
        >
          <rect
            y="0.5"
            width="328"
            height="328"
            rx="164"
            fill="currentColor"
          ></rect>
          <path
            d="M165.018 72.3008V132.771C165.018 152.653 148.9 168.771 129.018 168.771H70.2288"
            strokeWidth="20"
            className="stroke-background"
          ></path>
          <path
            d="M166.627 265.241L166.627 204.771C166.627 184.889 182.744 168.771 202.627 168.771L261.416 168.771"
            strokeWidth="20"
            className="stroke-background"
          ></path>
          <line
            x1="238.136"
            y1="98.8184"
            x2="196.76"
            y2="139.707"
            strokeWidth="20"
            className="stroke-background"
          ></line>
          <line
            x1="135.688"
            y1="200.957"
            x2="94.3128"
            y2="241.845"
            strokeWidth="20"
            className="stroke-background"
          ></line>
          <line
            x1="133.689"
            y1="137.524"
            x2="92.5566"
            y2="96.3914"
            strokeWidth="20"
            className="stroke-background"
          ></line>
          <line
            x1="237.679"
            y1="241.803"
            x2="196.547"
            y2="200.671"
            strokeWidth="20"
            className="stroke-background"
          ></line>
        </svg>
        <div className="flex flex-col items-start">
          <span className="leading-tight font-medium text-xs sm:text-sm">
            Shadcnstudio.com
          </span>
          <span className="text-muted-foreground text-sm">
            shadcn blocks &amp; templates
          </span>
        </div>
      </div>
    </div>
  </a>
)
const Scrimba = () => (
  <a
    href="https://scrimba.com/react-interview-questions-c01t?via=nextradardotdev"
    target="_blank"
    rel="noopener noreferrer"
    className="group/right flex flex-1 items-center justify-center py-1.5 group-hover:border-primary/30 group-hover:bg-background/90 "
  >
    <div className="flex flex-col items-center gap-2.5">
      <div className="flex items-center gap-2 text-foreground/90 group-hover/right:text-primary">
        <img
          src="https://scrimba.com/static/brand/favicon-256x256.png"
          alt="Scrimba"
          className="size-8 rounded-full"
        />
        <div className="flex flex-col items-start">
          <span className="leading-tight font-medium text-xs sm:text-sm">
            React Interview Questions
          </span>
          <span className="text-muted-foreground text-xs ">
            With a Principal DX Engineer
          </span>
        </div>
      </div>
    </div>
  </a>
)
export function SponsorBanner() {
  return (
    <div className="w-full overflow-hidden rounded-sm">
      <div className="grid grid-cols-12 
      border-b border-dashed bg-background h-[3.7rem]">
        <div className="col-span-2 hidden lg:block border-dashed border-r"></div>
        <div className="col-span-full sm:col-span-6 lg:col-span-4 bg-background sm:border-r border-dashed py-0.5">
          <ShadcnStudio />
        </div>

        <div className="col-span-6 lg:col-span-4 bg-background py-0.5 hidden sm:block">
          <Scrimba />
        </div>
        <div className="col-span-2 hidden lg:block border-l border-dashed"></div>
      </div>
    </div>
  )
}
