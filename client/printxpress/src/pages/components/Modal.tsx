import React from "react";

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-yellow-100 w-96 rounded-lg shadow-2xl p-6 py-12 border border-gray-600">
          <h2 className="text-2xl font-semibold mb-4">Print Document?</h2>

          <div className="flex justify-center">
            <button
              onClick={() => {
                /* Add logic to handle printing */
              }}
              className="bg-white hover:bg-green-200 font-bold py-2 px-4 mr-4 rounded-full border border-green-600 text-green-600 w-[150px]"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className="bg-white hover:bg-red-200 font-bold py-2 px-4 mr-4 rounded-full border border-red-400 text-red-500 w-[150px]"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;