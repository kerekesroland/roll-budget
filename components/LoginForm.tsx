"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useSchemas } from "@/hooks/useSchemas";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomButton from "./CustomButton";
import GeneralHeader from "./GeneralHeader";
import InputController from "./InputController";
import { useTranslations } from "use-intl";
import { useLocale } from "next-intl";

interface ILoginFormInputs {
  email: string;
  password: string;
}

const LoginForm = () => {
  const t = useTranslations("login");
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { loginSchema } = useSchemas();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const router = useRouter();
  const emailValue = watch("email");
  const passwordValue = watch("password");

  const onSubmit: SubmitHandler<ILoginFormInputs> = async (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success(t("toast_messages.login_success"));
        router.replace(`/${locale}/dashboard`);
      }

      if (callback?.error) {
        if (callback?.error === "User not found") {
          toast.error(t("toast_messages.user_not_found"));
        } else {
          toast.error(t("toast_messages.invalid_credentials"));
        }
      }
    });
  };

  return (
    <div className="relative min-h-screen w-full flex justify-center items-center">
      <div className="animate-pulse absolute top-0 right-0 w-60 h-60 sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] 2xl:w-[800px] 2xl:h-[800px] z-0">
        <Image
          src="/images/blob-right.svg"
          alt="Image 1"
          fill
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 400px, 600px"
        />
      </div>
      <div className="animate-pulse delay-300 absolute bottom-0 left-0 w-60 h-60 sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px] 2xl:w-[800px] 2xl:h-[800px] z-0">
        <Image
          src="/images/blob-left.svg"
          alt="Image 2"
          fill
          sizes="(max-width: 640px) 200px, (max-width: 1024px) 400px, 600px"
        />
      </div>
      <div className="flex">
        <div className="hidden w-[500px] h-[700px] z-10 lg:flex justify-center items-center relative ">
          <Image
            src="/images/login_image.jpg"
            alt="Image 2"
            fill
            className="rounded-tl-[12px] rounded-bl-[12px]"
            quality={100}
            sizes="(max-width: 640px) 200px, (max-width: 1024px) 400px, 600px"
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-72 xxs:w-[350px] xs:w-[400px] s:w-[500px] xl:h-[700px] p-8 xs:p-12 z-10  flex flex-col justify-center items-center bg-bgCustomDark relative rounded-[12px] lg:rounded-none lg:rounded-tr-[12px] lg:rounded-br-[12px]"
        >
          <GeneralHeader title={t("title")} subtitle={t("subTitle")} />
          <div className="w-full mt-[63px] flex flex-col items-center">
            <InputController
              register={register("email")}
              placeholder={t("emailPlaceholder")}
              key="email"
              type="text"
              isTouched={false}
              error={errors.email?.message as string}
              defaultName={""}
              value={emailValue}
            />

            <InputController
              register={register("password")}
              placeholder={t("passwordPlaceholder")}
              key="password"
              type="password"
              isTouched={false}
              error={errors.password?.message as string}
              defaultName={"*****"}
              value={passwordValue}
            />
            <div className="w-full mt-[75px] flex flex-col items-center">
              <CustomButton
                loading={isLoading}
                loadingTitle="Signing in"
                title={t("btn_signin")}
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
