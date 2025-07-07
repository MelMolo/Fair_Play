import { motion, AnimatePresence, Variants } from "framer-motion";
import { ReactNode, useEffect } from "react";
import { HiX } from "react-icons/hi";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  shouldCloseOnOverlayClick?: boolean;
  showCloseButton?: boolean;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: -50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: { opacity: 0, scale: 0.85, y: 20 },
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  overlayClassName = "",
  shouldCloseOnOverlayClick = true,
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm ${overlayClassName}`}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={shouldCloseOnOverlayClick ? onClose : undefined}
          />

          {/* Modal Content */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            onClick={shouldCloseOnOverlayClick ? onClose : undefined}
          >
            <div
              className={`relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-2xl h-[80vh] overflow-auto w-full p-6 ${className}`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-red-500 transition"
                >
                  <HiX size={20} />
                </button>
              )}

              {/* Modal Body */}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
