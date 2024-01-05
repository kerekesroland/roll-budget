"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import CustomButton from "../CustomButton";
import GeneralHeader from "../GeneralHeader";
import { Input } from "../ui/input";

const InviteModal = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the email state
    setEmail(e.target.value);
  };

  const sendInvitation = async () => {
    try {
      setIsLoading(true);
      await axios.post(`/api/invitation`, { email });
      toast.success("Invitation sent successfully!");
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
          title="Invitation"
          subtitle="Send an invitation to your friends!"
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
          loadingTitle="Signing in"
          title="Send Invite"
          type="submit"
        />
      </div>
    </div>
  );
};

export default InviteModal;
