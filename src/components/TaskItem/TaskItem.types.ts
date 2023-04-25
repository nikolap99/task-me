enum TaskStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  IN_REVIEW = "IN_REVIEW",
  DONE = "DONE",
}

enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

type Task = {
  id?: string;
  title: string;
  description?: string;
  priority?: TaskPriority;
  estimate?: number;
  asignee?: string;
  status?: string;
}

type TaskProps = {
  onDelete?: () => Promise<void>;
} & Task;

export type { Task, TaskProps };
export { TaskPriority, TaskStatus };