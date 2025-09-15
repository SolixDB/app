"use client";

import { Button } from "@/components/ui/button";
import { syne } from "@/fonts/fonts";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroPage() {
  return (
    <div className="relative w-full bg-background">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
        }}
        className="relative w-full max-w-7xl mx-auto flex flex-col px-4 sm:px-6 py-20 sm:py-28 md:py-32"
      >
        <motion.section
          transition={{ duration: 0.8 }}
          className="flex flex-col-reverse md:flex-row items-center md:justify-between"
        >
          <div className="flex-1 flex flex-col text-left">
            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7 }}
              className={`text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight ${syne}`}
            >
              The indexing service{" "}
              <br className="hidden sm:inline" />
              behind Solana&apos;s fastest{" "}
              <br className="hidden sm:inline" />
              builders and protocols.
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl mx-auto md:mx-0 text-base sm:text-lg text-muted-foreground"
            >
              Skip the indexers. Stream and store blockchain data straight into your
              database — fast, reliable, and ready to query.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <Button size="lg" className="rounded-full w-full sm:w-auto">
                Start for free
              </Button>
              <Link
                href={"/docs"}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all px-4 hover:text-primary"
              >
                Documentation
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:block flex-1 ">
            <div className="flex justify-center items-center relative">
              {[0, 0.7, 1.4].map((delay, i) => (
                <motion.div
                  key={i}
                  className="absolute w-44 h-44 border border-primary rounded-full bg-primary/10"
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: [1, 2], opacity: [0, 0.5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay,
                  }}
                />
              ))}

              <Image
                src="/hero.png"
                alt="SolixDB"
                width={200}
                height={200}
                className="w-40 h-auto relative z-10"
              />
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}
