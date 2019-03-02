import mongoose from 'mongoose';
import moment from 'moment';
import { profileTools, repoTools } from 'node-github-scraper-sdk';
import transformRepo from './lib/transformers/ProfileTransformer';
import transformProfile from './lib/transformers/ProfileTransformer';
import genService from './lib/serviceCreator';
import Profile from './lib/models/Profile';

mongoose.connect(process.env.MONGO_URI);

// load environment variables
const dotenv = require('dotenv');
dotenv.load();

const { scrapeUser } = profileTools;

// ------------------------------------

export default function app() {
  const updateUserService = genService('updateUserService', 2000, async () => {
    const oldProfile = await Profile.findOne({
      lastScrapedAt: {
        $lt: moment().subtract(3, 'hours'),
        $gte: 0
      }
    });

    if (!oldProfile) {
      return;
    }

    const { login: username } = oldProfile;
    console.log(`Updating username=${username}..`);
    const user = await scrapeUser({ username });
    await transformProfile(user);
  });

  updateUserService();
}

if (require.main === module) {
  app();
}
