import axios from 'axios';
import {createPlayerReq} from '../../Interfaces';
import {post} from 'aws-amplify/api';

export const createPlayer = () => {
  const req = async (props: createPlayerReq) => {
    console.log('here');
    console.log('props ' + JSON.stringify(props));
    try {
      const posting = await axios.post(
        'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/players',
        {
          ...props,
        },
      );

      console.log('posted ' + JSON.stringify(posting));
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  return {req};
};
