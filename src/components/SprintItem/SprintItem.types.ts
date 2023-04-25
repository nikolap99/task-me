type Sprint = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
}

type SprintProps = {
  onDelete?: () => Promise<void>;
} & Sprint;

export type { Sprint, SprintProps };