"use client";

import { motion } from "framer-motion";
import ReportForm from "./form";
import Image from "next/image";

export default function ReportPage() {
  return (
    <main className="min-h-screen overflow-hidden  relative flex flex-col md:flex-row md:items-center gap-4 bg-white/90 shadow-2xl text-black font-poppins px-4 py-10">
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
      {/* <div className="absolute inset-0 bg-black/70 -z-10" /> */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl rounded-3xl  md:flex flex-col justify-center items-center mx-auto text-center mb-8 px-6 py-4"
      >
        <h1 className="text-3xl w-full text-center lg:text-5xl xl:text-6xl text-black font-poppins font-bold mb-4">
          Soumettre un rapport de{" "}
          <span className="text-blue-400">fair-play</span>
        </h1>
        <p className="text-gray-600">
          Remplissez ce formulaire pour signaler un acte de respect, d’honnêteté
          ou de courage.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-2xl w-full mx-auto "
      >
        <ReportForm />
      </motion.div>
    </main>
  );
}
