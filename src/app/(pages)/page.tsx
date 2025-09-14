"use client";

import { Button } from "@/components/ui/button";
import { syne } from "@/fonts/fonts";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
      }}
      className="relative"
    >
      <motion.section
        transition={{ duration: 0.8 }}
        className="relative flex flex-col items-center py-32 bg-gradient-to-br from-primary/20 to-transparent"
      >
        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-background to-transparent pointer-events-none" />

        <div className="max-w-7xl flex flex-col w-full">
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7 }}
            className={`text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl ${syne}`}
          >
            The data infrastructure layer <br className="hidden sm:inline" />
            that turns blockchains into <br className="hidden sm:inline" />
            query-ready databases.
          </motion.h1>

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            Skip the indexers. Stream and store blockchain data straight into your
            database — fast, reliable, and ready to query.
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex gap-4"
          >
            <Button size="lg" className="rounded-full">
              Start for free
            </Button>
            <Link href={"/docs"} className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all px-4 hover:text-primary">
              Documentation
            </Link>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </motion.section>

      <motion.section
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.8 }}
        className="relative py-32 bg-background"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Next Section Content
          </h2>
          <p className="mt-4 text-muted-foreground">
            This section flows seamlessly after the hero with a smooth fade.
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
}
