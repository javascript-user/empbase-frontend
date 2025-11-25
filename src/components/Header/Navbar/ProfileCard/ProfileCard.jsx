import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserAstronaut } from "react-icons/fa";

import Modal from "../../../Modal.jsx";
import Button from "../../../Button/Button.jsx";
import Loading from "../../../Loading.jsx";

import useLoadingContext from "../../../../hooks/use-LoadingContext.jsx";
import { logout } from "../../../../Services/admin-api.jsx";

function ProfileCard({ data }) {
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useLoadingContext();
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      toast.success("logout Successful", { autoClose: 2000 });
      navigate("/login");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div
        className="p-3 bg-black rounded-full cursor-pointer"
        onClick={() => setShowModal(true)}
      ><FaUserAstronaut className="text-white" size={25} /></div>
      {showModal && (
        <Modal onClose={handleClose}>
          <div className="text-center">
            <div className="px-4 text-xl font-semibold">{data.name}</div>
            <div className="px-4 text-gray-500">{data.username}</div>
            <Button
              className={`${isLoading ? "cursor-not-allowed" : "bg-blue-600"}`}
              onClick={handleLogout}
            >
              {isLoading ? <Loading /> : "logout"}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ProfileCard;
