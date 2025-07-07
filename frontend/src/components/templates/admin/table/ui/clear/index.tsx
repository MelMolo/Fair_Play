/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import toast, { LoaderIcon } from "react-hot-toast";
import { useReports } from "../../../context";
import Button from "@/components/reusable/buttons";

const ClearButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { setRefresh } = useReports();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/report/clear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message ?? "Error deleting reports.");
      } else {
        toast.success(data?.message ?? "Reports deleted successfully.");
        setRefresh(true); // Refresh the reports list
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="cursor-pointer !h-[37px] group "
      title="Delete Report"
      onClick={handleDelete}
      disabled={loading}
      variant="ghost"
      icon={
        loading ? (
          <LoaderIcon className="animate-spin" />
        ) : (
          <FaTrash className="group-hover:!text-red-400 transition-all" />
        )
      }
    >
      <span className="hidden md:inline">Clear All</span>
    </Button>
  );
};

export default ClearButton;
