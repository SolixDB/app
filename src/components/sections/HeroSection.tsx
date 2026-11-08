import Image from "next/image";

export function HeroSection() {
  return (
    <section className="w-full min-h-[calc(100svh-4rem)] sm:min-h-[calc(100svh-5rem)] flex flex-col gap-4 items-center justify-center px-4 sm:px-6">
      <div className="mb-4">
        <Image src={"/logo.png"} alt="SolixDB" width={90} height={90} className="w-full h-full" />
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-gradient text-center">
        Index <span className="font-semibold">Less.</span> Build <span className="font-semibold">More.</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl max-w-xl text-center text-neutral-700 font-medium px-4">
        SolixDB provides pre-indexed Solana DeFi data with JSON RPC, GraphQL, and SQL access built for production-scale applications.
      </p>
    </section>
  );
}
