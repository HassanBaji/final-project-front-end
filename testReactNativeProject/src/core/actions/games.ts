import axios from 'axios';
import {CreateGameReq} from '../../Interfaces/interfaces';

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

export const getPlayerGames = async (props: CreateGameReq) => {
  try {
    await axios.post(
      'https://qsiaoi81z9.execute-api.us-east-1.amazonaws.com/dev/v1/games',
      {
        ...props,
      },
    );
  } catch (e) {
    console.log(e);
    throw e;
  }
};
