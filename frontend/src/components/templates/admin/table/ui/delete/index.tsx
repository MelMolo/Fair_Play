/* eslint-disable  @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import toast, { LoaderIcon } from "react-hot-toast";
import { useReports } from "../../../context";

const DeleteButton: React.FC<{ id: string }> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const { setRefresh } = useReports();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/report/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data?.message ?? "Error deleting report.");
      } else {
        toast.success(data?.message ?? "Report deleted successfully.");
        setRefresh(true); // Refresh the reports list
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="cursor-pointer"
      title="Delete Report"
      onClick={handleDelete}
      disabled={loading}
    >
      {loading ? (
        <LoaderIcon className="animate-spin" />
      ) : (
        <FaTrash className="hover:text-red-400 transition-all" />
      )}
    </button>
  );
};

export default DeleteButton;
