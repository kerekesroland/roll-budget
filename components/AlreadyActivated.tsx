import React from "react";
import GeneralHeader from "./GeneralHeader";
import { useTranslations } from "next-intl";

type Props = {};

const AlreadyActivated = () => {
  const t = useTranslations("already_activated");
  return (
    <div className="flex justify-center items-center w-full">
      <GeneralHeader title={t("title")} subtitle={t("subTitle")} />
    </div>
  );
};

export default AlreadyActivated;
