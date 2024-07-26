import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {SignIn,  SignUpNext,CreateEvent,UserProfile, Events, Event} from './Components'
import './index.css'
import { store } from './Components/Store/Store.js'
import { Provider } from 'react-redux'
import {
   Route,
   RouterProvider,
   createBrowserRouter,
   createRoutesFromElements
   } 
from 'react-router-dom'
import { ThemeProvider } from '@material-tailwind/react'
import OurMission from './Components/Our Mission/OurMission.jsx'
import ContactUs from './Components/ContactUs/ContactUs.jsx'
import Mybookings from './Components/MyBookings/Mybookings.jsx'




const router=createBrowserRouter(


  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App/>}>
        <Route path="" element={<Events/>}/>
        <Route path="event/:eventid" element={<Event/>}/>
        <Route path="create-event" element={<CreateEvent/>}/>
        <Route path="user-profile" element={<UserProfile/>}/>
        <Route path="my-bookings" element={<Mybookings/>}/>
        <Route path="our-mission" element={<OurMission/>}/>
        <Route path="contact-us" element={<ContactUs/>}/>
      </Route>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/signup" element={<SignUpNext/>}/>
    </Route>
   
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
       <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)
