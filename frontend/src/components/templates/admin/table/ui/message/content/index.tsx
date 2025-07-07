"use client";

import { Report } from "@/types/reports";
import {
  FaCalendarAlt,
  FaInfoCircle,
  FaTag,
  FaQuoteLeft,
} from "react-icons/fa";

interface Props {
  report: Report;
  className?: string;
}

const ReportMessageBox: React.FC<Props> = ({ report, className = "" }) => {
  return (
    <div
      className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-6 max-w-xl w-full transition duration-300 ${className}`}
    >
      {/* Description */}
      <div className="flex items-start gap-3 mb-4">
        <FaQuoteLeft className="text-blue-500 mt-1" />
        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
          {report.description}
        </p>
      </div>

      {/* Event */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
        <FaInfoCircle className="text-purple-500" />
        <span className="font-medium">Event:</span> <span>{report.event}</span>
      </div>

      {/* Type */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
        <FaTag className="text-green-500" />
        <span className="font-medium">Type:</span> <span>{report.type}</span>
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <FaCalendarAlt className="text-red-500" />
        <span className="font-medium">Date:</span> <span>{report.date}</span>
      </div>
    </div>
  );
};

export default ReportMessageBox;
