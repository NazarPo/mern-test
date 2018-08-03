const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MeetupSchema = new Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: true },
  blogLink: { type: String, default: 'https://blog.interlink-ua.com/article/meetup/' },
  createdAt: { type: Date, default: Date.now },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})

MeetupSchema.statics.registerUserById = function (meetupId, userId) {
  return this.findByIdAndUpdate(
    meetupId, 
    { $addToSet: { 'users': userId } },
    { new: true }
  );
}

MeetupSchema.statics.unregisterUserById = function (meetupId, userId) {
  return this.findByIdAndUpdate(
    meetupId, 
    { $pull: { 'users': userId } },
    { new: true }
  );
}

const Meetup = mongoose.model('Meetup', MeetupSchema, 'meetups')
module.exports = Meetup