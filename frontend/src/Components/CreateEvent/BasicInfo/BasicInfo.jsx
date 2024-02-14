import { useEffect, useState } from "react";
import styles from "./BasicInfo.module.css";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector} from "react-redux";
import { setBasicInfo,setInviteeInfo } from "../../Store/Slices/CreateEventPageStateSlice";
import { setEventName,
  setIsOpen,
  setIsFree,
  setPrice,
  setDate,
  setLocation,
  setStartTime,
  setEndTime,
  setCategory,
  setFormat,
  setDescription,
  setHashTags,
  removeHashTags,
  setFiles,
  removeFiles
 } from "../../Store/Slices/CreateEventDataStateSlice";



const BasicInfo = () => {
 
 
  const {
    eventName,
    isOpen,
    isFree,
    price,
    date,
    location,
    startTime,
    endTime,
    category,
    format,
    description,
    hashTags,
    files
  }=useSelector(state=>state.createEventDataStateReducer) || "";

  
  const dispatch=useDispatch();



  const EventCategory = {
    "Music": ["DJ/Dance", "Rock", "Hip Hop/Rap", "Latin", "Classical", "Jazz", "Blues & Jazz", "R&B", "Pop", "Religious/Spiritual"],
    "Sports & Games": ["Football", "Basketball", "Baseball", "Soccer", "Tennis", "Golf", "Cricket", "Volleyball", "Rugby", "Hockey", "Athletics", "Cycling", "Swimming", "Martial Arts", "Boxing", "Wrestling", "Chess", "Table Tennis", "Badminton", "Esports", "Extreme Sports", "Darts", "Bowling", "Billiards/Pool", "Archery", "Skiing/Snowboarding", "Surfing", "Hiking", "Fishing", "Motor Sports", "Gaming Tournaments", "Board Games", "Card Games", "Trivia Nights", "Escape Room Challenges", "Laser Tag", "Paintball", "Outdoor Adventures", "Fitness Competitions", "E-Sports"],
    "Food & Drinks": ["Food Festivals", "Wine Tasting", "Beer Festivals", "Cocktail Mixology Classes", "Cooking Workshops", "Coffee Tastings", "Chocolate Festivals", "Farmers Markets", "Street Food Festivals", "Vegetarian/Vegan Events", "Dining Experiences", "Bar Crawls", "Brewery Tours"],
    "Travel and Tourism": ["Travel Expos", "Cultural Tours", "Adventure Travel", "Cruise Events", "Backpacking Meetups", "Eco-Tourism", "Sustainable Travel", "Photography Tours", "Historical Tours", "Local Exploration", "Solo Traveler Gatherings", "Travel Workshops"],
    "Health and Hygiene": ["Wellness Retreats", "Mental Health Workshops", "Yoga Retreats", "Fitness Bootcamps", "Nutrition Seminars", "Health Tech Conferences", "Medical Camps", "Hygiene Education Programs", "Mindfulness Classes", "Self-Care Workshops"],
    "Performing and Visual Arts": ["Theater Productions", "Dance Performances", "Art Exhibitions", "Film Screenings", "Photography Shows", "Comedy Nights", "Street Performances", "Magic Shows", "Improvisation Events", "Circus Acts"],
    "Education": ["Workshops and Seminars", "Conferences", "TEDx Talks", "Language Learning Classes", "Skill Development Courses", "Book Clubs", "Educational Webinars", "Coding Bootcamps", "Science Fairs", "Literacy Programs", "Educational Expos"],
    "Politics": ["Political Debates", "Campaign Rallies", "Policy Discussions", "Activism Workshops", "Town Hall Meetings", "Public Forums", "Election Watch Parties", "Political Education Seminars", "Civic Engagement Events"],
    "Community": ["Community Cleanup Events", "Volunteer Opportunities", "Fundraising Galas", "Local Markets", "Neighborhood Block Parties", "Networking Mixers", "Meetup Groups", "Cultural Exchange Events", "Community Forums", "Community Gardens"],
    "Technology": ["Tech Conferences", "Hackathons", "Startup Showcases", "Virtual Reality Events", "AI and Machine Learning Workshops", "Blockchain Summits"],
    "Fashion and Beauty": ["Fashion Shows", "Beauty Expos", "Makeup Workshops", "Modeling Competitions", "Fashion Pop-Up Shops"],
    "Entertainment": ["Movie Premieres", "Celebrity Meet and Greets", "Award Ceremonies", "Comic-Con Events", "Trivia Nights", "Concert Series"],
    "Science and Innovation": ["Science Exhibitions", "Innovation Conferences", "Space Exploration Talks", "Robotics Competitions", "STEM Education Programs"],
    "Environment and Sustainability": ["Climate Change Forums", "Earth Day Celebrations", "Sustainable Living Workshops", "Environmental Conservation Events", "Green Technology Expos"],
    "Business and Networking": ["Networking Mixers", "Business Conferences", "Entrepreneurship Workshops", "Career Fairs", "Professional Development Seminars"],
  };
  
  const addHashTag=(e)=>{
      dispatch(setHashTags(e.target.value))
      e.target.value="";
  }
  const dropHandler=(e)=>{
    e.preventDefault();
    console.log("File Dropped");
    const droppedFiles=[];
    if(e.dataTransfer.items){
      [...e.dataTransfer.items].forEach((item,index)=>{
        if(item.kind === "file"){
          const file=item.getAsFile();
          if(file.type.startsWith("image/") || file.type.startsWith("video/")) {
              droppedFiles.push(file);
          }
          console.log(`file[${index}].name=${file.name}`);
          console.log(file.type);
        }
      })
    }
    else {
      [...e.dataTransfer.files].forEach((file,index)=>{
        console.log(`file[${index}].name=${file.name}`);
      })
    }
    dispatch(setFiles(droppedFiles));
  };

  const handleFileInput=(e)=>{
    e.preventDefault();
    console.log(e.target.files);
    
      dispatch(setFiles(e.target.files));
   
    e.target.value=null;
  }

  const handleNext=(e)=>{
      e.preventDefault();
      dispatch(setBasicInfo(false));
      dispatch(setInviteeInfo(true));
  }

  useEffect(()=>{
      if(isFree==="Free"){
          dispatch(setPrice(""));
      }
      document.getElementById("eventName").value=eventName;
      document.getElementById("isFree").value=isFree;
      document.getElementById("eventDate").value=date;
      document.getElementById("startTime").value=startTime;
      document.getElementById("isOpen").value=isOpen;
      document.getElementById("price").value=price;
      document.getElementById("location").value=location;
      document.getElementById("endTime").value=endTime;
      document.getElementById("category").value=category;
      document.getElementById("format").value=format;
      document.getElementById("description").value=description;
  },[eventName])
  

  return (
    <div className={`mx-auto sm:w-[68.75vw] bg-[#21787333] rounded-lg mt-5 p-5  flex flex-col gap-5 ${styles.container}`}>
        <div className="sm:flex gap-5 ">
          <div className="sm:w-[33.75vw] flex flex-col gap-5">
            <div><input type="text" placeholder="Event Name" id="eventName" onChange={(e)=>dispatch(setEventName(e.target.value))} /></div>
            <div>
              <select id="isFree" onChange={(e)=>{dispatch(setIsFree(e.target.value));if(e.target.value=="Free"){dispatch(setPrice(""));document.getElementById("price").value=""}}}>
                <option value="Priced">Priced</option>
                <option value="Free">Free</option>
              </select>
            </div>
            <div><input type="date" id="eventDate" className={styles.datePicker} placeholder="Event Date" onChange={(e)=>dispatch(setDate(e.target.value))}/></div>
            <div><input type="time" id="startTime" className={`${styles.startTimePicker} mb-5`} placeholder="Start Time" onChange={(e)=>dispatch(setStartTime(e.target.value))}/></div>
          </div>
          <div className="sm:w-[33.75vw] flex flex-col gap-5">
            <div>
              <select name="" id="isOpen" onChange={(e)=>dispatch(setIsOpen(e.target.value))}>
                <option value="Open">Open</option>
                <option value="Invite Only">Invite Only</option>
              </select>
            </div>
            <div><input type="number" id="price" disabled={isFree==="Free"} placeholder="Price(₹)" onChange={(e)=>dispatch(setPrice(e.target.value))}/></div>
            <div><input type="text" id="location"  placeholder="Location" onChange={(e)=>dispatch(setLocation(e.target.value))}/></div>
            <div><input type="time" id="endTime" className={styles.endTimePicker} placeholder="End Time" onChange={(e)=>dispatch(setEndTime(e.target.value))}/></div>
          </div>
        </div>
        <div>
          <select name="" id="category" onChange={(e)=>dispatch(setCategory(e.target.value))}>
            <option value="">---Select Event Category---</option>
            {Object.keys(EventCategory).map((key)=><option key={key} value={key}>{key}</option>)}
          </select>
        </div>
        <div>
          <select name="" id="format" onChange={(e)=>dispatch(setFormat(e.target.value))}>
            <option value="">--Select Event Format--</option>
            {category && EventCategory[category].map((format, i) =><option key={i} value={format} >{format}</option>)}
          </select>
        </div>
        <div><textarea name="" id="description"  className="w-[100%] p-2 h-32 rounded-lg" placeholder="Event Description  ................." onChange={(e)=>dispatch(setDescription(e.target.value))}></textarea></div>
        <div><input type="text" placeholder="Type Event HashTag and Press Enter to Add" onKeyDown={ (e)=>{if(e.key=="Enter" && e.target.value.trim()!==""){dispatch(setHashTags(e.target.value));e.target.value=""}}} enterKeyHint="done"/></div>
       
        <div className={`flex gap-2 bg-white  rounded-lg flex-wrap  ${hashTags?.length>0?"p-2":"p-0"}`}>
            {hashTags && [...hashTags].reverse().map((hashTag,index)=>
            <div key={index} className="rounded-3xl border border-black px-2 flex items-center gap-2">
              <li  className="text-xl">{hashTag}</li>
              <RxCross1 className="text-xl cursor-pointer" onClick={(e)=>dispatch(removeHashTags(hashTag))}/>
            </div>)}
        </div>
        <div className="min-h-[25vh] bg-white cursor-pointer border rounded-lg border-dashed border-black p-5" onDrop={dropHandler} onDragOver={(e)=>e.preventDefault()}><p>Drag one or more files to this <i>drop zone</i>.</p>
              <input type="file" multiple accept="image/*, video/*" onChange={handleFileInput}/>
              <ul>
                {
                  files?.map((file,index)=>{
                    return(
                      <li key={index} className="text-xl flex gap-2 items-center">
                        <RxCross1 className="border border-black rounded-md text-2xl bg-[#9d9d9d] text-white" onClick={()=>dispatch(removeFiles(file))}/>
                        {file.name}
                      </li>
                    )
                  })
                }
              </ul>
        </div>
        <div className="self-end px-10 py-2 bg-[#B1761F] text-white rounded-lg text-2xl" onClick={handleNext} ><button>Next</button></div>
    </div>
  )
}

export default BasicInfo
