"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Assignment2 = () => {
  const [status, setStatus] = useState<"idle" | "downloading" | "done">("idle");
  const hasDownloaded = useRef(false); 

  const fetchUser = async () => {
    try {
      setStatus("downloading");

      const { data } = await axios.get(`/api/getUser`);

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "users-by-department.json";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setStatus("done");
    } catch (error: any) {
      console.error("Download failed:", error.message);
      setStatus("idle");
    }
  };

  useEffect(() => {
    if (!hasDownloaded.current) {
      fetchUser();
      hasDownloaded.current = true; 
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 bg-black text-white">
      <h1 className="text-2xl font-bold">Assignment 2</h1>
      <div className="flex gap-4">
        <div className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
          {status === "downloading" && <p>Downloading JSON...</p>}
          {status === "done" && <p>✅ JSON Downloaded!</p>}
          {status === "idle" && <p>Waiting...</p>}
        </div>
        <Link
          href={`/`}
          className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition cursor-pointer"
        >
          Home
        </Link>
      </div>
    </main>
  );
};

export default Assignment2;
