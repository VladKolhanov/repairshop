"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

type Props<TSchema> = {
  fieldTitle: string;
  nameInSchema: keyof TSchema & string;
  message: string;
};

export const CheckboxWithLabel = <TSchema,>({
  fieldTitle,
  nameInSchema,
  message,
}: Props<TSchema>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="w-full flex items-center gap-2">
          <FormLabel className="text-base w-1/3 mt-2" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>

          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                id={nameInSchema}
                onCheckedChange={field.onChange}
                checked={field.value}
                {...field}
              />
            </FormControl>
            {message}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
