import React from "react";

export default function Modal({ show, onClose, children }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                p-6 rounded-lg shadow-xl w-96
            ">
                {children}

                <button
                    onClick={onClose}
                    className="
                        mt-4 px-4 py-2
                        bg-blue-600 text-white
                        rounded hover:bg-blue-700
                        dark:bg-blue-500 dark:hover:bg-blue-400
                    "
                >
                    Close
                </button>
            </div>
        </div>
    );
}
