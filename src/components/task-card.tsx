import { MoreHorizontal, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Doc } from "../../convex/_generated/dataModel";

type TaskCardProps = {
  task: Doc<"tasks">;
};

function TaskCard({ task }: TaskCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium leading-snug">
          {task.title}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {task.status !== "todo" && (
              <DropdownMenuItem>Move to To Do</DropdownMenuItem>
            )}
            {task.status !== "in-progress" && (
              <DropdownMenuItem>Move to In Progress</DropdownMenuItem>
            )}
            {task.status !== "done" && (
              <DropdownMenuItem>Move to Done</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      {task.description && (
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {task.description}
          </p>
        </CardContent>
      )}
    </Card>
  );
}

export default TaskCard;
