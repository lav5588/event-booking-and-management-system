import { useState } from 'react';
import styles from './SignIn.module.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { logIn } from '../Store/Slices/AuthSlice';
import { useDispatch } from 'react-redux';
import toast, {Toaster } from 'react-hot-toast'
const SignIn = () => {
  const [loading,setLoading] = useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();



  
  const handleSubmit=async(e)=>{
    e.preventDefault();
    let toastId;
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if(!emailRegex.test(email)){
        toast.error("Invalid email");
        setEmail("");
        return;
      }
      if(!passwordRegex.test(password)){
        setPassword("");
        toast.error("Invalid password");
        return;
      }
      const authData={
        email,
        password
      }
      setLoading(true);
      toastId = toast.loading("Logging in...");

      const logInDetail=await axios.post(`${import.meta.env.VITE_BASE_URI}/users/login`,authData, {withCredentials: true, });
      toast.dismiss(toastId);
      if(!logInDetail){
        toast.error("Wrong email or password");
        return;
      }
      dispatch(logIn(logInDetail.data.data.user));
      console.log("logInDetail:",logInDetail.data.data.user);
      setLoading(false);
      navigate("/");
      location.reload();
    } catch (error) {
      toast.dismiss(toastId);
        setLoading(false);
        toast.error("wrong email or password");
        setEmail("");
        setPassword("");
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
                  value={email}
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
                  value={password}
                  style={{paddingLeft:"10px"}} 
                  className={styles.inpt} 
                  onChange={(e)=>setPassword(e.target.value)}
                />
                <div className='flex items-center '>
                    <input type="checkbox" name='terms'/>
                    <span className='font-light text-[0.7rem]'>Remember Me</span>
                    <span className='font-light text-[0.7rem] ml-auto text-blue-800'><a href="#">Forgotten Password</a></span>

               </div>
                <button type="submit" className={`${loading ? "cursor-wait": ""}bg-[#B1761F] rounded-md h-12 text-white`} onClick={handleSubmit}>SignIn</button>
                <p>Don't have an account?<Link to="/signup" className='text-blue-800'>Click Here</Link></p>
            </form>
        </div>
      </div>
      <div className={`max-w-[50vw] ${styles.img}`}><img src="./SignUpPageImage.png" alt=""  className='h-[100vh] w-[50vw]'/></div>
      <Toaster />
    </div>
  )
}

export default SignIn
