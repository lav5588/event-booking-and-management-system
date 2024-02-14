import { useEffect, useState } from 'react';
import styles from './SignUp.module.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSignUp, setSignUpExtra} from '../Store/Slices/SignUpPageStateSlice';
import { setSignUpData } from '../Store/Slices/SignUpDataStateSlice';



const SignUp = () => {
  const [enteredOtp,setEnteredOtp] =useState("");
  const [generatedOtp,setGeneratedOtp] =useState("");
  const [error,setError] = useState("");
  const [name,setName] =useState("")
  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const dispatch=useDispatch();
  const savedName=useSelector(state=>state.signUpDataStateReducer.fullName);
  const savedEmail=useSelector(state=>state.signUpDataStateReducer.email);
  const savedPassword=useSelector(state=>state.signUpDataStateReducer.password);


 

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if ([ enteredOtp,password].some((value) => value.trim() === '')) {
      setError("Please fill all the fields");
      return;
    }
    
    if(!passwordRegex.test(password)){
      setError("!Not a valid password");
      return;
    }
    if(!document.getElementById("check").checked){
      setError("!Please check the terms and conditions");
      return;
    }
    
    if(generatedOtp!=enteredOtp){
      setError("!Please Enter correct Otp");
      return;
    }

    dispatch(setSignUpData({name,email,password}));
    setError("Loading........")
    const registerDetail=await axios.post(`${import.meta.env.VITE_BASE_URI}/users/register`, {
        fullName:name,
        email,
        password,
      })
      console.log("registerDetail:",registerDetail);

    dispatch(setSignUp(false));
    dispatch(setSignUpExtra(true));
    setError("");
  }

  const generateOtp=async()=>{
    try {
      
      if([name,email].some((field)=>field.trim()==='')){
        setError("Please fill all the fields");
        return;
      }
      if(!emailRegex.test(email)){
        setError("!Not a valid email");
        return;
      }
      setError("Sending Otp to " + email+"......")
      const otp=await axios.post(`${import.meta.env.VITE_BASE_URI}/users/register/verify-email`, {
          name,
          email,
        })
        console.log("otp:",otp);
        if(!otp){
          setError("!Something went wrong");
          return;
        }
        setError("");
        const Otp=otp.data.message.Otp;
        console.log("otp:",Otp);
        setError("");
        setGeneratedOtp(Otp);
    } catch (error) {
        setError("Error: "+error);
    }
  }



  return (
    <div className={`${styles.main}`}>
      <div className='flex justify-center items-center w-[50vw]  '>
        <div className={styles.brdr}>
            <span className={`text-4xl font-semibold`}>Get Started Now</span>
            <form action="" method="post" className='flex flex-col gap-4 '>
              {!generatedOtp && <>
                <input
                  type="text" 
                  placeholder='Name' 
                  name='name' 
                  id='name' 
                  style={{paddingLeft:"10px"}} 
                  className={styles.inpt}
                  onChange={(e)=>{setName(e.target.value);setError("");}}
                />
                <input
                  type="email" 
                  placeholder='Email Address' 
                  name='email' 
                  id='email' 
                  style={{paddingLeft:"10px"}} 
                  className={styles.inpt}
                  onChange={(e) => {setEmail(e.target.value);setError("");}}
                />
                 <button type="button" className="bg-[#B1761F] rounded-md h-12 text-white" onClick={generateOtp}>GeneRate Otp to verify email</button>

              </>}
                                {
                  generatedOtp &&
                  
                    <input
                      type="text" 
                      placeholder='Enter 6 digit Otp' 
                      name='otp' 
                      id='otp' 
                      style={{paddingLeft:"10px"}} 
                      className={styles.inpt}
                      onChange={(e)=>{setEnteredOtp(e.target.value);setError("");}}
                    />
                  
                }
                {
                generatedOtp &&
                  <input 
                    type="password" 
                    placeholder='Password' 
                    name='password' 
                    id='password'
                    style={{paddingLeft:"10px"}} 
                    className={styles.inpt}
                    onChange={(e) => {setPassword(e.target.value);setError("");}}
                />}
               {generatedOtp && <div className='flex items-center'>
                    <input type="checkbox" id='check' name='terms' onChange={()=>setError("")}/>
                    <span className='font-light text-[0.7rem]'>I agree to the terms & conditions</span>
               </div>}
               
                <span className='text-red-700 font-normal'>{error}</span>
                {generatedOtp && <button type="submit" className='bg-[#B1761F] rounded-md h-12 text-white' onClick={handleSubmit} >SignUp</button>}            </form>
        </div>
      </div>
      <div className={`max-w-[50vw] ${styles.img}`}><img src="./SignUpPageImage.png" alt=""  className='h-[100vh] w-[50vw]'/></div>
    </div>
  )
}

export default SignUp
