import React, { useState } from 'react'
import styles from "./Header.module.css"
import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { useSelector } from 'react-redux';

const Header = () => {
  const [humburger,setHumbuerger]=useState(false);
  const {status}=useSelector(state=>state.authReducer)
  

  return (
    <div className={`${styles.container} ${humburger?styles.hshow:styles.hhide}`}>
        <h1 className={styles.heading} >EVENTCRAFTER</h1>
      <div className={styles.main}>
        <input type="text" placeholder='Search all' className={styles.search}/>
        <p>location</p>
        {
          humburger?<ImCross className={styles.bar} onClick={()=>setHumbuerger(false)}/>:<FaBars className={styles.bar} onClick={()=>setHumbuerger(true)}/>
        }
      </div>
      <div  className={`${humburger?styles.show:styles.hide} ${styles.links}`} >
        <Link to="" className={styles.link} >Events</Link>
        {
          status &&
        <Link to="/my-bookings" className={styles.link}>My Bookings</Link>
        }
        <Link to="/our-mission" className={styles.link}>Our Mission</Link>
        <Link to="/contact-us" className={styles.link}>Contact Us</Link>
        {status &&
            <Link to="user-profile" className={styles.link}>My Profile</Link>
        }
        {status?
        <Link to="/create-event " className={`${styles.link} ${styles.createEvent}`}>Create an event</Link>
        :
        <Link to="/signin" className={`${styles.link} ${styles.createEvent}`}>SignIn</Link>}
      </div>
    </div>
  )
}

export default Header
