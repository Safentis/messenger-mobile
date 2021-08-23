import React, { useState, useEffect } from 'react';
import moment from 'moment';

type dataType = number | string | Date;

const useLastActivity = (timestamp: dataType): dataType => {
  const [lastActivity, setLastActivity] = useState('');

  const callLastActivity = () => {
    let lastActivity: string = moment(timestamp).fromNow();
    setLastActivity(lastActivity);
  };

  useEffect(() => {
    callLastActivity();
    const id = setInterval(() => {
      callLastActivity();
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return lastActivity;
};

export default useLastActivity;
