import asyncWhile from 'async-while';
import sleep from 'await-sleep';
import moment from 'moment';

export default function genService(serviceName, timeInterval, fn, fnArgs) {
  const asyncWhileLoop = asyncWhile(
    () => {
      return true;
    },
    () => {
      return (async () => {
        try {
          console.log(`Running ${serviceName} at ${moment().format()}..`);
          await fn();
        } catch (e) {
          console.error(`Exception occured runing service=${serviceName}`);
          console.error(e);
        }
        return sleep(timeInterval);
      })();
    }
  );

  return asyncWhileLoop;
}
