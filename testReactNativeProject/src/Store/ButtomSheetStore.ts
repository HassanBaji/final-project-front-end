// import {create} from 'zustand';
// import {Player} from '../Interfaces/interfaces';
// import {persist} from 'zustand/middleware';
// import {mmkvStorage} from './utils/Storage';
// import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

// interface ButtomSheetStore {
//   signOutModalRef: React.Ref<BottomSheetModalMethods>;
//   setSignOutModalRef: (
//     signOutModalRef: React.Ref<BottomSheetModalMethods>,
//   ) => void;
// }

// // Create your store, which includes both state and (optionally) actions
// export const useButtomSheetStore = create<ButtomSheetStore>()(
//   persist(
//     set => ({
//       signOutModalRef: null,
//       setSignOutModalRef: signOutModalRef => set({signOutModalRef}),
//     }),
//     {
//       name: 'Ref-store',
//       getStorage: () => mmkvStorage,
//     },
//   ),
// );
