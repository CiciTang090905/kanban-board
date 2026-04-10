import { useStore } from "@tanstack/react-store";
import { taskStore, type TaskStatus } from "@/store/task-store";
import Column from "@/components/column";
import AddTaskDialog from "@/components/add-task-dialog";

const COLUMNS: { title: string; status: TaskStatus }[] = [
  { title: "To Do", status: "todo" },
  { title: "In Progress", status: "in-progress" },
  { title: "Done", status: "done" },
];

function KanbanBoard() {
  const tasks = useStore(taskStore, (state) => state);

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
