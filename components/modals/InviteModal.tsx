"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import CustomButton from "../CustomButton";
import GeneralHeader from "../GeneralHeader";
import { Input } from "../ui/input";
import { useLocale, useTranslations } from "next-intl";

const InviteModal = () => {
  const t = useTranslations("invites.add_invite");
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const locale = useLocale();
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the email state
    setEmail(e.target.value);
  };

  const sendInvitation = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/invitation`, { email, locale });
      toast.success(t("toast_messages.add_success"));
      setEmail("");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="flex justify-center items-center h-full w-full absolute z-[200]">
      <div
        className="min-h-[400px] w-[500px] rounded-2xl p-16 border-2 border-[#1C293A] flex flex-col justify-between items-center bg-bgCustomDark"
        onClick={handleModalClick}
      >
        <GeneralHeader
          title={t("title")}
          subtitle={t("subTitle")}
          extraSubtitleStyle="!text-xl"
        />
        <Input
          className="text-gray-950 max-w-[350px]"
          name="email"
          value={email}
          onChange={handleInputChange}
        />
        <CustomButton
          onClick={sendInvitation}
          loading={isLoading}
          loadingTitle={t("btn_loading")}
          title={t("add_btn")}
          type="submit"
        />
      </div>
    </div>
  );
};

export default InviteModal;
