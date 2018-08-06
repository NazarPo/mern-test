const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    handle: { type: String, required: true, max: 40 },
    birth: { type: Date, required: true },
    phone: { type: String, required: true },
    university: { type: String, required: true },
    faculty: { type: String, required: true },
    course: { type: Number, required: true },
    socialNetwork: { type: String, required: true },
    hasLaptop: { type: Boolean, required: true }
})

const Profile = mongoose.model('Profile', ProfileSchema, 'profiles');
module.exports = Profile;