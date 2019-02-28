import mongoose from 'mongoose';

let mongooseHidden = require('mongoose-hidden')();

const { Schema } = mongoose;

const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  htmlUrl: {
    type: String,
    required: true
  },
  profilePic: {
    type: String
  },
  company: {
    type: String
  },
  blog: {
    type: String
  },
  location: {
    type: String
  },
  isHireable: {
    type: Boolean,
    required: true,
    default: true
  },
  bio: {
    type: String
  },
  numPublicRepos: {
    type: Number,
    required: true
  },
  numStarredRepos: {
    type: Number,
    required: true
  },
  numPublicGists: {
    type: Number,
    required: true
  },
  numFollowers: {
    type: Number,
    required: true
  },
  numFollowing: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  followerIds: {
    type: [String],
    default: []
  },
  starredRepoIds: {
    type: [String],
    default: []
  },
  ownedRepoIds: {
    type: [String],
    default: []
  }
});

// This will add `id` in toJSON
profileSchema.set('toJSON', {
  virtuals: true
});

// This will remove `_id` and `__v`
profileSchema.plugin(mongooseHidden);

export default mongoose.model('Profile', profileSchema);
