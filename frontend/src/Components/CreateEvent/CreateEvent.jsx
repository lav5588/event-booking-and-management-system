import { useDispatch, useSelector } from "react-redux";
import BasicInfo from "./BasicInfo/BasicInfo"
import InviteeInfo from "./InviteeInfo/InviteeInfo"
import { setBasicInfo,setInviteeInfo } from "../Store/Slices/CreateEventPageStateSlice";
import { useEffect } from "react";



const CreateEvent = () => {


  const dispatch =useDispatch();
  const {basicInfo, inviteeInfo}=useSelector(state=>state.createEventPageStateReducer);



  useEffect(() =>{
    dispatch(setBasicInfo(true));
    dispatch(setInviteeInfo(false));
  },[]);


const handleClickBasicInfo = (e)=>{
    dispatch(setBasicInfo(true));
    dispatch(setInviteeInfo(false));
}

const handleClickInviteeInfo = (e)=>{
    dispatch(setBasicInfo(false));
    dispatch(setInviteeInfo(true));
}

  return (
    <div>
      <div className="w-[68.75vw] mx-auto flex flex-col gap-5">
        <div>
          <div className="text-[#B1761F] text-[1.5rem] font-semibold">Create Event</div>
          <div className="bg-[#B1761F] h-2 w-[4.25rem] rounded-lg"></div>
        </div>
        <div className="flex gap-5">
           <div>
              <button className={`text-2xl ${basicInfo?"text-[#217873]":"text-[#7F7F7F]"}`} onClick={handleClickBasicInfo}>Basic Info</button>
              {basicInfo && <div className="h-[0.25rem] bg-[#217873] rounded-3xl"></div>}
           </div>
           <div>
              <button className={`text-2xl ${inviteeInfo?"text-[#217873]":"text-[#7F7F7F]"}`} onClick={handleClickInviteeInfo}>Invitee info</button>
              {inviteeInfo && <div className="h-[0.25rem] bg-[#217873] rounded-3xl"></div>}
           </div>
        </div>
      </div>
      {basicInfo && <BasicInfo />}
      {inviteeInfo && <InviteeInfo />}
    </div>
  )
}

export default CreateEvent
