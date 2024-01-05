import React, { useState } from "react";
import GeneralHeader from "../GeneralHeader";
import { useSchemas } from "@/hooks/useSchemas";
import { SubmitHandler, useForm } from "react-hook-form";
import { IReminder } from "@/models/Reminder";
import { yupResolver } from "@hookform/resolvers/yup";
import InputController from "../InputController";
import NumberController from "../NumberController";
import CustomButton from "../CustomButton";
import { ValutaOptions } from "@/constants/ValutaOptions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { DatePickerForm } from "../CustomCalendar";
import { Combobox } from "../ComboBox";

interface IProps {
  toggleState: (value: boolean) => void;
  userId: string;
}

interface IReminderForm {
  title: string;
  date: Date;
  priority: number;
  color: string;
}

const AddReminderModal = ({ toggleState, userId }: IProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { reminderSchema } = useSchemas();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<IReminderForm>({
    resolver: yupResolver(reminderSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSetDate = (date: Date) => {
    setValue("date", date);
  };

  const handleSetPriority = (data: number) => {
    setValue("priority", data);
  };

  const handleSetColor = (data: string) => {
    setValue("color", data);
  };

  const onSubmit: SubmitHandler<IReminderForm> = async (data) => {
    console.log(data);
    try {
      setIsLoading(true);
      await axios.post("/api/reminder", {
        ...data,
        userId: userId,
      });
      toast.success(`Succesfully added added ${data.title} to the reminders!`);
      router.refresh();
      toggleState(false);
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("====================================");
  console.log(getValues());
  console.log("====================================");

  return (
    <div className="flex justify-center items-center h-full w-full absolute z-[200]">
      <div
        className="min-h-[400px] w-[700px] rounded-2xl p-16 border-2 border-[#1C293A] flex flex-col justify-between items-center bg-bgCustomDark"
        onClick={handleModalClick}
      >
        <GeneralHeader
          title="Add Reminder"
          subtitle="Fill out the information to add a reminder!"
          extraSubtitleStyle="!text-xl"
        />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <InputController
            label="Title"
            isTouched={false}
            error={errors.title?.message as string}
            register={register("title")}
            placeholder={"Groceries"}
            value={""}
            extraStyle="!max-w-full"
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
              />
              {errors.date?.message && (
                <p className="text-red-500 font-medium text-sm mt-4">
                  {errors.date.message}
                </p>
              )}
            </div>
          </div>

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
          />
          <CustomButton
            loading={isLoading}
            loadingTitle="Creating..."
            title="Add Reminder"
            type="submit"
            extraStyle="max-w-full"
          />
        </form>
      </div>
    </div>
  );
};

export default AddReminderModal;
