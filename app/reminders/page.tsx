import ActiveReminders from "@/components/reminders/ActiveReminders";
import RemindersContent from "@/components/reminders/RemindersContent";
import getCurrentUser from "@/lib/getCurrentUser";
import { getReminders } from "@/lib/getReminders";
import { IReminder } from "@/models/Reminder";

type Props = {};

const Reminders = async (props: Props) => {
  const userPromise = getCurrentUser();
  const remindersPromise = getReminders();

  const [user, reminders] = await Promise.all([userPromise, remindersPromise]);

  return (
    <div className="h-screen flex flex-col 3xl:flex-row items-start gap-12 overflow-y-auto 3xl:overflow-hidden p-[1.5rem] xs:p-12 md:py-8 lg:py-12 w-full md:w-[calc(100%-300px)] mt-8 s:mt-0">
      <div className="w-full 3xl:w-2/3">
        <RemindersContent user={user} />
      </div>
      <div className="w-full 3xl:w-1/3">
        <ActiveReminders reminders={reminders ?? []} />
      </div>
    </div>
  );
};

export default Reminders;
