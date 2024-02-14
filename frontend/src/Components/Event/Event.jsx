import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Carousel, Timeline } from '@material-tailwind/react';
import { formattedDate } from '../Events/Events';
import { SlCalender } from "react-icons/sl";
import { MdAccessTimeFilled } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Event = () => {

    const [data,setData] = useState(null);
    const [loading,setLoading]=useState(true);
    const status=useSelector(state=>state.authReducer.status);

    const {eventid}=useParams();
    
    useEffect(()=>{
       
        (async()=>{
            setLoading(true);
            const event=await axios.get(`${import.meta.env.VITE_BASE_URI}/events/${eventid}`);
            setLoading(false)
            setData(event?.data.data);
        })();
        
    },[]);

    if(loading){
        return (<h1>Loading...</h1>)
    }

    const bookTicket=async()=>{
            try {

                if(!status){
                    alert("please login first");
                    return;
                }

                if(confirm('Do you want to book this event?')){
                    
                    const response=await axios.post(`${import.meta.env.VITE_BASE_URI}/bookings/addTicket`,{eventId:data._id},{withCredentials:true})
                    if(!response){
                        console.log("Something went wrong while booking ticket");
                        return;
                    }
                    console.log(response);
                    alert(response.data.message);
                }
                  
            } catch (error) {
                console.log(error);
            }
    }

  return (
    <div className='my-4'>{
        data && <div className='flex flex-col items-center'>
            <Carousel
                    className="rounded-xl mx-auto w-full h-[50vh] sm:w-[50vw] sm:h-[80vh]"
                    navigation={({ setActiveIndex, activeIndex, length }) => (
                        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                        {new Array(length).fill("").map((_, i) => (
                            <span
                            key={i}
                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                            }`}
                            onClick={() => setActiveIndex(i)}
                            />
                            ))}
                        </div>
                    )}
                    >
                    {
                        data.files.map((file, index) => (
                            <img
                            key={index}
                            src={file}
                            alt={`image ${index}`}
                            className="w-full h-full object-cover"
                            
                            />
                            ))
                        }
            </Carousel>
            <h1 className='text-[2rem] font-extrabold'>{data.eventName}</h1>
            <div className='flex gap-16 items-end flex-wrap justify-center'>
                <p className='bg-[DarkCyan] text-white p-2 flex gap-2 items-center rounded-lg'><SlCalender />{formattedDate(data.eventDate)}</p>
                <div className='bg-[#21787333] text-center px-3 pt-3 rounded-lg'>
                    <p>₹{data.price}</p>
                    <button className='bg-[DarkCyan] text-white p-2 rounded-lg' onClick={bookTicket}>Buy Tickets</button>
                </div>

            </div>  

            <div>
                <div className='sm:m-10 bg-[#21787333] p-5 rounded-lg text-justify'>
                        <h1 className='text-[2rem] font-semibold text-[Orange]'>Basic info</h1>
                        <div className='w-[4.25rem] h-[0.5rem] rounded-lg bg-[#F5A42C]'></div>
                        <div className='flex justify-around flex-wrap gap-5'>
                            <div>
                                <p className='flex items-center gap-2 font-bold'><SlCalender />Date</p>
                                <p>{formattedDate(data.eventDate)}</p>
                            </div>
                            <div>
                                <p className='flex items-center gap-2 font-bold'><MdAccessTimeFilled className='text-xl'/>Time</p>
                                <p>{data.startTime}</p>

                            </div>
                            <div>
                                <p className='flex items-center gap-2 font-bold'><MdLocationOn className='text-xl' />Location</p>
                                <p className='max-w-[7rem]'>{data.location}</p>

                            </div>
                        </div>

                </div>
                <div className='sm:m-10 bg-[#21787333] p-5 rounded-lg text-justify'>
                        <h1 className='text-[2rem] font-semibold text-[Orange]'>Description</h1>
                        <div className='w-[4.25rem] h-[0.5rem] rounded-lg bg-[#F5A42C]'></div>
                        <p>{data.eventDescription}</p>
                </div>
            </div>
        </div>
        }
    </div>
  )
}

export default Event
