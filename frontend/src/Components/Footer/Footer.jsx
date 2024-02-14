import styles from './Footer.module.css'

import {
FaSquareFacebook,
FaSquareInstagram,
FaSquareXTwitter
} from "react-icons/fa6";
const Footer = () => {
  return (
    <div className={styles.maincontainer}>
     <div className='flex justify-center gap-3 text-xl'>
      <a href="https://www.facebook.com/thinkingboy.lavkumaryadav" target='_blank'><FaSquareFacebook /></a>
      <a href="https://www.instagram.com/the_lav_kumar/" target='_blank'><FaSquareInstagram /></a>
      <a href="https://twitter.com/LavKuma65537724" target='_blank'><FaSquareXTwitter /></a>
     
     
     
     </div>
     <div className={styles.container}>
      <div><ul>
          <span >About Us</span>
          <li><a href="#">Company</a></li>
          <li><a href="#">Leadership</a></li>
          <li><a href="#">Our Features</a></li>
          <li><a href="#">Pricing</a></li>
      </ul></div>
      <div><ul>
          <span>Help & Support</span>
          <li><a href="#">Costermer Support</a></li>
          <li><a href="#">Organiser Support</a></li>
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Report a scam</a></li>

      </ul></div>
      <div><ul>
          <span>Connect With Us</span>
          <li><a href="#">Press</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Join Our Team</a></li>

      </ul></div>
      <div className='max-w-[15rem] flex flex-col gap-5'>
        <span >SignUp For newsletter</span>
        <p className='text-[0.7rem]'>Sign up now and be the first to know about exclusive offers, latest fashion news & style tips!</p>
        <form action="POST" className=''>
          <label htmlFor="email">Email:</label>
          <input type="email" name='email' className='max-w-[12rem] rounded-md px-4 text-black' placeholder='Email'/>
          <button type='submit' className={`${styles.subscribe} bg-[#B1761F] my-3`}>Subscribe</button>
        </form>
      </div>
     </div>
     <div className='flex justify-center gap-3 text-[0.7rem]'>
      <p>© EVENTCRAFTER , All Rights Reserved</p>
     </div>
    </div>
  )
}

export default Footer
