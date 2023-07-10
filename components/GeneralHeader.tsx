import React from "react";

type Props = {
  title: string;
  subtitle: string;
  extraStyle?: string;
};

const GeneralHeader = ({ title, subtitle, extraStyle }: Props) => {
  return (
    <div className="text-center">
      <h2
        className={`mb-[17px] text-3xl font-semibold text-textPrimary ${extraStyle}`}
      >
        {title}
      </h2>
      <p className="text-2xl font-medium text-textPrimary/70">{subtitle}</p>
    </div>
  );
};

export default GeneralHeader;
