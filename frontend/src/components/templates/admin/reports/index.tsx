/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { Report } from "@/types/reports";
import { useState, useEffect } from "react";
import SearchBox from "../table/ui/search";
import DateFilter from "../table/ui/filters";
import ReportsTable from "../table";
import { motion } from "framer-motion";
import { FaClipboardList } from "react-icons/fa";
import { useReports } from "../context";
import toast from "react-hot-toast";
import ClearButton from "../table/ui/clear";

const ReportsTemplate: React.FC = () => {
  const { reports, setReports, refresh, setRefresh } = useReports();
  const [reportList, setReportList] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  async function getReports() {
    if (reports) {
      setLoading(false);
    }

    try {
      const res = await fetch("/api/report");
      const data = await res.json();

      console.log(data);
      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      setReports(data.reports);
      setReportList(data.reports);
    } catch (error: any) {
      toast.error(error?.message || "");
    } finally {
      setLoading(false);
      setRefresh(false);
    }
  }

  useEffect(() => {
    getReports();
  }, [refresh]);

  return (
    <section
      id="reports"
      className="px-4 md:px-10 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 dark:text-white flex justify-center items-center gap-2">
          <FaClipboardList className="text-blue-500" />
          Rapports des Utilisateurs
        </h1>
        <p className="text-gray-500 dark:text-gray-300 text-sm md:text-base mt-2">
          Recherchez, filtrez et gérez les rapports soumis
        </p>
      </motion.header>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full mb-6 flex flex-col md:flex-row md:justify-start md:items-center md:gap-4 gap-4"
      >
        <SearchBox reports={reports ?? []} setReports={setReportList} />
        <div className="flex items-center gap-4">
          <DateFilter reports={reports ?? []} setReports={setReportList} />
          <ClearButton />
        </div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="overflow-x-auto"
      >
        <ReportsTable reports={reportList ?? []} loading={loading} />
      </motion.div>
    </section>
  );
};

export default ReportsTemplate;
