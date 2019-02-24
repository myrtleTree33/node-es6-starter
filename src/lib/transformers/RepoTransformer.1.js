import Repo from '../models/Repo';

export default async function transformRepo(input) {
  const {
    id,
    name,
    full_name,
    description,
    htmlUrl,
    owner,
    isFork,
    numStargazers,
    numWatchers,
    numForks,
    language,
    createdAt,
    updatedAt,
    pushedAt
  } = input;

  const ownerId = owner.id;
  const ownerLogin = owner.login;

  const repo = new Repo({
    repoId: id,
    name,
    fullName: full_name,
    description,
    htmlUrl,
    owner: {
      ownerId,
      login: ownerLogin
    },
    isFork,
    numStargazers,
    numWatchers,
    numForks,
    language,
    createdAt,
    updatedAt,
    pushedAt
  });

  return repo.save();
}
