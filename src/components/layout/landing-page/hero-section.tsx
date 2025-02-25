"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomButton } from "@/components/ui/custom-button";
import { Play, ArrowRight } from "lucide-react";

const HeroSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".hero-element", {
      opacity: 0,
      y: 100,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".stat-item", {
      scrollTrigger: {
        trigger: ".stats-container",
        start: "top center+=100",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
    });
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="hero-element space-y-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block text-sm md:text-base text-primary/80 font-medium px-4 py-2 bg-primary/5 rounded-full mb-4">
              Revolutionizing Education Assessment
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Transform Education with
              <br />
              AI-Powered Assessment
            </h1>
          </motion.div>

          <motion.p
            className="hero-element text-lg md:text-xl text-foreground/80 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Streamline your grading process with intelligent AI assistance.
            Perfect for teachers and institutions looking to modernize
            education.
          </motion.p>

          <motion.div
            className="hero-element flex flex-col md:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CustomButton variant="gradient" size="lg" icon={<ArrowRight />}>
              Start Free Trial
            </CustomButton>
            <CustomButton variant="outline" size="lg" icon={<Play size={16} />}>
              Watch Demo
            </CustomButton>
          </motion.div>

          {/* Stats */}
          <div className="stats-container grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                value: "10K+",
                label: "Active Teachers",
                sublabel: "Worldwide",
              },
              { value: "50K+", label: "Students Engaged", sublabel: "Daily" },
              {
                value: "1M+",
                label: "Assignments Graded",
                sublabel: "Automatically",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item p-6 rounded-2xl bg-foreground/5 backdrop-blur-sm"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-base font-medium text-foreground/80">
                  {stat.label}
                </div>
                <div className="text-sm text-foreground/60">
                  {stat.sublabel}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
