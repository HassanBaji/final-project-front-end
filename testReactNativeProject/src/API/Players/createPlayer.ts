import axios from 'axios';
import {CreatePlayerReq} from '../../Interfaces';

export const createPlayer = () => {
  const req = async (props: CreatePlayerReq) => {
    try {
      await axios.post(
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
