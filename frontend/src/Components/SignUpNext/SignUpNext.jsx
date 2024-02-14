import SignUp from "../SignUp/SignUp"
import SignUpExtra from "../SignUpExtra/SignUpExtra"
import SignUpNextExtra from "../SignUpNextExtra/SignUpNextExtra"
import SignUpFinal from "../SignUpFinal/SignUpFinal"
import { useDispatch, useSelector } from "react-redux"
import { 
  setSignUp, 
  setSignUpExtra, 
  setSignUpFinal, 
  setSignUpNextExtra 
} from "../Store/Slices/SignUpPageStateSlice"
import { useEffect } from "react"

const SignUpNext = () => {
  const dispatch=useDispatch();
  const signUp=useSelector(state=>state.signUpPageStateReducer.signUp);
  const signUpExtra = useSelector(state=>state.signUpPageStateReducer.signUpExtra);
  const signUpNextExtra = useSelector(state=>state.signUpPageStateReducer.signUpNextExtra);
  const signUpFinal = useSelector(state=>state.signUpPageStateReducer.signUpFinal);



  useEffect(() => {
    dispatch(setSignUp(true))
   
  },[]);
 
  
  return (
    <>
        {signUp && <SignUp/>}
       {signUpExtra && <SignUpExtra/>}
       {signUpNextExtra && <SignUpNextExtra/>}
       {signUpFinal && <SignUpFinal/>}
    </>
  )
}

export default SignUpNext
