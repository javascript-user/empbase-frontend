import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function InitialLoader() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const timers = [
      setTimeout(() => setMessage("Waking up server..."), 2000),
      setTimeout(
        () => setMessage("This may take a few seconds (free hosting)..."),
        5000
      ),
      setTimeout(() => {
        toast.info("Server is starting up. Not an error.", { autoClose: 4000 });
      }, 7000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-screen text-2xl font-semibold text-white bg-black">
      {message}
    </div>
  );
}

export default InitialLoader;
