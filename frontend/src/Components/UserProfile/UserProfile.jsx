import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut } from "../Store/Slices/AuthSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { fullName, email, dob, gender } = useSelector((state) => state.authReducer.userData || "");
  const status = useSelector((state) => state.authReducer.status);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    const logOutData = await axios.get(`${import.meta.env.VITE_BASE_URI}/users/logout`, { withCredentials: true });
    dispatch(logOut());
    console.log("logged out");
    console.log("logged out:", logOutData.data);
    navigate("/");
    location.reload();
  };

  return (
    <>
      {status && (
        <div className="flex items-center justify-center h-screen bg-gradient-to-b from-gray-100 to-gray-200">
          <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
            <div className="flex items-center justify-center">
              <img src="" alt="" className="h-24 w-24 rounded-full" />
            </div>
            <div className="mt-6">
              <h1 className="text-xl font-bold text-center">{fullName}</h1>
              <p className="text-gray-600 text-center">{email}</p>
              <div className="mt-4 flex flex-col">
                <p className="text-gray-600"><span className="font-bold">Date of Birth:</span> {dob}</p>
                <p className="text-gray-600"><span className="font-bold">Gender:</span> {gender}</p>
              </div>
              <button className="mt-6 bg-[#217873] text-white px-4 py-2 rounded-lg hover:bg-[#41a39f] focus:outline-none focus:ring focus:ring-blue-200" onClick={handleLogOut}>Log Out</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
