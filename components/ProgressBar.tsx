"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProgressBar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);
    handleStart();
    setTimeout(() => {
      handleComplete();
    }, 1000);
  }, [router]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-1 bg-gradient-to-r ${
        loading
          ? "from-[#4131FF] to-[#8E5BFADC]"
          : "from-transparent to-transparent"
      }`}
      style={{
        transformOrigin: "left",
        transform: loading ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 0.3s ease",
      }}
    />
  );
};

export default ProgressBar;
