import React from 'react';

type Props = {
  error?: string;
};

const ErrorInputMessage = ({ error }: Props) => {
  return <span className="text-red-500 text-sm mt-4">{error}</span>;
};

export default ErrorInputMessage;
