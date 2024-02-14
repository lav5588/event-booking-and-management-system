import { useDispatch, useSelector } from 'react-redux';
import styles from './SignUpNextExtra.module.css';
import { IoIosArrowBack } from "react-icons/io";
import { setSignUpExtra, setSignUpFinal, setSignUpNextExtra } from '../Store/Slices/SignUpPageStateSlice';
import { useEffect, useState } from 'react';
import {  setSignUpNextExtraData } from '../Store/Slices/SignUpDataStateSlice';

const SignUpNextExtra = () => {
  const [currentHealthRate,setCurrentHealthRate]=useState("")
  const [haveAnyDisability,setHaveAnyDisabilty]=useState("")
  const dispatch=useDispatch();
  const savedCurrentHealthRate=useSelector(state=>state.signUpDataStateReducer.currentHealthRate);
  const savedHaveAnyDisability=useSelector(state=>state.signUpDataStateReducer.haveAnyDisability);
  const handleNext = () => {
    dispatch(setSignUpNextExtraData({currentHealthRate,haveAnyDisability}));

      dispatch(setSignUpNextExtra(false));
      dispatch(setSignUpFinal(true));

  }
  const handlePrev = () => {
    dispatch(setSignUpNextExtraData({currentHealthRate,haveAnyDisability}));
    dispatch(setSignUpExtra(true));
    dispatch(setSignUpNextExtra(false));
  };
  const handleSkip= () => {
    dispatch(setSignUpNextExtra(false));
    dispatch(setSignUpFinal(true));
  }


  useEffect(() => {
    
      if(savedCurrentHealthRate){
        document.querySelector(`input[value=${savedCurrentHealthRate}]`).checked = true;
        setCurrentHealthRate(savedCurrentHealthRate);
      }
      if(savedHaveAnyDisability){
        document.querySelector(`input[value=${savedHaveAnyDisability}]`).checked=true;
        setHaveAnyDisabilty(savedHaveAnyDisability);
      }
  },[]);
  

  
    return (
        <div className='h-[89vh] w-[99vw] flex justify-center items-center flex-col gap-2 my-10'>
          <div className='flex flex-col gap-2'>
            <button className={`self-start rounded-[50%] ${styles.backArrow} text-xl p-1`}><IoIosArrowBack onClick={handlePrev}/></button>
            <div className={`${styles.container} flex gap-5 flex-col`}>
              <div>
                <span className='text-3xl font-normal'>We look out for you in any way possible</span>
                <p>Let us make this journey as convenient for you as we can....</p>
              </div>
              <div>
                <span>How do you rate yourself in terms of your current health?</span>
                <div className='flex gap-2 flex-wrap '>
                  <div>
                    <input type="radio" name='currentHealthRate' className='cursor-pointer' value="Excellent"  onChange={(e)=>setCurrentHealthRate(e.target.value)}/>
                    <label>Excellent</label>
                  </div>
                  <div>
                    <input type="radio" name='currentHealthRate' className='cursor-pointer' value="Good"  onChange={(e)=>setCurrentHealthRate(e.target.value)}/>
                    <label>Good</label>
                  </div>
                  <div>
                    <input type="radio" name='currentHealthRate' className='cursor-pointer' value="Fair"  onChange={(e)=>setCurrentHealthRate(e.target.value)}/>
                    <label>Fair</label>
                  </div>
                  <div>
                    <input type="radio" name='currentHealthRate' className='cursor-pointer' value="Poor"  onChange={(e)=>setCurrentHealthRate(e.target.value)}/>
                    <label>Poor</label>
                  </div>
                  <div>
                    <input type="radio" name='currentHealthRate' className='cursor-pointer' value="Prefer not to answer"  onChange={(e)=>setCurrentHealthRate(e.target.value)}/>
                    <label>Prefer not to answer</label>
                  </div>
                </div>
              </div>
              
              <div>
                <span>Do you have any disability?</span>
                <div className='flex gap-2 flex-wrap'>
                  <div>
                    <input type="radio" name="haveAnyDisabity" className='cursor-pointer' value="Yes" onChange={(e)=>setHaveAnyDisabilty(e.target.value)}/>
                    <label>Yes</label>
                  </div>
                  <div>
                    <input type="radio" name="haveAnyDisabity" className='cursor-pointer' value="No" onChange={(e)=>setHaveAnyDisabilty(e.target.value)}/>
                    <label>No</label>
                  </div>
                  <div>
                    <input type="radio" name="haveAnyDisabity" className='cursor-pointer' value="Prefer not to answer" onChange={(e)=>setHaveAnyDisabilty(e.target.value)}/>
                    <label>Prefer not to answer</label>
                  </div>
                </div>
              </div>
              <div className='flex gap-2 flex-col'>
                <span>Please select one from the options</span>
                <select name="" id="" className='cursor-pointer'>
                    <option value="">Please select one</option>
                    <option value="">Option 1</option>
                    <option value="">Option 2</option>
                    <option value="">Option 3</option>
                    <option value="">Option 4</option>
                    <option value="">Option 5</option>
                    <option value="">Option 6</option>
                    <option value="">Option 7</option>
                    <option value="">Option 8</option>
                    <option value="">Option 9</option>
                    <option value="">Option 10</option>
                </select>
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

export default SignUpNextExtra
