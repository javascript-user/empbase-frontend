import { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Header from "../components/Header/Header.jsx";
import Navbar from "../components/Header/Navbar/Navbar.jsx";
import EmployeeTab from "../components/Tab/EmployeeTab.jsx";
import DashBoardTab from "../components/Tab/DashBoardTab.jsx";
import CreateEmployeeForm from "../components/Form/CreateEmployeeForm.jsx";
import { fetchAdmin } from "../Services/admin-api.jsx";
import EditEmployeeForm from "../components/Form/EditEmployeeForm.jsx";

function MainPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loadingState, setLoadingState] = useState(false);

  const fetchData = useCallback(async () => {
    setLoadingState(true);
    try {
      const admin = await fetchAdmin();
      setData(admin);
    } catch (err) {
      if (err) {
        navigate("/login");
      }
    } finally {
      setLoadingState(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loadingState) {
    return (
      <div className="flex items-center justify-center w-screen h-screen text-4xl font-bold text-center bg-black">
        Loading...
      </div>
    );
  }

  return (
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
  );
}

export default MainPage;
