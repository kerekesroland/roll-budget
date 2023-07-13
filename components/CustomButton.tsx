"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  type?: "button" | "reset" | "submit";
  loading?: boolean;
  loadingTitle?: string;
  onClick?: () => void | Promise<void>;
};

const CustomButton = ({
  title,
  onClick,
  loading = false,
  loadingTitle,
  type = "button",
}: Props) => {
  return (
    <Button
      disabled={loading}
      onClick={onClick}
      type={type}
      className="w-full max-w-[350px] py-[28px] px-5 text-[16px] font-semibol hover:brightness-110"
      style={{
        backgroundImage:
          "linear-gradient(47deg, #4131FF 0%, rgba(142, 91, 249, 0.70) 100%)",
      }}
    >
      {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? loadingTitle : title}
    </Button>
  );
};

export default CustomButton;
