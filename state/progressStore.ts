// import { create } from "zustand";

// interface ProgressState {
//   progress: Record<
//     string,
//     { checkedItems: Record<string, boolean>; totalItems: number }
//   >;
//   updateProgress: (
//     itemId: string,
//     checkedItems: Record<string, boolean>,
//     totalItems: number,
//   ) => void;
//   resetProgress: () => void;
// }

// const useProgressStore = create<ProgressState>((set) => ({
//   progress: {},
//   updateProgress: (itemId, checkedItems, totalItems) =>
//     set((state) => ({
//       progress: {
//         ...state.progress,
//         [itemId]: { checkedItems, totalItems },
//       },
//     })),
//   resetProgress: () =>
//     set((state) => ({
//       progress: Object.fromEntries(
//         Object.entries(state.progress).map(
//           ([itemId, { checkedItems, totalItems }]) => [
//             itemId,
//             {
//               checkedItems: Object.fromEntries(
//                 Object.keys(checkedItems).map((taskId) => [taskId, false]),
//               ),
//               totalItems,
//             },
//           ],
//         ),
//       ),
//     })),
// }));

// export default useProgressStore;

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

interface ProgressItem {
  checkedItems: Record<string, boolean>;
  totalItems: number;
  timestamp: number;
}

interface ProgressState {
  progress: Record<string, ProgressItem>;
  updateProgress: (
    itemId: string,
    checkedItems: Record<string, boolean>,
    totalItems: number,
  ) => void;
  resetProgress: () => void;
  cleanupExpiredProgress: () => void;
}

const STORAGE_KEY = "progress_store";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      updateProgress: (itemId, checkedItems, totalItems) =>
        set((state) => ({
          progress: {
            ...state.progress,
            [itemId]: { checkedItems, totalItems, timestamp: Date.now() },
          },
        })),
      resetProgress: () =>
        set((state) => ({
          progress: Object.fromEntries(
            Object.entries(state.progress).map(([itemId, { totalItems }]) => [
              itemId,
              {
                checkedItems: Object.fromEntries(
                  Object.keys(state.progress[itemId].checkedItems).map(
                    (taskId) => [taskId, false],
                  ),
                ),
                totalItems,
                timestamp: Date.now(),
              },
            ]),
          ),
        })),
      cleanupExpiredProgress: () => {
        const currentTime = Date.now();
        set((state) => ({
          progress: Object.fromEntries(
            Object.entries(state.progress).filter(
              ([_, { timestamp }]) => currentTime - timestamp < EXPIRATION_TIME,
            ),
          ),
        }));
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useProgressStore;
