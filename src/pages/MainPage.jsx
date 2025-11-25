import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header/Header.jsx";
import Navbar from "../components/Header/Navbar/Navbar.jsx";
import EmployeeTab from "../components/Tab/EmployeeTab.jsx";
import DashBoardTab from "../components/Tab/DashBoardTab.jsx";
import CreateEmployeeForm from "../components/Form/CreateEmployeeForm.jsx";
import EditEmployeeForm from "../components/Form/EditEmployeeForm.jsx";
import { fetchAdmin } from "../Services/admin-api.jsx";
import InitialLoader from "../components/InitialLoader.jsx";

function MainPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      setIsAuthLoading(true);
      const startTime = Date.now();

      const toastId = toast.loading("Verifying session...", {
        position: "top-right",
        theme: "dark",
      });

      try {
        const admin = await fetchAdmin();
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

        setData(admin);
        toast.update(toastId, {
          render: `Authenticated! (${elapsed}s)`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
      } catch (err) {
        toast.update(toastId, {
          render: "Session expired. Redirecting...",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
        setTimeout(() => navigate("/login"), 1500);
      } finally {
        setIsAuthLoading(false);
        setIsInitialLoad(false);
      }
    };

    checkAuth();
  }, []);

  if (isInitialLoad) {
    return <InitialLoader />;
  }

  if (isAuthLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
          <p className="text-lg text-gray-600">Verifying...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full h-full border">
        <Header>
          <Navbar data={data} />
        </Header>
        <Routes>
          <Route index element={<DashBoardTab />} />
          <Route path="/employee-list" element={<EmployeeTab />} />
          <Route path="/create-employee" element={<CreateEmployeeForm />} />
          <Route path="/update-employee" element={<EditEmployeeForm />} />
        </Routes>
      </div>
    </>
  );
}

export default MainPage;
