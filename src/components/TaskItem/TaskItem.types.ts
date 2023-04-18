enum TaskPriority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

type Task = {
  title: string;
  description?: string;
  priority?: TaskPriority;
  estimate?: number;
  asignee?: string;
}

export type { Task };
export { TaskPriority };