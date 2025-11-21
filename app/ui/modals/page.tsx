import React from "react";

interface ModalProps {
  id: string;
  title: string;
  content: React.ReactNode;
  onCloseText?: string;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({ id, title, content, onCloseText, onClose }) => {
  const handleClose = () => {
    const modal = document.getElementById(id) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <dialog id={id} className="modal">
      <div className="modal-box bg-[#ffffff] text-black dark:bg-[#181818] dark:text-white relative">
        {/* Close button at top right */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h3 className="text-lg font-bold pr-8">{title}</h3>
        <div className="py-4">{content}</div>
        <div className="modal-action">
          <form method="dialog"></form>
        </div>
      </div>
    </dialog>
  );
};

export default Modal;