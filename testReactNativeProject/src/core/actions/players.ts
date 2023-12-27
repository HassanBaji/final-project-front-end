import axios from 'axios';
import {AcceptInviteReq} from '../../Interfaces/interfaces';

export const searchPlayer = async ({queryKey}) => {
  const [_, _s, id] = queryKey;

  try {
    if (id !== '' || id !== ' ') {
      return await axios.get(
        `https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/players/${id}/search`,
      );
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getInvitesForPlayer = async ({queryKey}) => {
  const [_, _s, id] = queryKey;

  try {
    return await axios.get(
      `https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/players/${id}/invites`,
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const acceptInviteForGroup = async (props: AcceptInviteReq) => {
  try {
    return await axios.post(
      `https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/players/invites/accept`,
      {
        ...props,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
