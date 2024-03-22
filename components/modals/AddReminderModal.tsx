import React, { useState } from "react";
import GeneralHeader from "../GeneralHeader";
import { useSchemas } from "@/hooks/useSchemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputController from "../InputController";
import CustomButton from "../CustomButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Combobox } from "../ComboBox";
import { DateTimePicker } from "../DateTimePicker/date-time-picker";
import { DateValue } from "react-aria";
import ErrorInputMessage from "../ErrorInputMessage";
import { IUser } from "@/models/User";
import { useTranslations } from "next-intl";

interface IProps {
  toggleState: (value: boolean) => void;
  user: IUser | null;
}

interface IReminderForm {
  title: string;
  date: Date | any;
  priority: number;
  color: string;
}

const AddReminderModal = ({ toggleState, user }: IProps) => {
  const t = useTranslations("reminders");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { reminderSchema } = useSchemas();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IReminderForm>({
    resolver: yupResolver(reminderSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSetDate = (date: DateValue) => {
    setValue("date", date);
  };

  const handleSetPriority = (data: number) => {
    setValue("priority", data);
  };

  const handleSetColor = (data: string) => {
    setValue("color", data);
  };

  const onSubmit: SubmitHandler<IReminderForm> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/reminder", {
        ...data,
        user,
      });
      toast.success(t("add_reminder.toast_messages.add_success"));
      router.refresh();
      toggleState(false);
    } catch (error: any) {
      toast.error(t("add_reminder.toast_messages.add_error"));
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
          title={t("add_reminder.title")}
          subtitle={t("add_reminder.subTitle")}
          extraSubtitleStyle="!text-xl"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputController
            label={t("add_reminder.name")}
            isTouched={false}
            error={errors.title?.message as string}
            register={register("title")}
            placeholder={"Groceries"}
            value={""}
            extraStyle="!max-w-full"
          />

          <div className="py-8 flex items-center gap-4">
            <div className="w-1/2">
              <label>{t("add_reminder.priority")}</label>
              <Combobox
                title={t("priorities")}
                options={[
                  { label: "1", value: "1" },
                  { label: "2", value: "2" },
                  { label: "3", value: "3" },
                  { label: "4", value: "4" },
                  { label: "5", value: "5" },
                ]}
                extraStyle="border-[#1C293A] hover:bg-[#1C293A] hover:text-white w-full h-[60px] mb-4"
                callback={handleSetPriority}
              />
              {errors.priority?.message && (
                <p className="text-red-500 font-medium text-sm">
                  {errors.priority.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-1/2">
              <label>{t("add_reminder.date")}</label>
              <DateTimePicker granularity={"minute"} onChange={handleSetDate} />
              <ErrorInputMessage error={errors?.date?.message as any} />
            </div>
          </div>

          <label>{t("add_reminder.color")}</label>
          <Combobox
            title={t("add_reminder.color")}
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
          />
          <CustomButton
            loading={isLoading}
            loadingTitle={t("add_reminder.btn_loading")}
            title={t("add_reminder.add_btn")}
            type="submit"
            extraStyle="max-w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AddReminderModal;
