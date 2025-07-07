"use client";

import Button from "@/components/reusable/buttons";
import { Report } from "@/types/reports";
import { useState } from "react";
import { HiChat } from "react-icons/hi";
import Modal from "@/components/reusable/modal";
import ReportMessageBox from "../content";

const ReportMessage: React.FC<{ report: Report }> = ({ report }) => {
  const [showMessage, setShowMessage] = useState(false);

  return (
    <>
      <Button onClick={() => setShowMessage(true)} variant="ghost" className="">
        <HiChat />
      </Button>
      <Modal
        isOpen={showMessage}
        shouldCloseOnOverlayClick
        onClose={() => setShowMessage(false)}
      >
        <ReportMessageBox report={report} />
      </Modal>
    </>
  );
};

export default ReportMessage;
