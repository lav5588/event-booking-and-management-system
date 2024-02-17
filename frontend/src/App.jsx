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

const App=()=> {
  const dispatch = useDispatch()
  const userData=useSelector(state=>state.authReducer.userData);
  const eventData = useSelector(state=>state.eventDataReducer.eventData);

  useEffect(() => {
    
    if(!eventData){
      (async()=>{
        const event=await axios.get(`${import.meta.env.VITE_BASE_URI}/events/get-events`,{withCredentials:true});
        dispatch(setEventData(event.data.data))
        console.log("Event: ",event?.data);
      })();
    }
    else{
      console.log(!eventData);
      console.log("eventData",eventData)
    }
    if(!userData){
      (async()=>{
        const User=await axios.get(`${import.meta.env.VITE_BASE_URI}/users/current-user`,{withCredentials: true})
        console.log("App: ",User.data.data);
        dispatch(logIn(User.data.data))
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

    </>
  )
}

export default App
