// ./server/models/Journey.js

const mongoose = require('mongoose');
// create a new mongoose schema
// Journey model 
const journeySchema = new mongoose.Schema({
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
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  invitedTravelers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const Journey = mongoose.model('Journey', journeySchema);

module.exports = Journey;
