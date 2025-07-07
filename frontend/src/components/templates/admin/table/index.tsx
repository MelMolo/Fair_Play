"use client";

import { Report } from "@/types/reports";
import { AnimatePresence, motion } from "framer-motion";
import DeleteButton from "./ui/delete";
import ReportMessage from "./ui/message/button";

interface Props {
  reports: Report[];
  loading?: boolean;
}

export default function ReportsTable({ reports, loading = false }: Props) {
  const skeletonRows = Array.from({ length: 5 });

  const isEmpty = !loading && reports.length === 0;

  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-md">
      <table className="w-full text-sm text-left text-gray-700">
        <thead className="bg-blue-500 text-white uppercase text-xs tracking-wider">
          <tr>
            <th className="px-4 py-3">Nom</th>
            <th className="px-4 py-3">Événement</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Pays</th>
            <th className="px-4 py-3">Âge</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {loading ? (
              skeletonRows.map((_, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t animate-pulse"
                >
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                    </td>
                  ))}
                </motion.tr>
              ))
            ) : isEmpty ? (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <td
                  colSpan={7}
                  className="text-center px-4 py-6 text-gray-500 dark:text-gray-400"
                >
                  Aucun rapport trouvé.
                </td>
              </motion.tr>
            ) : (
              reports.map((report) => (
                <motion.tr
                  title="Click to view message"
                  key={report.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="border-t hover:bg-blue-500/10 cursor-pointer transition-colors duration-200"
                >
                  <td className="px-4 py-3 whitespace-nowrap font-medium">
                    {report.firstName} {report.lastName}
                  </td>
                  <td className="px-4 py-3">{report.event}</td>
                  <td className="px-4 py-3">{report.type}</td>
                  <td className="px-4 py-3">{report.country}</td>
                  <td className="px-4 py-3">{report.age}</td>
                  <td className="px-4 py-3">{report.date}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="flex items-center justify-center gap-2">
                      <DeleteButton id={report.id} />
                      <ReportMessage report={report} />
                    </span>
                  </td>
                </motion.tr>
              ))
            )}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
