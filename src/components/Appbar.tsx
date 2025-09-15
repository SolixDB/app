"use client"

import { motion } from "framer-motion";
import { Session, User } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";

export default function Appbar({ session }: { session: Session | null }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (session?.user) setUser(session.user);
  }, [session]);

  return (
    <motion.nav
      className="sticky z-10 top-0 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border border-b box-border px-4 sm:px-6"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto h-full flex flex-wrap items-center justify-between gap-2">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="SolixDB"
            width={105}
            height={30}
            className="w-24 sm:w-28 md:w-32 h-auto"
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <Button
              variant="destructive"
              size="sm"
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer"
              onClick={() => router.push("/signin")}
            >
              Sign in
            </Button>
          )}
          <ThemeToggle position="relative" />
        </div>
      </div>
    </motion.nav>
  )
}
