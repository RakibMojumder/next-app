"use client";

import { motion as m } from "framer-motion";
import { createPortal } from "react-dom";

const Toast = ({ data, setToast }) => {
  return createPortal(
    <m.div
      role="alert"
      initial={{ y: -100 }}
      animate={{ y: 0, transition: { duration: 0.3 } }}
      exit={{ y: -100, transition: { duration: 0.3 } }}
      className={`fixed top-0 left-0 h-16 px-3 lg:px-12 w-full flex justify-between items-center z-50 ${
        data.success ? "bg-green-500" : "bg-red-400"
      }`}
    >
      <h3 className="flex-1 text-center">{data.msg}</h3>
      <button onClick={() => setToast((prev) => !prev)} className="p-4 text-lg">
        X
      </button>
    </m.div>,
    document.getElementById("portal")
  );
};

export default Toast;
