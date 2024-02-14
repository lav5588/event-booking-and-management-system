import { useState } from 'react';
import styles from './SignIn.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../Store/Slices/AuthSlice';
import { useDispatch } from 'react-redux';

const SignIn = () => {
  const [error,setError] = useState("");
  const [loading,setLoading] = useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();



  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if(!emailRegex.test(email)){
        setError("Not a valid email");
        return;
      }
      if(!passwordRegex.test(password)){
        setError("Not a valid password");
        return;
      }
      const authData={
        email,
        password
      }
      setLoading("Loading...");

      const logInDetail=await axios.post("http://localhost:8000/api/v1/users/login",authData, {withCredentials: true, });
      if(!logInDetail){
        setError("Login failed");
        return;
      }
      dispatch(logIn(logInDetail.data.data.user));
      console.log("logInDetail:",logInDetail.data.data.user);
      

      setLoading("");
      navigate("/");
    } catch (error) {
        setLoading("");
        setError("Error: "+error);
        console.log("Error: ",error);
    }
  }

  return (
    <div className={`${styles.main}`}>
      <div className='flex justify-center items-center w-[50vw]  '>
        <div className={`${styles.brdr} flex gap-8 flex-col`}>
            <div>
                <span className={`text-4xl font-semibold`}>Welcome back!</span>
                <p>Enter your Credentials to access your account</p>
            </div>
            <form action="" method="post" className='flex flex-col gap-4 '>
                
                <input 
                  type="email"
                  placeholder='Email Address'
                  name='email' 
                  id='email' 
                  style={{paddingLeft:"10px"}} 
                  className={styles.inpt} 
                  onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                  type="password" 
                  placeholder='Password' 
                  name='password' 
                  id='password'
                  style={{paddingLeft:"10px"}} 
                  className={styles.inpt} 
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <div className='flex items-center '>
                    <input type="checkbox" name='terms'/>
                    <span className='font-light text-[0.7rem]'>Remember Me</span>
                    <span className='font-light text-[0.7rem] ml-auto text-blue-800'><a href="#">Forgotten Password</a></span>

               </div>
               {loading &&  <p className='text-red-500'>{loading}</p>}
                {error && <p className='text-red-500'>{error}</p>}
                <button type="submit" className='bg-[#B1761F] rounded-md h-12 text-white' onClick={handleSubmit}>SignIn</button>
                <p>Don't have an account?<Link to="/signup" className='text-blue-800'>Click Here</Link></p>
            </form>
        </div>
      </div>
      <div className={`max-w-[50vw] ${styles.img}`}><img src="./SignUpPageImage.png" alt=""  className='h-[100vh] w-[50vw]'/></div>
    </div>
  )
}

export default SignIn
