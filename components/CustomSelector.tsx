"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useEffect, useState } from "react";

type Option = {
  label: string;
  image?: string;
  value: string;
};

interface ICustomSelectorProps {
  title: string;
  placeholder?: string;
  options: Array<Option>;
  setValue: Function;
}

export function CustomSelector({
  options,
  title,
  placeholder,
  setValue,
}: ICustomSelectorProps) {
  const [selectedElement, setSelectedElement] = useState<string>("");

  useEffect(() => {
    setValue("icon", selectedElement);
  }, [selectedElement, setValue]);

  return (
    <Select onValueChange={(e) => setSelectedElement(e)}>
      <SelectTrigger className="w-full h-[60px] border-[#1C293A] border-2">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{title}</SelectLabel>
          {options?.map((option: Option) => (
            <SelectItem key={option?.value} value={option?.value}>
              <div className="flex items-center gap-4">
                {option?.image && (
                  <Image
                    src={option?.image}
                    alt="icon"
                    width={24}
                    height={24}
                  />
                )}
                <span className="font-medium">{option?.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}