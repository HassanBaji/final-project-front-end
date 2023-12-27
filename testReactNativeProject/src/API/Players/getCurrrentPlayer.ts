import axios from 'axios';
import {fetchUserAttributes} from 'aws-amplify/auth';

export const getCurrrentPlayer = async () => {
  try {
    return await axios.post(
      'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/players/email',
      {
        email: (await fetchUserAttributes()).email,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
