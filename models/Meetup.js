const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MeetupSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

MeetupSchema.statics.postUserById = function (meetupId, userId) {
  return this.findByIdAndUpdate(
    meetupId, 
    { $addToSet: { 'users': userId } },
    { new: true }
  );
}

MeetupSchema.statics.deleteUserById = function (meetupId, userId) {
  return this.findByIdAndUpdate(
    meetupId, 
    { $pull: { 'users': userId } },
    { new: true }
  );
}

const Meetup = mongoose.model('Meetup', MeetupSchema, 'meetups')
module.exports = Meetup