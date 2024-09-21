// import { create } from "zustand";

// interface ProgressState {
//   progress: Record<string, Record<string, boolean>>;
//   updateProgress: (
//     itemId: string,
//     checkedItems: Record<string, boolean>,
//   ) => void;
// }

// const useProgressStore = create<ProgressState>((set) => ({
//   progress: {},
//   updateProgress: (itemId, checkedItems) =>
//     set((state) => ({
//       progress: {
//         ...state.progress,
//         [itemId]: checkedItems,
//       },
//     })),
//   resetProgress: () =>
//     set((state) => ({
//       progress: Object.fromEntries(
//         Object.entries(state.progress).map(([itemId, tasks]) => [
//           itemId,
//           Object.fromEntries(
//             Object.entries(tasks).map(([taskId]) => [taskId, false]),
//           ),
//         ]),
//       ),
//     })),
// }));

// export default useProgressStore;

// state/progressStore.ts
import { create } from "zustand";

interface ProgressState {
  progress: Record<string, Record<string, boolean>>;
  updateProgress: (
    itemId: string,
    checkedItems: Record<string, boolean>,
  ) => void;
  resetProgress: () => void; // Add this to the interface
}

const useProgressStore = create<ProgressState>((set) => ({
  progress: {},
  updateProgress: (itemId, checkedItems) =>
    set((state) => ({
      progress: {
        ...state.progress,
        [itemId]: checkedItems,
      },
    })),
  resetProgress: () =>
    set((state) => ({
      progress: Object.fromEntries(
        Object.entries(state.progress).map(([itemId, tasks]) => [
          itemId,
          Object.fromEntries(
            Object.entries(tasks).map(([taskId]) => [taskId, false]),
          ),
        ]),
      ),
    })),
}));

export default useProgressStore;
