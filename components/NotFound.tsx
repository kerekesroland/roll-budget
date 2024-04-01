import React from "react";
import GeneralHeader from "./GeneralHeader";
import { useTranslations } from "next-intl";

type Props = {};

const NotFound = (props: Props) => {
  const t = useTranslations("not_found");

  return (
    <div className="flex justify-center items-center w-full">
      <GeneralHeader title={t("title")} subtitle={t("subTitle")} />
    </div>
  );
};

export default NotFound;
