import { useState } from "react";
import styles from "./InviteeInfo.module.css";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {setInviteeViaMail,removeInviteeViaMail,setInviteeViaNumber,removeInviteeViaNumber} from "../../Store/Slices/CreateEventDataStateSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InviteeInfo = () => {

  const navigate=useNavigate();
  const {
    inviteeViaMail,
    inviteeViaNumber,
    eventName,
    isOpen,
    isFree,
    price,
    date,
    location,
    startTime,
    endTime,
    category,
    format,
    description,
    hashTags,
    files
  }=useSelector(state=>state.createEventDataStateReducer) || "";
  const [error,setError]=useState("");

  const dispatch =useDispatch();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const addEmail=(e)=>{
    if(!emailRegex.test(e.target.value)){
      setError("Invalid Email");
      return;
    }
    dispatch(setInviteeViaMail(e.target.value));
    e.target.value="";
  }
  const addMobileNumber=(e)=>{
    dispatch(setInviteeViaNumber(e.target.value)); 
    e.target.value="";
  }
  const handlePublish=async()=>{

    const formData=new FormData;
    files.forEach((item)=>{
      formData.append("files",item);
    })

   formData.append("inviteeViaMail",inviteeViaMail);
   formData.append("inviteeViaNumber",inviteeViaNumber);
   formData.append("eventName",eventName);
   formData.append("isOpen",isOpen);
   formData.append("isFree",isFree);
   formData.append("price",price);
   formData.append("date",date);
   formData.append("location",location);
   formData.append("startTime",startTime);
   formData.append("endTime",endTime);
   formData.append("category",category);
   formData.append("format",format);
   formData.append("description",description);
   formData.append("hashTags",hashTags);

    
    const resp=await axios.post(`${import.meta.env.VITE_BASE_URI}/events/register`,formData,{
      withCredentials:true,
      headers:{
        "Content-Type":"multipart/form-data"
      }
    });
    navigate("/");
    console.log(resp);
  };

  return (
    <div className="min-h-[85vh] flex items-center">
        <div className={`sm:w-[68.75vw]  bg-[#21787333] sm:flex rounded-lg mt-5 p-5 mx-auto gap-5 ${styles.container}`}>
      <div className="sm:w-[33.75vw] flex flex-col gap-5"> 
        <span>Invite Via Email</span>

        <input type="email" placeholder="Enter Email Address" onKeyDown={ (e)=>{if(e.key=="Enter" && e.target.value.trim()!==""){addEmail(e)}}} enterKeyHint="done" onChange={()=>setError("")} />
        <p className={`text-red-700 ${error==""?"hidden":"block"}`}>{error}</p>
        <div className={`flex gap-2 bg-white  rounded-lg flex-wrap mb-5  ${inviteeViaMail.length>0?"p-2":"p-0"}`}>
            {[...inviteeViaMail].reverse().map((email,index)=>
            <div key={index} className="rounded-3xl border border-black px-2 flex items-center gap-2">
              <li  className="text-xl">{email}</li>
              <RxCross1 className="text-xl cursor-pointer" onClick={()=>dispatch(removeInviteeViaMail(email))}/>
            </div>)}
        </div>
      </div>
      <div className="sm:w-[33.75vw] flex flex-col gap-5">
        <span>Invite Via Mobile Number</span>
        <input type="number" placeholder="Enter Phone Number" onKeyDown={ (e)=>{if(e.key=="Enter" && e.target.value.trim()!==""){addMobileNumber(e)}}} enterKeyHint="done"/>
        <div className={`flex gap-2 bg-white  rounded-lg flex-wrap  ${inviteeViaNumber.length>0?"p-2":"p-0"}`}>
            {[...inviteeViaNumber].reverse().map((mobileNumber,index)=>
            <div key={index} className="rounded-3xl border border-black px-2 flex items-center gap-2">
              <li  className="text-xl">{mobileNumber}</li>
              <RxCross1 className="text-xl cursor-pointer" onClick={()=>dispatch(removeInviteeViaNumber(mobileNumber))}/>
            </div>)}
        </div>
      <div className="self-end px-10 py-2 bg-[#B1761F] text-white rounded-lg text-2xl" onClick={handlePublish}><button >Publish</button></div>
      </div>
    </div>
    </div>
  )
}

export default InviteeInfo
