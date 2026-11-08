import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Github } from "lucide-react";

export function Navigation() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link href="/" className="flex items-center group">
            <Image
              src="https://ox35safakaidjuzg.public.blob.vercel-storage.com/hero.webp"
              alt="SolixDB"
              width={120}
              height={32}
              className="h-6 sm:h-8 w-auto transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="https://github.com/solixdb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-2 text-sm font-bold py-2 px-2 sm:px-3 rounded-sm text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <Github size={18} />
              <span className="hidden sm:inline">Open Source</span>
            </Link>
            <Link
              href={'https://t.me/priyansh_ptl18'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold bg-neutral-100 py-2 px-4 rounded-sm text-neutral-500 hover:text-neutral-700 transition-colors"
            >
              Enterprise <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
