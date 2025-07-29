"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import "./landing-nav.css";

export default function LandingNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const lastScrollY = useRef<number>(0);

  // Handle screen resize
  useEffect(() => {
    const checkIsMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as Node;
      const menu = document.getElementById("mobile-menu");
      const menuButton = document.getElementById("menu-button");

      if (
        menu &&
        !menu.contains(target) &&
        menuButton &&
        !menuButton.contains(target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu when pressing escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  // Handle scroll behavior for navbar
  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 10; // Minimum scroll distance to trigger visibility change

      if (Math.abs(currentScrollY - lastScrollY.current) < scrollThreshold) {
        return; // Don't change state for small scroll amounts
      }

      // Scrolling down - hide the navbar
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      }
      // Scrolling up or at top - show the navbar
      else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      className={`fixed left-1/2 z-50 w-full max-w-[730px] -translate-x-1/2 transform px-3 transition-all duration-300 ease-in-out ${isVisible ? "top-4" : "-top-24"}`}
    >
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

        {/* Divider - Only visible on desktop */}
        <div className="bg-primary/40 hidden h-8 w-px md:block"></div>

        {/* Desktop Navigation */}
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

        {/* Get Started Button - Always visible */}
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shine-effect relative hidden overflow-hidden rounded-full md:flex">
          <span className="relative z-10">Get Started</span>
          <span className="shine-line"></span>
        </Button>

        {/* Mobile Menu Button */}
        <button
          id="menu-button"
          className="text-primary rounded-full p-2 focus:outline-none md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && (
        <div
          id="mobile-menu"
          className={`bg-accent/70 border-primary/30 absolute right-3 mt-2 w-56 rounded-lg border shadow-lg backdrop-blur-md transition-all duration-200 ease-in-out ${isOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`}
        >
          <div className="flex flex-col px-2 py-4">
            <div className="mb-4 flex flex-col space-y-3">
              <Link
                href="#"
                className="hover:bg-primary/10 rounded-md px-4 py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#"
                className="hover:bg-primary/10 rounded-md px-4 py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="#"
                className="hover:bg-primary/10 rounded-md px-4 py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="#"
                className="hover:bg-primary/10 rounded-md px-4 py-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
            </div>
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground shine-effect relative w-full overflow-hidden rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <span className="relative z-10">Get Started</span>
              <span className="shine-line"></span>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
