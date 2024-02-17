import { useDispatch, useSelector } from 'react-redux';
import styles from './SignUpExtra.module.css';
import { IoIosArrowBack } from "react-icons/io";
import { setSignUp, setSignUpExtra, setSignUpNextExtra } from '../Store/Slices/SignUpPageStateSlice';
import { useEffect, useState } from 'react';
import { setAccessAndRefresh, setSignUpExtraData } from '../Store/Slices/SignUpDataStateSlice';
import axios from 'axios';

const SignUpExtra = () => {
  const [dob,setDob]=useState("");
  const [gendre,setGendre]=useState("");
  const[relationshipStatus,setRelationshipStatus]=useState("");
  const [haveAnyKids,setHaveAnyKids]=useState("");


  const savedDob=useSelector(state=>state.signUpDataStateReducer.dob);
  const savedGendre=useSelector(state=>state.signUpDataStateReducer.gendre);
  const savedRelationshipStatus=useSelector(state=>state.signUpDataStateReducer.relationshipStatus);
  const savedHaveAnykids=useSelector(state=>state.signUpDataStateReducer.haveAnyKids);
  const {email,password}=useSelector(state=>state.signUpDataStateReducer);


  const dispatch=useDispatch()

  const handleNext = async() => {
    dispatch(setSignUpExtraData({dob,gendre,relationshipStatus,haveAnyKids}))
    
     const loginDet=await axios.post("http://localhost:8000/api/v1/users/login", {
      email,
      password,
    },{withCredentials: true });   
    dispatch(setSignUpExtra(false));
    dispatch(setSignUpNextExtra(true));
  }
  const handleSkip=async() => {
    await axios.post("http://localhost:8000/api/v1/users/login", {
      email,
      password,
    },{withCredentials: true});    
    
    dispatch(setSignUpExtra(false));
    dispatch(setSignUpNextExtra(true));
  }





  useEffect(() => {
    
      if(savedDob){
        document.getElementById("dob").value=savedDob;
        setDob(savedDob);
      }
      if(savedGendre){
        document.querySelector(`input[value=${savedGendre}]`).checked=true;
        setGendre(savedGendre);
      }
      if(savedRelationshipStatus){
        document.querySelector(`input[value=${savedRelationshipStatus}]`).checked=true;
        setRelationshipStatus(savedRelationshipStatus);
      }
      if(savedHaveAnykids){
        document.querySelector(`input[value=${savedHaveAnykids}]`).checked=true;
        setHaveAnyKids(savedHaveAnykids);
      }
      
      
  },[]);
  

  return (
    <div className='h-[89vh] w-[98vw] flex justify-center items-center flex-col gap-2 my-10'>
      <div className='flex flex-col gap-2'>
        {/* <button className={`self-start rounded-[50%] ${styles.backArrow} text-xl p-1`}><IoIosArrowBack onClick={handlePrev}/></button> */}
        <div className={`${styles.container} flex gap-5 flex-col`}>
          <div>
            <span className='text-3xl font-normal'>Let us get to know you better</span>
            <p>We will use this information to personalize your experience and cater to your individual needs.</p>
          </div>
          <div className='flex flex-col'>
            <span>What is your date of birth?</span>
            <input type="date" id='dob' className={styles.dob} onChange={(e)=>setDob(e.target.value)} />
          </div>
          <div>
            <span >Please specify your gender</span>
            <div className='flex gap-2 flex-wrap '>
              <div>
                <input type="radio" name='gendre' className='cursor-pointer' value="Male" onChange={(e)=>setGendre(e.target.value)}/>
                <label>Male</label>
              </div>
              <div>
                <input type="radio" name='gendre' className='cursor-pointer' value="Female" onChange={(e)=>setGendre(e.target.value)}/>
                <label>Female</label>
              </div>
              <div>
                <input type="radio" name="gendre" className='cursor-pointer' value="Other" onChange={(e)=>setGendre(e.target.value)}/>
                <label>Other</label>
              </div>
              <div>
                <input type="radio" name="gendre" className='cursor-pointer' value="Prefer not to answer" onChange={(e)=>setGendre(e.target.value)}/>
                <label>Prefer not to answer</label>
              </div>
            </div>
          </div>
          <div>
            <span>Please specify your relationship status</span>
            <div className='flex gap-2 flex-wrap'>
              <div>
                <input type="radio" name="relationshipStatus" className='cursor-pointer' value="Single" onChange={(e)=>setRelationshipStatus(e.target.value)}/>
                <label>Single</label>
              </div>
              <div>
                <input type="radio" name="relationshipStatus" className='cursor-pointer' value="Married" onChange={(e)=>setRelationshipStatus(e.target.value)}/>
                <label>Married</label>
              </div>
              <div>
                <input type="radio" name="relationshipStatus" className='cursor-pointer' value="Prefer not to answer" onChange={(e)=>setRelationshipStatus(e.target.value)}/>
                <label>Prefer not to answer</label>
              </div>
            </div>
          </div>
          <div>
          <span>Do you have any kids?</span>
            <div className='flex gap-2 flex-wrap'>
              <div>
                <input type="radio" name='haveAnykids' className='cursor-pointer' value="Yes" onChange={(e)=>setHaveAnyKids(e.target.value)}/>
                <label>Yes</label>
              </div>
              <div>
                <input type="radio" name='haveAnykids' className='cursor-pointer' value="No" onChange={(e)=>setHaveAnyKids(e.target.value)}/>
                <label>No</label>
              </div>
              <div>
                <input type="radio" name='haveAnykids' className='cursor-pointer' value="Prefer not to answer" onChange={(e)=>setHaveAnyKids(e.target.value)}/>
                <label>Prefer not to answer</label>
              </div>
            </div>
          </div>
        </div>
        <div className='self-end'>
          <button className={``} onClick={handleSkip}>Skip</button>
          <button className={`mx-8 bg-[#2A6562] text-white px-7 py-1 rounded-md`} onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default SignUpExtra
