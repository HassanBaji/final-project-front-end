import {useQuery} from '@tanstack/react-query';
import {getCurrrentPlayer} from '../../API';
import {Invite, Player} from '../../Interfaces/interfaces';
import {getInvitesForPlayer, searchPlayer} from '../actions/players';

export const usePlayer = () => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['player'],
    queryFn: getCurrrentPlayer,
  });

  return {
    player: data?.data as Player,
    isLoading,
    refetch,
  };
};

export const useSearchPlayers = (id: string) => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['player', 'search', id],
    queryFn: searchPlayer,
  });

  return {
    players: data?.data as Player[],
    isLoading,
    refetch,
  };
};

export const useInvitesForPlayer = (id: string) => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['player', 'invites', id],
    queryFn: getInvitesForPlayer,
  });

  console.log('data ' + JSON.stringify(data?.data));

  return {
    invites: data?.data as Invite[],
    isLoading,
    refetch,
  };
};
