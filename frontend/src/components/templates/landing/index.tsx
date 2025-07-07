"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/reusable/buttons";

export default function LandingPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen  text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1597888619263-41e68f36c16a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="sports background"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 -z-10" />

      <section className="flex flex-col items-center justify-center text-center min-h-screen px-6">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl mx-w-[200px] md:text-6xl font-bold mb-4 font-poppins"
        >
          Signalez un acte de <span className="text-blue-400">fair-play</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="max-w-xl text-lg md:text-xl mb-8 text-gray-300"
        >
          Une plateforme simple pour célébrer les gestes nobles dans le sport.
          Partagez les moments de respect, de courage et de solidarité.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.5 }}
        >
          <Link href="/report">
            <Button
              variant="primary"
              icon={<FaLongArrowAltRight />}
              iconPosition="right"
            >
              Commencer
            </Button>
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
