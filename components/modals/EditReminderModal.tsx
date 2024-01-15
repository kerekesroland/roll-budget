import { useSchemas } from "@/hooks/useSchemas";
import { IReminder } from "@/models/Reminder";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import CustomButton from "../CustomButton";
import GeneralHeader from "../GeneralHeader";
import InputController from "../InputController";
import { Combobox } from "../ComboBox";
import { DateTimePicker } from "../DateTimePicker/date-time-picker";
import { DateValue } from "react-aria";
import { CalendarDateTime } from "@internationalized/date";
import ErrorInputMessage from "../ErrorInputMessage";
import { useTranslations } from "next-intl";

interface IProps {
  closeModal: () => void;
  userId: string;
  reminder: IReminder;
}

interface IReminderWithoutIds {
  date: DateValue | any;
  color: string;
  priority: number;
  title: string;
}

const EditReminderModal = ({ closeModal, userId, reminder }: IProps) => {
  const t = useTranslations("reminders.edit_reminder");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const { reminderSchema } = useSchemas();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IReminderWithoutIds>({
    resolver: yupResolver(reminderSchema),
    reValidateMode: "onChange",
    mode: "onChange",
    values: { ...reminder, date: new Date(reminder.date) },
  });

  const handleSetDate = (date: DateValue) => {
    setValue("date", date);
  };

  const handleSetPriority = (data: number) => {
    setValue("priority", data);
  };

  const handleSetColor = (data: string) => {
    setValue("color", data);
  };

  const reminderDate = new Date(reminder?.date);

  const handleDeleteReminder = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/reminder/${reminder.id}`);
      router.refresh();
      toast.success(t("toast_messages.delete_success"));
    } catch (error: any) {
      toast.error(t("toast_messages.delete_error"));
    } finally {
      setIsLoading(false);
    }
  }, [router, reminder.id]);

  const onSubmit: SubmitHandler<IReminderWithoutIds> = async (data) => {
    const convertedData = {
      ...data,
      priority: data.priority.toString(),
    };

    try {
      setIsLoading(true);
      await axios.put(`/api/reminder/${reminder.id}`, convertedData);
      toast.success(t("toast_messages.edit_success"));
      router.refresh();
      closeModal();
    } catch (error: any) {
      console.log(t("toast_messages.edit_error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-full w-full absolute z-[200]">
      <div
        className="min-h-[400px] w-[700px] rounded-2xl p-16 border-2 border-[#1C293A] flex flex-col justify-between items-center bg-bgCustomDark"
        onClick={handleModalClick}
      >
        <GeneralHeader
          title={t("title")}
          subtitle={t("subTitle")}
          extraSubtitleStyle="!text-xl"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputController
            label={t("name")}
            isTouched={false}
            error={errors.title?.message as string}
            register={register("title")}
            placeholder={"Shopping"}
            value={""}
            extraStyle="max-w-full"
          />
          <label>{t("color")}</label>
          <Combobox
            title="Color"
            options={[
              { label: "green", value: "green" },
              { label: "purple", value: "purple" },
              { label: "red", value: "red" },
              { label: "blue", value: "blue" },
              { label: "yellow", value: "yellow" },
              { label: "orange", value: "orange" },
            ]}
            extraStyle="border-[#1C293A] hover:bg-[#1C293A] hover:text-white w-full h-[60px] mb-8"
            callback={handleSetColor}
            defaultValue={reminder?.color}
          />
          <div className="py-8 flex items-center gap-4">
            <div className="w-1/2">
              <label>{t("priority")}</label>
              <Combobox
                title="Priorities"
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                ]}
                extraStyle="border-[#1C293A] hover:bg-[#1C293A] hover:text-white w-full h-[60px] mb-4"
                callback={handleSetPriority}
                defaultValue={reminder?.priority.toString()}
              />
              {errors.priority?.message && (
                <p className="text-red-500 font-medium text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label>{t("date")}</label>
              <DateTimePicker
                error={true}
                granularity={"minute"}
                onChange={handleSetDate}
                errorMessage={errors?.date?.message as any}
                defaultValue={
                  reminder.date
                    ? new CalendarDateTime(
                        reminderDate?.getFullYear(),
                        reminderDate?.getMonth() + 1,
                        reminderDate?.getDate(),
                        reminderDate?.getHours(),
                        reminderDate?.getMinutes(),
                        reminderDate?.getSeconds()
                      )
                    : null
                }
              />
              <ErrorInputMessage
                extraStyle="relative top-[1rem]"
                error={errors?.date?.message as any}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CustomButton
              loading={isLoading}
              loadingTitle={t("btn_loading")}
              title={t("edit_btn")}
              type="submit"
            />
            <CustomButton
              onClick={handleDeleteReminder}
              loading={isLoading}
              loadingTitle={t("btn_delete_loading")}
              title={t("delete_btn")}
              type="button"
              primary={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReminderModal;
