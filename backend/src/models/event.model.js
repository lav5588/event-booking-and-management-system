import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },

  isOpenForAll: {
    type: String,
    default: false,
    required: true,
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },


  location: {
    type: String,
    required: true,
  },

  address: {
    type: String,
  },

  eventDate: {
    type: String,
    required: true,
  },


  startTime: {
    type: String,
    required: true,
  },

  endTime: {
    type: String,
    required: true,
  },

  category: {
    type: String,
  },


  price: {
    type: Number,
  },

  eventFormat: {
    type: String,
  },

  eventDescription: {
    type: String,
  },

  files:[ {
    type: String,
  }],

  invitees: {
    viaMail: [{
      type: String,
    }],
    viaNumber: [{
      type: String,
    }],
  },

  checklist: [{
    type: String,
  }],


  paymentByCreator: {
    amount: {
      type: Number,
    },
    paymentMethod: {
      type: String,
    },
    transactionId: {
      type: String,
    },
  },

  isPublished:{
    type:Boolean,
    default:false
  }

}, {
  timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
