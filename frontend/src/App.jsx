import { Outlet } from "react-router-dom"
import {
  Footer,
  Header,
} from "./Components"
import { useEffect } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { logIn } from "./Components/Store/Slices/AuthSlice" 
import {setEventData} from "./Components/Store/Slices/EventDataSlice"
import toast, { Toaster } from "react-hot-toast"

const App=()=> {
  const dispatch = useDispatch()
  const userData=useSelector(state=>state.authReducer.userData);
  const eventData = useSelector(state=>state.eventDataReducer.eventData);

  useEffect(() => {
    
    if(!eventData){
      (async()=>{
        const toastId = toast.loading("Events data are fetching ...")
        const event=await axios.get(`${import.meta.env.VITE_BASE_URI}/events/get-events`,{withCredentials:true});
        dispatch(setEventData(event.data.data))
        toast.dismiss(toastId);
        toast.success("Events data fetched successfully")
        // console.log("Event: ",event?.data);
      })();
    }
    else{
      console.log(!eventData);
      console.log("eventData",eventData)
    }
    if(!userData){
      (async()=>{
        const toastId = toast.loading("User data is fetching ...")
        try {
          const User=await axios.get(`${import.meta.env.VITE_BASE_URI}/users/current-user`,{withCredentials: true})
          dispatch(logIn(User.data.data))
          toast.dismiss(toastId);
          toast.success("User data fetched successfully")
        } catch (error) {
          toast.dismiss(toastId);
          toast("You are not logged in");
          console.error("ERROR: ",error)
        }
      })();
    }
    else{
      console.log("userData",userData)
    }
    
  },[])



  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App
