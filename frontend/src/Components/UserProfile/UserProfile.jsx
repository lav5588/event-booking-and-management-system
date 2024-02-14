import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logIn,logOut } from "../Store/Slices/AuthSlice"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const UserProfile = () => {

  const navigate=useNavigate();
  const {fullName, email, dob, gender}=useSelector(state=>state.authReducer.userData || "");
  const status=useSelector(state=>state.authReducer.status);
  const dispatch=useDispatch();
  
  const handleLogOut=async()=>{
      const logOutData= await axios.get(`${import.meta.env.VITE_BASE_URI}/users/logout`,{withCredentials:true});
      dispatch(logOut());
      console.log("logged out")
      console.log("logged out:",logOutData.data);
      navigate("/");
  }

  return (
    <>{status &&
    <div className="p-5">
        <img src="" alt="" />
        <div>
          <h1>{fullName}</h1>
          <p>{email}</p>
          <p>{dob}</p>
          <p>{gender}</p>
          <button className="bg-[DarkCyan] text-white p-2 flex gap-2 items-center rounded-lg" onClick={handleLogOut}>Log Out</button>
        </div>
    </div>}</>
  )
}

export default UserProfile
