"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CustomButton } from "@/components/ui/custom-button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Menu, X, LogIn } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    gsap.from(".nav-item", {
      opacity: 0,
      y: -20,
      duration: 0.5,
      stagger: 0.1,
    });
  });

  const navItems = [
    { name: "Features", href: "#features" },
    { name: "Pricing", href: "#pricing" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              AssessGPT
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="nav-item relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
              >
                {item.name}
                <span className="absolute left-0 right-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <CustomButton
              variant="outline"
              size="sm"
              icon={<LogIn size={16} />}
            >
              Log in
            </CustomButton>
            <CustomButton variant="gradient" size="sm">
              Get Started
            </CustomButton>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 hover:bg-foreground/5 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-background/70 backdrop-blur-xl rounded-2xl mt-2 border border-border/50"
            >
              <nav className="flex flex-col p-4 space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-4 py-2 hover:bg-foreground/5 rounded-lg"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="flex flex-col space-y-2 pt-4 border-t border-border/50">
                  <CustomButton
                    variant="outline"
                    size="sm"
                    icon={<LogIn size={16} />}
                  >
                    Log in
                  </CustomButton>
                  <CustomButton variant="gradient" size="sm">
                    Get Started
                  </CustomButton>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
