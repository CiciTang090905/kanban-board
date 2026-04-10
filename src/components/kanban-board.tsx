import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import Column from "@/components/column";
import AddTaskDialog from "@/components/add-task-dialog";

type TaskStatus = "todo" | "in-progress" | "done";

const COLUMNS: { title: string; status: TaskStatus }[] = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
];

function KanbanBoard() {
  const tasks = useQuery(api.tasks.list);

  if (tasks === undefined) {
    return <p className="text-muted-foreground">Loading tasks...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <AddTaskDialog />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {COLUMNS.map((column) => (
          <Column
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={tasks.filter((task) => task.status === column.status)}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
