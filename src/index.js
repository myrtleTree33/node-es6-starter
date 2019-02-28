import mongoose from 'mongoose';
import { profileTools, repoTools } from 'node-github-scraper-sdk';
import transformRepo from './lib/transformers/ProfileTransformer';
import transformProfile from './lib/transformers/ProfileTransformer';

mongoose.connect(process.env.MONGO_URI);

const { scrapeUser } = profileTools;

// load environment variables
const dotenv = require('dotenv');
dotenv.load();

// ------------------------------------

export default function app() {
  (async () => {
    const username = 'randName';
    // const username = 'myrtletree33';
    const user = await scrapeUser({ username });
    transformProfile(user);
    // console.log(user);

    // const repoInput = JSON.parse(
    //   '{\r\n        "id": 120329744,\r\n        "name": "OpenRefine",\r\n        "full_name": "joanneong/OpenRefine",\r\n        "description": "OpenRefine is a free, open source power tool for working with messy data and improving it",\r\n        "htmlUrl": "https://github.com/joanneong/OpenRefine",\r\n        "owner": {\r\n          "id": 24493463,\r\n          "login": "joanneong"\r\n        },\r\n        "isFork": true,\r\n        "numStargazers": 1,\r\n        "numWatchers": 1,\r\n        "numForks": 0,\r\n        "language": "Java",\r\n        "createdAt": "2018-02-05T16:20:11Z",\r\n        "updatedAt": "2019-02-19T15:22:36Z",\r\n        "pushedAt": "2018-03-24T17:42:40Z"\r\n      }\r\n'
    // );

    // const repo = await transformRepo(repoInput);
    // console.log(repo);
  })();
}

if (require.main === module) {
  app();
}
