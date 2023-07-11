// ./server/models/Journey.js
const { Schema, model } = require('mongoose');

// create a new mongoose schema
// Journey model 
const journeySchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  destinationCity: {
    type: String,
    required: true,
  },
  destinationState: {
    type: String,
    required: true,
  },
  destinationCountry: {
    type: String,
    required: true,
  },
  departingDate: {
    type: Date,
    required: true,
  },
  returningDate: {
    type: Date,
    required: true,
  },
  transportationOutbound: {
    type: String,
    required: true,
  },
  transportationReturn: {
    type: String,
    required: true,
  },
  transportationDetails: {
    type: String,
    required: true,
  },
  accommodations: {
    type: String,
    required: true,
  },
  // creator: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  invitedTravelers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
});

const Journey = model('Journey', journeySchema);

module.exports = Journey;
