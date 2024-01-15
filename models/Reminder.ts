export type ReminderPriorityType = 1 | 2 | 3 | 4 | 5;

export type ColorType =
  | "green"
  | "yellow"
  | "orange"
  | "red"
  | "purple"
  | "blue";
export interface IReminder {
  id: string;
  title: string;
  date: string;
  priority: ReminderPriorityType;
  color: ColorType;
  isComplete: boolean;
  userId: string;
}
