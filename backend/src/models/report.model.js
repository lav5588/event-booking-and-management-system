import mongoose,{Schema} from "mongoose";

const reportSchema = new mongoose.Schema({
  problemType: {
    type: String,
    required: true,
  },

  problemDescription: {
    type: String,
    required: true,
  },

  problemAttachments: {
    type: [{
        type:String
    }], 
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  isResolved: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
});

const Report = mongoose.model('Report', reportSchema);

export default Report;
