import {Omit} from 'react-native';

export interface CreatePlayerReq {
  fName: string;
  lName: string;
  email: string;
  phone: string;
}

export interface CreateGroupReq {
  name: string;
  ownerId: string;
  image: string;
  mime: string;
}

export interface JoinGameReq {
  playerId: string;
  gameId: string;
}

export interface CreateGameReq {
  groupId: string;
  timeStart: string;
  timeFinish: string;
  date: string;
  location: string;
  limit: number;
}

export interface CreateTeamsReq {
  teams: {
    team1: {
      playedId_gameId: {
        playedId: string;
        gameId: string;
      };
    }[];
    team2: {
      playedId_gameId: {
        playedId: string;
        gameId: string;
      };
    }[];
  };
  gameId: string;
}

export interface SendInviteReq {
  playerId: string;
  groupId: string;
}

export interface AcceptInviteReq {
  playerId: string;
  groupId: string;
  inviteId: string;
}

export interface Player {
  fName: string;
  lName: string;
  email: string;
  phone: string;
  id: string;
}

export interface Group {
  id: string;
  name: string;
  playerId: string;
  PlayerInGroup: {player: Player}[];
  games: Game[];
}

export interface Invite {
  id: string;
  status: string;
  groupId: string;
  playerId: string;
  Group: Pick<Group, 'name'>;
}

export interface Game {
  id: string;
  date: string;
  location: string;
  gameFinish: Boolean;
  timeFinish: string;
  timeStart: string;
  goalsScored: number;
  PlayerInGroup: {player: Player}[];
  groupId: string;
  PlayerInGames: {player: Player; goalsScored: string}[];
  Group: {name: string; playerId: string};
  limit: string;
  Team: Team[];
}

export interface Team {
  player: {
    player: Player;
    goalsScored: string;
  }[];
  winner: boolean;
  name: string;
}
