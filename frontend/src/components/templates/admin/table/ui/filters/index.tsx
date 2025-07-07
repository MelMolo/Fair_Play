"use client";

import { useState, useRef, useEffect } from "react";
import { Report } from "@/types/reports";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaCalendarAlt,
} from "react-icons/fa";
import clsx from "clsx";

interface Props {
  reports: Report[];
  setReports: (filtered: Report[]) => void;
}

const filterOptions = [
  "Today",
  "This Week",
  "This Month",
  "This Year",
  "Custom Date",
  "Custom Year",
];

export default function DateFilter({ reports, setReports }: Props) {
  const [open, setOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("");
  const [customDate, setCustomDate] = useState<string>("");
  const [customYear, setCustomYear] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const applyFilter = (option: string) => {
    setActiveFilter(option);
    setOpen(false);

    const now = new Date();
    const filtered = reports.filter((report) => {
      const date = new Date(report.date);

      switch (option) {
        case "Today":
          return date.toDateString() === now.toDateString();
        case "This Week":
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          return date >= startOfWeek;
        case "This Month":
          return (
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        case "This Year":
          return date.getFullYear() === now.getFullYear();
        case "Custom Date":
          return (
            customDate &&
            date.toDateString() === new Date(customDate).toDateString()
          );
        case "Custom Year":
          return customYear && date.getFullYear() === Number(customYear);
        default:
          return true;
      }
    });

    setReports(filtered);
  };

  return (
    <div
      style={{ width: "116px" }}
      className="relative max-w-fit text-left"
      ref={ref}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-500 hover:text-white transition-colors focus:outline-none"
      >
        <FaFilter className="mr-2" />
        Filters
        {open ? (
          <FaChevronUp className="ml-2" />
        ) : (
          <FaChevronDown className="ml-2" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-2 z-10 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100"
          >
            {filterOptions.map((option) => (
              <li
                key={option}
                onClick={() => {
                  if (option === "Custom Date" || option === "Custom Year")
                    return;
                  applyFilter(option);
                }}
                className={clsx(
                  "px-4 py-2 text-sm hover:bg-blue-500 hover:text-white cursor-pointer transition-colors",
                  activeFilter === option && "font-semibold text-blue-500"
                )}
              >
                <div className="flex items-center gap-2">
                  <FaCalendarAlt />
                  {option}
                </div>
              </li>
            ))}

            <div className="p-3 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Custom Date
                </label>
                <input
                  type="date"
                  className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  value={customDate}
                  onChange={(e) => {
                    setCustomDate(e.target.value);
                    setActiveFilter("Custom Date");
                    applyFilter("Custom Date");
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Custom Year
                </label>
                <input
                  type="number"
                  className="w-full mt-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  value={customYear}
                  onChange={(e) => {
                    setCustomYear(e.target.value);
                    setActiveFilter("Custom Year");
                    applyFilter("Custom Year");
                  }}
                  placeholder="e.g. 2023"
                />
              </div>
            </div>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
