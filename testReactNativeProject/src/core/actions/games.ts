import axios from 'axios';
import {
  CreateGameReq,
  CreateTeamsReq,
  JoinGameReq,
} from '../../Interfaces/interfaces';

export const createGame = async (props: CreateGameReq) => {
  try {
    await axios.post(
      'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/game',
      {
        ...props,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// export const getPlayerGames = async (props: CreateGameReq) => {
//   try {
//     await axios.post(
//       'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/games',
//       {
//         ...props,
//       },
//     );
//   } catch (e) {
//     console.log(e);
//     throw e;
//   }
// };

export const joinGame = async (props: JoinGameReq) => {
  try {
    await axios.post(
      'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/game/join',
      {
        ...props,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const leaveGame = async (props: JoinGameReq) => {
  try {
    await axios.post(
      'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/game/leave',
      {
        ...props,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};

export const createTeam = async (props: CreateTeamsReq) => {
  try {
    await axios.post(
      'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/game/team/create',
      {
        ...props,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
