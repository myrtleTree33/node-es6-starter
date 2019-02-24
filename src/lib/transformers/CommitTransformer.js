import Commit from '../models/Commit';

export default async function transformCommit(userId, input) {
  const { date, count } = input;

  const commit = new Commit({ userId, date, count });

  return commit.save();
}
