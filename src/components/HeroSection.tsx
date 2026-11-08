import { HeroCta } from "@/components/HeroCta";

export function HeroSection() {
  return (
    <section className="flex min-h-svh items-center">
      <div className="mx-auto w-full max-w-7xl px-6 pt-24 pb-16 sm:px-8">
        <h1 className="text-[52px] font-medium leading-[0.85] tracking-[-0.06em] sm:text-[clamp(52px,10.5vw,128px)]">
          Skip the Indexer.
          <br />
          Ship the App.
        </h1>
        <p className="mt-10 max-w-2xl text-lg font-medium leading-tight tracking-[-0.03em] sm:text-2xl">
          The open-source Rust data layer for Solana and Stellar. Full history through standard RPC,
          plus live streams.
        </p>
        <div className="relative mt-10 h-20">
          <HeroCta />
        </div>
      </div>
    </section>
  );
}
