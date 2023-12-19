import axios from 'axios';
import {createPlayerReq} from '../../../Interfaces';

export const createPlayer = () => {
  const req = async (props: createPlayerReq) => {
    try {
      const posting = await axios.post(
        'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/players',
        {
          ...props,
        },
      );
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return {req};
};
