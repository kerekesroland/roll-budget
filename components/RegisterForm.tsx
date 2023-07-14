"use client";

import InputController from "@/components/InputController";
import { useAuthSchemas } from "@/hooks/useAuthSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import GeneralHeader from "./GeneralHeader";
import CustomButton from "./CustomButton";
import toast from "react-hot-toast";
import { ActivateToken } from "@prisma/client";
import axios from "axios";

interface IRegisterForm {
  accountToken: ActivateToken | null;
}

interface IRegisterFormInputs {
  password: string;
  confirmPassword: string;
}

const RegisterForm = ({ accountToken }: IRegisterForm) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { registerSchema } = useAuthSchemas();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(registerSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const router = useRouter();
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit: SubmitHandler<IRegisterFormInputs> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", {
        ...data,
        email: accountToken?.email,
        token: accountToken,
      });
      toast.success(`Successfully registered ${accountToken?.email}`);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error: any) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-full min-h-screen flex justify-center items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-[500px] min-h-[500px] flex flex-col justify-center items-center gap-8 bg-[#010808] rounded-2xl p-8">
        <GeneralHeader
          title="Activate your account!"
          subtitle="Enter your password to complete your account"
          extraSubtitleStyle="!text-lg"
        />
        <div className="w-full flex flex-col items-center">
          <InputController
            register={register("password")}
            placeholder="Password"
            key="password"
            type="password"
            isTouched={false}
            error={errors.password?.message as string}
            defaultName={"*****"}
            value={passwordValue}
          />
          <InputController
            register={register("confirmPassword")}
            placeholder="Confirm Password"
            key="confirmPassword"
            type="password"
            isTouched={false}
            error={errors.confirmPassword?.message as string}
            defaultName={"*****"}
            value={confirmPasswordValue}
          />
        </div>
        <CustomButton
          title="Submit"
          loading={isLoading}
          loadingTitle="Creating..."
          type="submit"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
