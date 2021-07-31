import { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';

type dataType = number | string | Date;

const useLastActivity = (timestamp: dataType): dataType => {
  const [lastActivity, setLastActivity] = useState('');

  useEffect(() => {
    const id = setInterval(() => {
      let dateMoment: Moment = moment(timestamp);
      let lastActivity: string = dateMoment.fromNow();
      setLastActivity(lastActivity);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return lastActivity;
};

export default useLastActivity;
