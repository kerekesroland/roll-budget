import React from "react";

type Props = {
  error?: string;
  extraStyle?: string;
};

const ErrorInputMessage = ({ error, extraStyle }: Props) => {
  return (
    <span className={`text-red-500 text-sm mt-4 ${extraStyle}`}>{error}</span>
  );
};

export default ErrorInputMessage;
