import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  extraTitleStyle?: string;
  extraSubtitleStyle?: string;
};

const GeneralHeader = ({
  title,
  subtitle,
  extraTitleStyle,
  extraSubtitleStyle,
}: Props) => {
  return (
    <div className="text-center">
      <h2
        className={`mb-[17px] text-3xl font-semibold text-textPrimary ${extraTitleStyle}`}
      >
        {title}
      </h2>
      <p
        className={`text-2xl font-medium text-textPrimary/70 ${extraSubtitleStyle}`}
      >
        {subtitle}
      </p>
    </div>
  );
};

export default GeneralHeader;
