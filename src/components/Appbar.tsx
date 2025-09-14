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
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <motion.nav
      className="sticky z-10 top-0 h-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border border-b-[1px] box-border"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="SolixDB"
            width={105}
            height={30}
            className="w-30 h-auto"
          />
        </Link>

        <div className="flex items-center space-x-3">
          {user ? (
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          ) : (
            <Button
              variant="outline"
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
