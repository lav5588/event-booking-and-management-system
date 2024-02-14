import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required:true
  },

  message: {
    type: String,
    required: true,
  },

  attachments: [{
    type: String,
  }],

}, {
  timestamps: true,
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

export default ContactUs;
