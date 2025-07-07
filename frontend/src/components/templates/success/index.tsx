"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import Button from "@/components/reusable/buttons";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const firstName = searchParams.get("firstName") || "Utilisateur";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4"
    >
      <FaCheckCircle className="text-green-500 text-6xl mb-4" />

      <motion.h1
        className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Merci {firstName} !
      </motion.h1>

      <motion.p
        className="text-gray-600 mb-6 max-w-md"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Votre acte de fair-play a bien été enregistré. Un administrateur le
        consultera bientôt.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link href="/" className="">
          <Button variant="ghost">Retour à l’accueil</Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
