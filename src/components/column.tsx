import { Badge } from "@/components/ui/badge";
import TaskCard from "@/components/task-card";
import type { Task, TaskStatus } from "@/store/task-store";

type ColumnProps = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
};

function Column({ title, status, tasks }: ColumnProps) {
  const borderColor = {
    todo: "border-l-blue-500",
    "in-progress": "border-l-amber-500",
    done: "border-l-green-500",
  }[status];

  return (
    <div className={`rounded-lg border-l-4 bg-muted/50 p-4 ${borderColor}`}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h2>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No tasks
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}

export default Column;
