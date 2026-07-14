"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Server } from "lucide-react";
import Link from "next/link";

interface GymData {
  status: string;
  data: {
    name: string;
    count: number;
  };
}

export default function GymPage() {
  const [data, setData] = useState<GymData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGymData = async () => {
      try {
        // Attempt to fetch from local FastAPI backend
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
        const res = await fetch(`${baseUrl}/gym`);
        if (!res.ok) {
          throw new Error(`Failed to fetch data. Status: ${res.status}`);
        }
        const result = await res.json();
        setData(result);
      } catch (err: any) {
        setError(
          err.message || "An error occurred while connecting to the backend.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchGymData();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-[#FF2D2D] opacity-20 blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6">
            <Server className="w-8 h-8 text-[#FF2D2D]" />
          </div>

          <h1 className="text-3xl font-bold mb-2">Backend Connection</h1>
          <p className="text-gray-500 dark:text-[#BFBFBF] mb-10">
            Testing the connection between Next.js and FastAPI
          </p>

          <div className="w-full bg-gray-50 dark:bg-[#0B0B0B] border border-gray-200 dark:border-white/5 rounded-2xl p-6 mb-8 text-left">
            <div className="text-sm font-semibold text-gray-400 dark:text-white/50 mb-4 uppercase tracking-wider">
              Response Data
            </div>

            {loading && (
              <div className="flex items-center gap-3 text-gray-600 dark:text-[#BFBFBF]">
                <Activity className="w-5 h-5 animate-pulse text-[#FF2D2D]" />
                Connecting to http://localhost:8000...
              </div>
            )}

            {error && (
              <div className="text-red-500 bg-red-500/10 p-4 rounded-xl text-sm border border-red-500/20">
                {error}
                <p className="mt-2 text-xs opacity-80">
                  Make sure your FastAPI server is running on port 8000 using{" "}
                  <code className="bg-red-500/20 px-1 rounded">
                    uvicorn app.main:app --reload
                  </code>
                </p>
              </div>
            )}

            {data && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-white/5">
                  <span className="text-gray-500 dark:text-[#BFBFBF]">
                    Status
                  </span>
                  <span className="text-green-500 font-medium capitalize">
                    {data.status}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-white/5">
                  <span className="text-gray-500 dark:text-[#BFBFBF]">
                    Name
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {data.data.name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 dark:text-[#BFBFBF]">
                    Count
                  </span>
                  <span className="font-bold text-2xl text-gray-900 dark:text-white">
                    {data.data.count}
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          <Link href="/">
            <button className="px-6 py-3 rounded-full bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-900 dark:text-white text-sm font-medium transition-colors border border-gray-200 dark:border-white/10">
              Return Home
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
