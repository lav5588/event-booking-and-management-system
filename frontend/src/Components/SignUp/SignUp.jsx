import { useEffect, useState } from 'react';
import styles from './SignUp.module.css'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setSignUp, setSignUpExtra } from '../Store/Slices/SignUpPageStateSlice';
import { setSignUpData } from '../Store/Slices/SignUpDataStateSlice';
import toast, { Toaster } from 'react-hot-toast'



const SignUp = () => {
  const [enteredOtp, setEnteredOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const savedName = useSelector(state => state.signUpDataStateReducer.fullName);
  const savedEmail = useSelector(state => state.signUpDataStateReducer.email);
  const savedPassword = useSelector(state => state.signUpDataStateReducer.password);




  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    let toastId;
    try {
      e.preventDefault();
      if ([enteredOtp, password].some((value) => value.trim() === '')) {
        toast.error("Please fill all the fields")
        return;
      }
  
      if (!passwordRegex.test(password)) {
        setPassword("")
        toast.error("!Not a valid password")
        return;
      }
      if (!document.getElementById("check").checked) {
        toast.error("!Please check the terms and conditions");
        return;
      }
  
      if (generatedOtp != enteredOtp) {
        toast.error("!Please enter correct otp")
        return;
      }
  
      dispatch(setSignUpData({ name, email, password }));
      toastId = toast.loading("Registering the User...");
      const registerDetail = await axios.post(`${import.meta.env.VITE_BASE_URI}/users/register`, {
        fullName: name,
        email,
        password,
      })
      toast.dismiss(toastId);
      toast.success("User registered successfully");
      // console.log("registerDetail:", registerDetail);
  
      dispatch(setSignUp(false));
      dispatch(setSignUpExtra(true));
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to register user");
    }
  }

  const generateOtp = async () => {
    let toastId;
    try {

      if ([name, email].some((field) => field.trim() === '')) {
        toast.error("Please fill all the fields")
        return;
      }
      if (!emailRegex.test(email)) {
        setEmail("");
        toast.error("!Not a valid email");
        return;
      }
      toastId = toast.loading("Sending Otp to " + email + "......")
      const otp = await axios.post(`${import.meta.env.VITE_BASE_URI}/users/register/verify-email`, {
        name,
        email,
      })
      toast.dismiss(toastId);
      toast.success(`Otp sent successfully to "${email}`);
      // console.log("otp:", otp);
      if (!otp) {
        toast.error("!Something went wrong while sending the otp");
        return;
      }
      const Otp = otp.data.message.Otp;
      // console.log("otp:", Otp);
      setGeneratedOtp(Otp);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Error: " + error.message);
      console.log("Error: " + error);
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
                value={name}
                style={{ paddingLeft: "10px" }}
                className={styles.inpt}
                onChange={(e) => { setName(e.target.value); }}
              />
              <input
                type="email"
                placeholder='Email Address'
                name='email'
                id='email'
                value={email}
                style={{ paddingLeft: "10px" }}
                className={styles.inpt}
                onChange={(e) => { setEmail(e.target.value); }}
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
                style={{ paddingLeft: "10px" }}
                className={styles.inpt}
                value={enteredOtp}
                onChange={(e) => { setEnteredOtp(e.target.value); }}
              />

            }
            {
              generatedOtp &&
              <input
                type="password"
                placeholder='Password'
                name='password'
                id='password'
                style={{ paddingLeft: "10px" }}
                className={styles.inpt}
                value={password}
                onChange={(e) => { setPassword(e.target.value); }}
              />}
            {generatedOtp && <div className='flex items-center'>
              <input type="checkbox" id='check' name='terms' />
              <span className='font-light text-[0.7rem]'>I agree to the terms & conditions</span>
            </div>}

            {generatedOtp && <button type="submit" className='bg-[#B1761F] rounded-md h-12 text-white' onClick={handleSubmit} >SignUp</button>}            </form>
        </div>
      </div>
      <div className={`max-w-[50vw] ${styles.img}`}><img src="./SignUpPageImage.png" alt="" className='h-[100vh] w-[50vw]' /></div>
      <Toaster />
    </div>
  )
}

export default SignUp
