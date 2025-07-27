"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./landing-nav.css";

export default function LandingNav() {
  return (
    <nav className="fixed top-4 left-1/2 z-50 w-[730px] -translate-x-1/2 px-3">
      <div className="bg-accent/30 border-primary/40 flex items-center justify-between gap-4 rounded-full border px-4 py-3 shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <Image
              src="/Logo.svg"
              alt="Sawaed Logo"
              width={36}
              height={36}
              className="h-9 w-9"
            />
            <span className="text-primary ml-2 text-xl font-bold">Sawaed</span>
          </div>
        </div>
        <div className="bg-primary/40 h-8 w-px"></div>
        <div className="text-foreground hidden items-center gap-6 font-medium md:flex">
          <Link href="#" className="hover:text-primary transition-colors">
            Home
          </Link>

          <Link href="#" className="hover:text-primary transition-colors">
            About
          </Link>

          <Link href="#" className="hover:text-primary transition-colors">
            Contact
          </Link>

          <Link href="#" className="hover:text-primary transition-colors">
            FAQ
          </Link>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shine-effect relative overflow-hidden rounded-full">
          <span className="relative z-10">Get Started</span>
          <span className="shine-line"></span>
        </Button>
      </div>
    </nav>
  );
}
