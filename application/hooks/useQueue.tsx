import React, { useEffect } from 'react';
import { Chatroom } from '../App.interface';

type callbackfunc = (positionInQueue: number) => number | void;
type typefunc = [string, Chatroom];

interface Props {
  chatrooms: any;
  person: any;
}

const useQueue = ({ chatrooms, person }: Props, callback: callbackfunc) => {
  // Filter of data, this func returns all "noactives users"
  const filterFunc = ([key, value]: typefunc): boolean => {
    return value.status === 'noactive';
  };

  //* Sort to the 'created' field
  const sortFunc = (b: typefunc, a: typefunc): number => {
    let [keyB, valueB] = b;
    let [keyA, valueA] = a;

    let numA: number = +new Date(valueA.created);
    let numB: number = +new Date(valueB.created);

    return numB - numA;
  };

  // We are finding position in queue
  const findFunc = ([key, value]: typefunc, positionInQueue: number): void => {
    if (key === person.key) {
      callback(positionInQueue);
    }
  };

  useEffect(() => {
    if (chatrooms) {
      let entries: [string, Chatroom][] = Object.entries(chatrooms);

      entries.filter(filterFunc).sort(sortFunc).find(findFunc);
    }
  }, [chatrooms]);

  return null;
};

export default useQueue;
