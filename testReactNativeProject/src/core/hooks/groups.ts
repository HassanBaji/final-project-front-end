import {useMutation, useQuery} from '@tanstack/react-query';

import {Group, SendInviteReq} from '../../Interfaces/interfaces';
import {getMyGroups, sendInvite} from '../actions/groups';

export const useGroups = (id: string) => {
  const {data, isLoading, refetch} = useQuery({
    queryKey: ['groups', id],
    queryFn: getMyGroups,
  });

  return {
    groups: data?.data as Group[],
    isLoading,
    refetch,
  };
};

// export const useSendInvite = (props: SendInviteReq) => {
//   const {data, isLoading, refetch} = useMutation({
//     queryFn: sendInvite,
//   });

//   return {
//     groups: data?.data as Group[],
//     isLoading,
//     refetch,
//   };
// };
