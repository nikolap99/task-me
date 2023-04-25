type MemberItemProps = {
  onDelete?: () => Promise<void>;
} & MemberItem;

type MemberItem = {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  priviledge?: string;
}

export type { MemberItemProps };