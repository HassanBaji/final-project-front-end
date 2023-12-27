import axios from 'axios';
import {CreateGroupReq, SendInviteReq} from '../../Interfaces/interfaces';

export const createGroup = async (props: CreateGroupReq) => {
  try {
    await axios.post(
      'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/group',
      {
        ...props,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const getMyGroups = async ({queryKey}) => {
  const [_, id] = queryKey;
  try {
    return await axios.get(
      `https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/group/${id}/playerGroups`,
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const sendInvite = async (props: SendInviteReq) => {
  try {
    return await axios.post(
      `https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/group/inviteplayers`,
      {
        ...props,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
