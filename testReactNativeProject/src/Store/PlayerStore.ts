import {create} from 'zustand';
import {Player} from '../Interfaces/interfaces';
import {persist} from 'zustand/middleware';
import {mmkvStorage} from './utils/Storage';

interface PlayerStore {
  player: Player;
  setPlayer: (Player: Player) => void;
  getPlayer: () => Player;
}

// Create your store, which includes both state and (optionally) actions
export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => ({
      player: {fName: '', lName: '', email: '', phone: '', id: ''},
      setPlayer: player => set({player}),
      getPlayer: () => get().player,
    }),
    {
      name: 'player-store',
      getStorage: () => mmkvStorage,
    },
  ),
);
