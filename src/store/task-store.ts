import { createStore } from "@tanstack/store";

export type TaskStatus = "todo" | "in-progress" | "done";

export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number;
};

const STORAGE_KEY = "kanban-tasks";

const SAMPLE_TASKS: Task[] = [
  {
    id: crypto.randomUUID(),
    title: "Set up project structure",
    description:
      "Initialize the repository and configure the development environment.",
    status: "done",
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: crypto.randomUUID(),
    title: "Design kanban board layout",
    description: "Create the three-column layout with task cards.",
    status: "done",
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: crypto.randomUUID(),
    title: "Implement task management",
    description: "Add the ability to create, move, and delete tasks.",
    status: "in-progress",
    createdAt: Date.now() - 86400000,
  },
  {
    id: crypto.randomUUID(),
    title: "Add drag and drop",
    description:
      "Integrate a drag-and-drop library for moving tasks between columns.",
    status: "todo",
    createdAt: Date.now(),
  },
  {
    id: crypto.randomUUID(),
    title: "Connect to backend",
    description:
      "Replace localStorage with a real database for persistent storage.",
    status: "todo",
    createdAt: Date.now(),
  },
];

function loadTasks(): Task[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored) as Task[];
  }
  return SAMPLE_TASKS;
}

export const taskStore = createStore<Task[]>(loadTasks());

taskStore.subscribe(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(taskStore.state));
});

export function addTask(title: string, description: string) {
  taskStore.setState((prev) => [
    ...prev,
    {
      id: crypto.randomUUID(),
      title,
      description,
      status: "todo" as TaskStatus,
      createdAt: Date.now(),
    },
  ]);
}

export function updateTask(id: string, updates: Partial<Omit<Task, "id">>) {
  taskStore.setState((prev) =>
    prev.map((task) => (task.id === id ? { ...task, ...updates } : task)),
  );
}

export function moveTask(id: string, newStatus: TaskStatus) {
  updateTask(id, { status: newStatus });
}

export function deleteTask(id: string) {
  taskStore.setState((prev) => prev.filter((task) => task.id !== id));
}
