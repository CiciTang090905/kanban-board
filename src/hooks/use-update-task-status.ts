import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

//create shared mutation hook
//drop task
//    ↓
// call mutation
//    ↓
// update local query result immediately
//    ↓
// React re-renders and shows the task in the destination column
//    ↓
// server confirms the mutation and sends the real query result

function useUpdateTaskStatus() {
  return useMutation(api.tasks.updateStatus).withOptimisticUpdate( //tell Convex to apply a temporary local update whenever this mutation is called.
    (localStore, args) => {
      const tasks = localStore.getQuery(api.tasks.list, {});

      if (!tasks) {
        return;
      }

      localStore.setQuery(
        api.tasks.list,
        {},
        tasks.map((task) =>
          task._id === args.id ? { ...task, status: args.status } : task,
        ), // creates a new array where only the dragged task gets a new status
      );
    },
  );
}

export default useUpdateTaskStatus;
