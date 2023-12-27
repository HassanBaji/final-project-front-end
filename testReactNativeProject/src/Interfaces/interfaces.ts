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

export interface CreateGameReq {
  groupId: string;
  timeStart: string;
  timeFinish: string;
  date: string;
  location: string;
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
  id: String;
  date: string;
  location: String;
  gameFinish: Boolean;
  timeFinish: string;
  timeStart: string;
  goalsScored: number;
  PlayerInGroup: {player: Player}[];
  groupId: String;
  PlayerInGames: {player: Player}[];
  Group: {name: string};
}
