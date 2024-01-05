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
import { DatePickerForm } from "../CustomCalendar";

interface IProps {
  closeModal: () => void;
  userId: string;
  reminder: IReminder;
}

interface IReminderWithoutIds {
  date: Date;
  color: string;
  priority: number;
  title: string;
}

const EditReminderModal = ({ closeModal, userId, reminder }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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

  const handleSetDate = (date: Date) => {
    setValue("date", date);
  };

  const handleSetPriority = (data: number) => {
    setValue("priority", data);
  };

  const handleSetColor = (data: string) => {
    setValue("color", data);
  };

  const handleDeleteReminder = useCallback(async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/reminder/${reminder.id}`);
      router.refresh();
      toast.success("Successfully deleted reminder");
    } catch (error: any) {
      toast.error(error.response.data.message);
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
      toast.success(`Successfully modified reminder!`);
      router.refresh();
      closeModal();
    } catch (error: any) {
      console.log(error);
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
          title="Edit Reminder"
          subtitle="Fill out the information to edit the reminder!"
          extraSubtitleStyle="!text-xl"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputController
            label="Title"
            isTouched={false}
            error={errors.title?.message as string}
            register={register("title")}
            placeholder={"Shopping"}
            value={""}
            extraStyle="max-w-full"
          />
          <label>Color</label>
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
              <label>Priority</label>
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
            <div className="flex flex-col w-1/2 pb-4">
              <label>Date</label>
              <DatePickerForm
                extraStyle="!w-full !h-[60px]"
                callback={handleSetDate}
                futureDatesOnly={true}
                defaultValue={new Date(reminder?.date)}
              />
              {errors.date?.message && (
                <p className="text-red-500 font-medium text-sm mt-4">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CustomButton
              loading={isLoading}
              loadingTitle="Editing..."
              title="Edit Reminder"
              type="submit"
            />
            <CustomButton
              onClick={handleDeleteReminder}
              loading={isLoading}
              loadingTitle="Deleting..."
              title="Delete Reminder"
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
