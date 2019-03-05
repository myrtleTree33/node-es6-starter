import Profile from '../models/Profile';
import transformRepo from './RepoTransformer';
import transformCommit from './CommitTransformer';

async function saveRepos(repos) {
  repos.map(r =>
    transformRepo(r).catch(e => console.error(`Could not save ${r.id}, ${e}`))
  );
}

async function saveCommits(id, commits) {
  commits.map(c => transformCommit(id, c).catch(e => console.error(e)));
}

function getFollowerIds(followers) {
  return followers.map(f => f.id);
}

export default async function transformProfile(input) {
  const { starredRepos, ownedRepos, followers, commitHistory } = input;
  const {
    id,
    name,
    login,
    htmlUrl,
    profilePic,
    company,
    blog,
    location,
    isHireable,
    bio,
    publicRepos,
    publicGists,
    numFollowers,
    numFollowing,
    createdAt,
    updatedAt
  } = input;

  // console.log(input);

  // console.log(starredRepos.repos.length);
  // console.log(ownedRepos.repos.length);
  // console.log(followers.length);
  // console.log(commitHistory.length);

  await saveRepos(ownedRepos.repos);
  await saveRepos(starredRepos.repos);
  const followerIds = followers.map(f => f.id.toString());
  const starredRepoIds = starredRepos.repos.map(s => s.id.toString());
  const ownedRepoIds = ownedRepos.repos.map(s => s.id.toString());
  await saveCommits(id, commitHistory);

  const updatedProfile = {
    userId: id,
    name,
    login,
    htmlUrl,
    profilePic,
    company,
    blog,
    location,
    isHireable,
    bio,
    numPublicRepos: publicRepos,
    numPublicGists: publicGists,
    numFollowers,
    numFollowing,
    starredRepoIds,
    ownedRepoIds,
    followerIds,
    createdAt,
    updatedAt,
    lastScrapedAt: Date.now()
  };

  return Profile.findOneAndUpdate({ login }, updatedProfile, {
    upsert: true,
    new: true
  });
}
