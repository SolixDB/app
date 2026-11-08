import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center">
      <h1 className="text-[52px] font-medium leading-[0.85] tracking-[-0.06em] sm:text-[96px]">
        Page not found
      </h1>
      <Link
        href="/"
        className="hero-cta inline-flex items-center gap-[0.55em] text-xl font-semibold tracking-[-0.05em]"
      >
        <span aria-hidden className="hero-cta-arrow h-[1.1em] w-[1.1em] bg-current" />
        <span className="hero-cta-label">Back home</span>
      </Link>
    </main>
  );
}
