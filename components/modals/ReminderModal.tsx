import { IReminder } from "@/models/Reminder";
import React from "react";

interface IProps {
  closeModal: () => void;
  handleDeleteReminder: (id: string) => Promise<void>;
  userId: string;
  reminder: IReminder;
}

const ReminderModal = ({
  closeModal,
  handleDeleteReminder,
  userId,
  reminder,
}: IProps) => {
  return <div>ReminderModal</div>;
};

export default ReminderModal;
