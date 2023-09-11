"use client";

import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          background: "#333",
          color: "#fff",
        },
      }}
    />
  );
};

export default ToasterProvider;
