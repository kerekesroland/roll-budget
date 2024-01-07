import { reminderTemplate } from "@/helpers/email-templates";
import { IUser } from "@/models/User";
import { Reminder } from "@prisma/client";
import schedule from "node-schedule";

interface IScheduleReminderForUserProps {
  user: IUser;
  reminder: Reminder;
}

export const sendScheduledEmail = async ({
  user,
  reminder,
}: IScheduleReminderForUserProps) => {
  const EmailApiSdk = require("@getbrevo/brevo");
  const cronDate = new Date(reminder?.date);
  const cronExpression = `${cronDate.getMinutes()} ${cronDate.getHours()} ${cronDate.getDate()} ${
    cronDate.getMonth() + 1
  } *`;

  const apiKeySMTP = process.env.SMTP_API_KEY as string;
  const apiInstance = new EmailApiSdk.TransactionalEmailsApi();

  apiInstance.setApiKey(EmailApiSdk.AccountApiApiKeys.apiKey, apiKeySMTP);

  const apiKey = apiInstance.authentications["apiKey"];
  apiKey.apiKey = apiKeySMTP;

  let sendSmtpEmail = new EmailApiSdk.SendSmtpEmail();

  const emailData = {
    subject: "Due Reminder!",
    htmlContent: reminderTemplate({
      task: reminder?.title,
      userName: user?.email,
      date: reminder?.date.toDateString(),
    }),
    sender: { email: "rollbudget.info@gmail.com" },
    to: [{ email: user?.email }],
  };

  sendSmtpEmail = emailData;

  schedule.scheduleJob(reminder?.id, cronExpression, async function () {
    await apiInstance.sendTransacEmail(sendSmtpEmail);
  });
};

export async function scheduleReminderForUser({
  user,
  reminder,
}: IScheduleReminderForUserProps) {
  try {
    await sendScheduledEmail({ user, reminder });
    console.log(`Reminders scheduled for user ${user?.email}`);
  } catch (error) {
    console.error(`Error scheduling reminders for user ${user?.email}:`, error);
  }
}

// Function to cancel a reminder by ID
export const cancelReminder = async (reminderId: string) => {
  try {
    if (reminderId) {
      schedule.cancelJob(reminderId);
    }
    console.log("Canceled reminder", reminderId);
  } catch (error) {
    console.error(error);
  }
};

export const reScheduleReminder = async (user: IUser, reminder: Reminder) => {
  try {
    cancelReminder(reminder?.id);

    await scheduleReminderForUser({ user, reminder });
    console.log("Rescheduled reminder to new date", reminder.date);
  } catch (error) {
    console.error(error);
  }
};
