import { useDispatch, useSelector } from 'react-redux';
import styles from './SignUpFinal.module.css'
import { IoIosArrowBack } from "react-icons/io";
import { setSignUpExtra, setSignUpFinal, setSignUpNextExtra } from '../Store/Slices/SignUpPageStateSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setSignUpFinalData } from '../Store/Slices/SignUpDataStateSlice';
import { redirect, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const SignUpFinal = () => {
  const [loading,setLoading] =useState(false);
  const [selectedHobbiesIndex,setSelectedHobbiesIndex]=useState([]);
  const [Location,setLocation] = useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const savedLocation=useSelector(state=>state.signUpDataStateReducer.location);
  const savedHobbies=useSelector(state=>state.signUpDataStateReducer.hobbies);
  const {fullName,email,password,dob,gendre,relationshipStatus,haveAnyKids,currentHealthRate,haveAnyDisability,location,hobbies,accessToken,refreshToken}=useSelector(state=>state.signUpDataStateReducer);
  const indianHobbies = [
    'Cricket',
    'Bollywood Movies',
    'Cooking and Cuisine',
    'Yoga and Meditation',
    'Reading Literature',
    'Dancing ',
    'Traveling and Exploration',
    'Music',
    'Art and Craft',
    'Gardening',
    'Traditional Festivals',
    'Shopping',
    'Photography',
    'Chess',
    'Cycling',
    'Kite Flying',
    'Singing and Karaoke',
    'Painting',
    'Hiking and Trekking',
  ];
  
  const handlePrev = () => {
    const hobbies=[];
    selectedHobbiesIndex.forEach(i=>hobbies.push(indianHobbies[i]));
    dispatch(setSignUpFinalData({Location,hobbies}));
    dispatch(setSignUpNextExtra(true));
    dispatch(setSignUpFinal(false));
  }

 
  

  

 const addAndRemoveHobby=(index)=>{
   if(selectedHobbiesIndex.includes(index)){
     setSelectedHobbiesIndex(selectedHobbiesIndex.filter(i=>i!==index));
   }else{
     setSelectedHobbiesIndex([...selectedHobbiesIndex,index]);
   }
 }

 

  const cities = [
    // Andaman and Nicobar Islands (union territory)
    'Port Blair',
    // Andhra Pradesh
    'Adoni', 'Amaravati', 'Anantapur', 'Chandragiri', 'Chittoor', 'Dowlaiswaram', 'Eluru', 'Guntur', 'Kadapa', 'Kakinada',
    'Kurnool', 'Machilipatnam', 'Nagarjunakoṇḍa', 'Rajahmundry', 'Srikakulam', 'Tirupati', 'Vijayawada', 'Visakhapatnam',
    'Vizianagaram', 'Yemmiganur',
    // Arunachal Pradesh
    'Itanagar',
    // Assam
    'Dhuburi', 'Dibrugarh', 'Dispur', 'Guwahati', 'Jorhat', 'Nagaon', 'Sivasagar', 'Silchar', 'Tezpur', 'Tinsukia',
    // Bihar
    'Ara', 'Barauni', 'Begusarai', 'Bettiah', 'Bhagalpur', 'Bihar Sharif', 'Bodh Gaya', 'Buxar', 'Chapra', 'Darbhanga',
    'Dehri', 'Dinapur Nizamat', 'Gaya', 'Hajipur', 'Jamalpur', 'Katihar', 'Madhubani', 'Motihari', 'Munger', 'Muzaffarpur',
    'Patna', 'Purnia', 'Pusa', 'Saharsa', 'Samastipur', 'Sasaram', 'Sitamarhi', 'Siwan',
    // Chandigarh (union territory)
    'Chandigarh',
    // Chhattisgarh
    'Ambikapur', 'Bhilai', 'Bilaspur', 'Dhamtari', 'Durg', 'Jagdalpur', 'Raipur', 'Rajnandgaon',
    // Dadra and Nagar Haveli and Daman and Diu (union territory)
    'Daman', 'Diu', 'Silvassa',
    // Delhi (national capital territory)
    'Delhi', 'New Delhi',
    // Goa
    'Madgaon', 'Panaji',
    // Gujarat
    'Ahmadabad', 'Amreli', 'Bharuch', 'Bhavnagar', 'Bhuj', 'Dwarka', 'Gandhinagar', 'Godhra', 'Jamnagar', 'Junagadh',
    'Kandla', 'Khambhat', 'Kheda', 'Mahesana', 'Morbi', 'Nadiad', 'Navsari', 'Okha', 'Palanpur', 'Patan', 'Porbandar',
    'Rajkot', 'Surat', 'Surendranagar', 'Valsad', 'Veraval',
    // Haryana
    'Ambala', 'Bhiwani', 'Chandigarh', 'Faridabad', 'Firozpur Jhirka', 'Gurugram', 'Hansi', 'Hisar', 'Jind', 'Kaithal',
    'Karnal', 'Kurukshetra', 'Panipat', 'Pehowa', 'Rewari', 'Rohtak', 'Sirsa', 'Sonipat',
    // Himachal Pradesh
    'Bilaspur', 'Chamba', 'Dalhousie', 'Dharmshala', 'Hamirpur', 'Kangra', 'Kullu', 'Mandi', 'Nahan', 'Shimla', 'Una',
    // Jammu and Kashmir (union territory)
    'Anantnag', 'Baramula', 'Doda', 'Gulmarg', 'Jammu', 'Kathua', 'Punch', 'Rajouri', 'Srinagar', 'Udhampur',
    // Jharkhand
    'Bokaro', 'Chaibasa', 'Deoghar', 'Dhanbad', 'Dumka', 'Giridih', 'Hazaribag', 'Jamshedpur', 'Jharia', 'Rajmahal', 'Ranchi', 'Saraikela',
    // Karnataka
    'Badami', 'Ballari', 'Bengaluru', 'Belagavi', 'Bhadravati', 'Bidar', 'Chikkamagaluru', 'Chitradurga', 'Davangere', 'Halebid', 'Hassan',
    'Hubballi-Dharwad', 'Kalaburagi', 'Kolar', 'Madikeri', 'Mandya', 'Mangaluru', 'Mysuru', 'Raichur', 'Shivamogga', 'Shravanabelagola', 'Shrirangapattana',
    'Tumakuru', 'Vijayapura',
    // Kerala
    'Alappuzha', 'Vatakara', 'Idukki', 'Kannur', 'Kochi', 'Kollam', 'Kottayam', 'Kozhikode', 'Mattancheri', 'Palakkad', 'Thalassery', 'Thiruvananthapuram',
    'Thrissur',
    // Ladakh (union territory)
    'Kargil', 'Leh',
    // Madhya Pradesh
    'Balaghat', 'Barwani', 'Betul', 'Bharhut', 'Bhind', 'Bhojpur', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar',
    'Dr. Ambedkar Nagar (Mhow)', 'Guna', 'Gwalior', 'Hoshangabad', 'Indore', 'Itarsi', 'Jabalpur', 'Jhabua', 'Khajuraho', 'Khandwa', 'Khargone', 'Maheshwar',
    'Mandla', 'Mandsaur', 'Morena', 'Murwara', 'Narsimhapur', 'Narsinghgarh', 'Narwar', 'Neemuch', 'Nowgong', 'Orchha', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam',
    'Rewa', 'Sagar', 'Sarangpur', 'Satna', 'Sehore', 'Seoni', 'Shahdol', 'Shajapur', 'Sheopur', 'Shivpuri', 'Ujjain', 'Vidisha',
    // Maharashtra
    'Ahmadnagar', 'Akola', 'Amravati', 'Aurangabad', 'Bhandara', 'Bhusawal', 'Bid', 'Buldhana', 'Chandrapur', 'Daulatabad', 'Dhule', 'Jalgaon', 'Kalyan',
    'Karli', 'Kolhapur', 'Mahabaleshwar', 'Malegaon', 'Matheran', 'Mumbai', 'Nagpur', 'Nanded', 'Nashik', 'Osmanabad', 'Pandharpur', 'Parbhani', 'Pune',
    'Ratnagiri', 'Sangli', 'Satara', 'Sevagram', 'Solapur', 'Thane', 'Ulhasnagar', 'Vasai-Virar', 'Wardha', 'Yavatmal',
    // Manipur
    'Imphal',
    // Meghalaya
    'Cherrapunji', 'Shillong',
    // Mizoram
    'Aizawl', 'Lunglei',
    // Nagaland
    'Kohima', 'Mon', 'Phek', 'Wokha', 'Zunheboto',
    // Odisha
    'Balangir', 'Baleshwar', 'Baripada', 'Bhubaneshwar', 'Brahmapur', 'Cuttack', 'Dhenkanal', 'Kendujhar', 'Konark', 'Koraput', 'Paradip', 'Phulabani', 'Puri',
    'Sambalpur', 'Udayagiri',
    // Puducherry (union territory)
    'Karaikal', 'Mahe', 'Puducherry', 'Yanam',
    // Punjab
    'Amritsar', 'Batala', 'Chandigarh', 'Faridkot', 'Firozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Nabha', 'Patiala', 'Rupnagar', 'Sangrur',
    // Rajasthan
    'Abu', 'Ajmer', 'Alwar', 'Amer', 'Barmer', 'Beawar', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittaurgarh', 'Churu', 'Dhaulpur', 'Dungarpur', 'Ganganagar', 'Hanumangarh',
    'Jaipur', 'Jaisalmer', 'Jalor', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Kishangarh', 'Kota', 'Merta', 'Nagaur', 'Nathdwara', 'Pali', 'Phalodi', 'Pushkar', 'Sawai Madhopur', 'Shahpura',
    'Sikar', 'Sirohi', 'Tonk', 'Udaipur',
    // Sikkim
    'Gangtok', 'Gyalshing', 'Lachung', 'Mangan',
    // Tamil Nadu
    'Arcot', 'Chengalpattu', 'Chennai', 'Chidambaram', 'Coimbatore', 'Cuddalore', 'Dharmapuri', 'Dindigul', 'Erode', 'Kanchipuram', 'Kanniyakumari', 'Kodaikanal', 'Kumbakonam', 'Madurai',
    'Mamallapuram', 'Nagappattinam', 'Nagercoil', 'Palayamkottai', 'Pudukkottai', 'Rajapalayam', 'Ramanathapuram', 'Salem', 'Thanjavur', 'Tiruchchirappalli', 'Tirunelveli', 'Tiruppur', 'Thoothukudi',
    'Udhagamandalam', 'Vellore',
    // Telangana
    'Hyderabad', 'Karimnagar', 'Khammam', 'Mahbubnagar', 'Nizamabad', 'Sangareddi', 'Warangal',
    // Tripura
    'Agartala',
    // Uttar Pradesh
    'Agra', 'Aligarh', 'Amroha', 'Ayodhya', 'Azamgarh', 'Bahraich', 'Ballia', 'Banda', 'Bara Banki', 'Bareilly', 'Basti', 'Bijnor', 'Bithur', 'Budaun', 'Bulandshahr', 'Deoria', 'Etah', 'Etawah',
    'Faizabad', 'Farrukhabad-cum-Fatehgarh', 'Fatehpur', 'Fatehpur Sikri', 'Ghaziabad', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hamirpur', 'Hardoi', 'Hathras', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kannauj', 'Kanpur',
    'Lakhimpur', 'Lalitpur', 'Lucknow', 'Mainpuri', 'Mathura', 'Meerut', 'Mirzapur-Vindhyachal', 'Moradabad', 'Muzaffarnagar', 'Partapgarh', 'Pilibhit', 'Prayagraj', 'Rae Bareli', 'Rampur', 'Saharanpur', 'Sambhal',
    'Shahjahanpur', 'Sitapur', 'Sultanpur', 'Tehri', 'Varanasi',
    // Uttarakhand
    'Almora', 'Dehra Dun', 'Haridwar', 'Mussoorie', 'Nainital', 'Pithoragarh',
    // West Bengal
    'Alipore', 'Alipur Duar', 'Asansol', 'Baharampur', 'Bally', 'Balurghat', 'Bankura', 'Baranagar', 'Barasat', 'Barrackpore', 'Basirhat', 'Bhatpara', 'Bishnupur', 'Budge Budge', 'Burdwan', 'Chandernagore',
    'Darjeeling', 'Diamond Harbour', 'Dum Dum', 'Durgapur', 'Halisahar', 'Haora', 'Hugli', 'Ingraj Bazar', 'Jalpaiguri', 'Kalimpong', 'Kamarhati', 'Kanchrapara', 'Kharagpur', 'Cooch Behar', 'Kolkata', 'Krishnanagar',
    'Malda', 'Midnapore', 'Murshidabad', 'Nabadwip', 'Palashi', 'Panihati', 'Purulia', 'Raiganj', 'Santipur', 'Shantiniketan', 'Shrirampur', 'Siliguri', 'Siuri', 'Tamluk', 'Titagarh'
  ];
  
  cities.sort();
  
  useEffect(()=>{
    if(savedLocation){
      document.getElementById("location").selectedIndex=cities.indexOf(savedLocation);
      setLocation(savedLocation);
    }
    const hob=[];
    if(savedHobbies){
      savedHobbies.forEach((hobby)=>{
        hob.push(indianHobbies.indexOf(hobby));
      })
      setSelectedHobbiesIndex(hob);
    }
  },[]);

  const handleFinish=async()=>{
    let tostId;
    try {
      const hob=[];
      selectedHobbiesIndex.forEach(i=>hob.push(indianHobbies[i]));
      dispatch(setSignUpFinalData({Location,hobbies:hob}));
      tostId = toast.loading("Saving Your Details...");
      setLoading(true);

        const extraSave=await axios.post(`${import.meta.env.VITE_BASE_URI}/users/know-user-better-signup`,{
          dob,
          gender:gendre,
          relationshipStatus,
          haveKids:haveAnyKids,
          ratingOfCurrentHealth:currentHealthRate,
          haveAnyDisability,
          location,
          hobbies,
          },
          {
           withCredentials:true,
          });
        // console.log("extrasave",extraSave);
        toast.dismiss(tostId);
        toast.success("Your details saved successfully!");
        setLoading(false);
        navigate("/signin");
      
    } catch (error) {
      toast.dismiss(tostId);
      toast.error("failed to saving your details")
      setLoading(false);
      // console.log("Error: ",error);
    }
  }

    return (
        <div className='h-[89vh] w-[99vw] flex justify-center items-center flex-col gap-2 my-10'>
          <div className='flex flex-col gap-2'>
            <button className={`self-start rounded-[50%] ${styles.backArrow} text-xl p-1`}><IoIosArrowBack onClick={handlePrev} /></button>
            <div className={`${styles.container} flex gap-5 flex-col`}>
              <div>
                <span className='text-3xl font-normal'>Good job! You’re just one step away</span>
                <p>We want to serve you based on where you are located and what you like...</p>
              </div>
              
              <div className='flex gap-2 flex-col'>
                <span>Select your location</span>
                <select name="location" id="location" onChange={(e)=>setLocation(e.target.value)}>
                    {/* <option value="">Please select one</option> */}
                    {cities.map((city,index)=>(<option key={index} value={city}>{city}</option>))}
                </select>
              </div>
              <div >
                <span >Tell us about your hobbies</span>
                <div className='flex flex-wrap gap-1 max-w-[50vw] justify-center'>
                  {
                    indianHobbies
                    .map((hobby,index)=>(
                      <h1 
                      key={index} 
                      className= {` 
                      ${selectedHobbiesIndex.includes(index)?"bg-black text-white":""} 
                      p-2 
                      rounded-3xl 
                      border 
                      border-[#747474] 
                      cursor-pointer  
                      hover:bg-[#747474] 
                      hover:text-white
                      `} 
                      value={hobby} 
                      name="hobby" 
                      onClick={()=>addAndRemoveHobby(index)}
                      >{hobby}</h1>))
                  }
                </div>
              </div>
            </div>
            {loading && <span className='text-red-700 text-[3xl]'>Loading.....</span>}
            <div className='self-end'>
              
              <button className={`mx-8 bg-[#2A6562] text-white px-7 py-1 rounded-md`} onClick={handleFinish}>Finish Up</button>

            </div>
           
          </div>
          <Toaster/>
        </div>
      )
}

export default SignUpFinal
