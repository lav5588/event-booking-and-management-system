import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
    trim:true
  },

  fullName:{
    type:String,
    required:true,
    trim:true,
  },

  password: {
    type: String,
    required: [true,"password id required"],
    trim:true
  },

  dob:{
    type:String,
  },

  contactNumber: {
    type: String,
    trim:true
  },

  location: {
    type: String,
  },


  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    trim:true
  },


  relationshipStatus: {
    type: String,
  },


  haveKids: {
    type: String,
    
  },


  ratingOfCurrentHealth: {
    type: String,
  },


  haveAnyDisability: {
    type: String,
  },


  hobbies:[{
    type:String
  }],



  interest: [{
    type:String
  }],


  aboutMe: {
    type: String
  },


  images:[
    {
        type:String
    }
  ],

  notificationSetting: {
    chat: {
      type: Boolean,
      default: true,
    },
    event: {
      type: Boolean,
      default: true,
    },
    eventRadius: {
      type: Number,
      default: 10000,
    },
  },


  refreshToken: {
    type: String
 }


}, {
  timestamps: true,
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})
userSchema.methods.isPasswordCorrect=async function
(password){
  
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
  
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User= mongoose.model('User', userSchema);


