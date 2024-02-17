import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedEvent } from '../Store/Slices/EventDataSlice';
import { useNavigate } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';
import { setLike } from '../Store/Slices/EventDataSlice';

export const formattedDate=(evDate)=>{
  const originalDate = new Date(evDate);
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  
  const formattedDate = originalDate.toLocaleDateString('en-US', options);
  const dayWithOrdinal = addOrdinalSuffix(originalDate.getDate());
  
  
  // Function to add ordinal suffix to the day
  function addOrdinalSuffix(day) {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
        case 2:
          return `${day}nd`;
          case 3:
            return `${day}rd`;
            default:
              return `${day}th`;
            }
          }
          
          return (`${formattedDate.split(',')[0]} · ${dayWithOrdinal} ${formattedDate.split(',')[1]}`.slice(0,-1)+evDate.slice(0,4)+' . ');
}

const Events = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  

  const eventData = useSelector(state=>state.eventDataReducer.eventData);
  const status = useSelector(state=>state.authReducer.status);
  const onClickHandler =(eventId)=>{
      navigate(`/event/${eventId}`);
  }

  const handleFavorites=async(eventId)=>{
      try {
          if(!status){
            if(confirm('Please Login First to like the event.\nDo you want to Login?')){
                navigate('/signin');
                return;
            }
          }
          const response=await axios.post(`${import.meta.env.VITE_BASE_URI}/favorites/handlefavorite`,{eventId},{withCredentials:true})
          if(!response){
              console.log("Something went wrong while adding favorites");
              return;
          }
          console.log(response.data);
          dispatch(setLike(eventId));
          
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <>
        <h1 className='text-center text-3xl font-semibold'>EVENTS</h1>
    <div className='flex flex-wrap sm:mx-14 rounded-lg bg-[#21787333] gap-3 my-5 justify-center'>
       {
        eventData?.map((data)=>{
          return (
            <div key={data._id} className='p-2.5 m-2.5 w-96  shadow-md bg-white  rounded-lg hover:shadow-gray-900 hover:scale-105 hover:shadow-2xl'  >
              <img src={data.files[0]} className='h-60 w-96 rounded-lg' alt="" />
              <button className={`text-3xl relative bg-white rounded-[50%] p-3 top-[-15rem] left-[20rem] ${data.isLike?"text-[red]":"text-[#969090]"} hover:text-[red]`} onClick={()=>handleFavorites(data._id)}><FaHeart className=''/></button>
             <div onClick={()=>{onClickHandler(data._id)}} className='cursor-pointer'>
                <h1 className='font-semibold text-3xl text-center'>{data.eventName}</h1>
                  <p>{formattedDate(data.eventDate)+data.startTime}</p>
                  <p>{data.location }</p>
                  <span>{data.creatorName}</span>
                  <p>{data.eventDescription.slice(0,150)+"...."}</p>
             </div>
              
            </div>
          )
        })
       }
    </div></>
  )
}

export default Events
