type EmailData<T, V> = {
  subject: string;
  htmlContent: string;
  sender: T;
  to: V;
};

type SenderType = {
  email: string;
};

type ToType = {
  email: string;
}[];

export function emailBuilder(data: EmailData<SenderType, ToType>) {
  const { subject, htmlContent, sender, to } = data;

  const emailData = {
    subject,
    htmlContent,
    sender,
    to,
  };

  return emailData;
}
