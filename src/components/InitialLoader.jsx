// components/InitialLoader.jsx
import { useEffect, useState } from "react";

const InitialLoader = () => {
  const [dots, setDots] = useState("");
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const timerInterval = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(timerInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-teal-600 to-teal-800">
      <div className="text-center">
        <h1 className="mb-8 text-6xl font-bold text-white">empbase</h1>

        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 border-4 rounded-full border-white/30"></div>
          <div className="absolute inset-0 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        </div>

        <p className="mb-2 text-xl text-white">Starting application{dots}</p>

        {secondsElapsed > 8 && (
          <p className="text-sm text-white/80">
            Waking up backend (Vercel cold start ~{20 - secondsElapsed}s)
          </p>
        )}

        {secondsElapsed > 15 && (
          <p className="mt-2 text-sm text-yellow-200 animate-pulse">
            ⚠️ First load can take 20-30s, please wait...
          </p>
        )}
      </div>
    </div>
  );
};

export default InitialLoader;
