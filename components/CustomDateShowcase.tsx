"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar2 } from "./ui/calendar2";

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date is required.",
  }),
});
export function DatePickerForm2({
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
      callback(filterKey, defaultValue);
    }
  }, [callback, defaultValue, form, filterKey]);

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
              <Calendar2
                className={`text-white ${calendarAdditionalClasses}`}
                mode="single"
                selected={field.value}
                onSelect={(date) => handleDateSelect(date as Date)}
                disabled={(date) => isDateValid(date, futureDatesOnly)}
                initialFocus
              />

              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}

export default DatePickerForm2;
