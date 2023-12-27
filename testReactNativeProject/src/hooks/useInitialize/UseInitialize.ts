import {useEffect} from 'react';
import {usePlayerStore} from '../../Store/PlayerStore';
import {usePlayer} from '../../core/hooks/Player';

export const UseInitialize = () => {
  const {player} = usePlayer();
  const {setPlayer} = usePlayerStore();

  console.log('plauer ' + player);

  useEffect(() => {
    setPlayer(player);
  }, [player, setPlayer]);
};
