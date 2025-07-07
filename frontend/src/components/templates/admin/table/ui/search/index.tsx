"use client";

import { useEffect, useState } from "react";
import { Report } from "@/types/reports";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

interface Props {
  reports: Report[]; // original list
  setReports: (filtered: Report[]) => void;
}

export default function SearchBox({ reports, setReports }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!query.trim()) {
      setReports(reports);
      return;
    }

    const filtered = reports.filter((report) =>
      Object.values(report).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );

    setReports(filtered);
  }, [query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-fit max-w-md relative"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value.trim())}
        placeholder="Rechercher un rapport..."
        className="w-full px-4 py-2 pl-10 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm"
      />
      <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </motion.div>
  );
}
