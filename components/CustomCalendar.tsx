"use client";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar2 } from "./ui/calendar2";
import { useTranslations } from "next-intl";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date is required.",
  }),
});

export function DatePickerForm({
  extraStyle,
  extraContainerStyle,
  calendarAdditionalClasses,
  callback,
  defaultValue,
  filterKey,
  futureDatesOnly = false,
}: {
  extraStyle?: string;
  extraContainerStyle?: string;
  calendarAdditionalClasses?: string;
  callback?: any;
  defaultValue?: Date;
  filterKey?: string;
  futureDatesOnly?: boolean;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const t = useTranslations("budgets");

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  useEffect(() => {
    if (defaultValue) {
      form.setValue("dob", defaultValue);
      callback(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDateSelect = (date: Date | null) => {
    if (date !== null) {
      form.setValue("dob", date);
      if (filterKey) {
        callback(filterKey, date);
      } else {
        callback(date);
      }
    }
  };

  const isDateValid = (date: Date, futureDatesOnly: boolean): boolean => {
    const isFutureDate = date.getTime() > new Date().setHours(0, 0, 0, 0);

    if (futureDatesOnly) {
      return !isFutureDate;
    } else {
      return false;
    }
  };

  return (
    <Form {...form}>
      <div
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-8 ${extraContainerStyle}`}
      >
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        `w-[240px] min-h-[50px] pl-3 text-left font-normal !border-[#1C293A] border-2 hover:bg-gray-300 ${extraStyle}`,
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>{t("filters.date")}</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    className={`bg-[#1C293A] text-white ${calendarAdditionalClasses}`}
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => handleDateSelect(date as Date)}
                    disabled={(date) => isDateValid(date, futureDatesOnly)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
