import Profile from '../models/Profile';

export default async function transformProfile(input) {
  const {} = input;

  const profile = new Profile({});

  // for all starred repos, save and update starred repos
  // for all repos, save and update repos.
  // for all followers, create followers list.  Branch if necessary.
  // for all commits, create commit entry.
  // save profile.

  return profile.save();
}
