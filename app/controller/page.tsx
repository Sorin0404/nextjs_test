"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerTest, ControllerTestSchema } from "@/type";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import ValueSelectbox from "@/components/controller/ValueSelectbox";

export default function Page() {
  const commandDefaultValue = "textarea";
  const valueDefaultValue = "Hello World";

  const form = useForm<ControllerTest>({
    resolver: zodResolver(ControllerTestSchema),
    defaultValues: { command: commandDefaultValue, value: valueDefaultValue },
  });

  const command = form.watch("command");

  console.log("watch : ", form.watch());
  console.log("error : ", form.formState.errors);

  const onSubmit: SubmitHandler<ControllerTest> = (data) => {
    console.log("data : ", data);
  };

  useEffect(() => {
    if (command === commandDefaultValue) {
      //   form.setValue("value", valueDefaultValue);
      form.resetField("value");
    } else {
      form.setValue("value", "");
    }

    form.clearErrors("value");
  }, [command, form]);

  return (
    <main className="flex flex-col gap-y-4 justify-center items-center w-full h-dvh">
      <h1>React Hook Form Controller Test</h1>
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-4 justify-center items-center w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-4">
            <h2>Command</h2>
            <Controller
              control={form.control}
              name="command"
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={"Select Command"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="textarea">TextArea</SelectItem>
                    <SelectItem value="list">List</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center gap-4">
            <h2>Value</h2>
            {command === "textarea" ? (
              <Controller
                control={form.control}
                name="value"
                render={({ field }) => (
                  <Textarea value={field.value} onChange={field.onChange} />
                )}
              />
            ) : (
              command === "list" && (
                <Controller
                  control={form.control}
                  name="value"
                  render={({ field }) => <ValueSelectbox field={field} />}
                />
              )
            )}
          </div>
          <ErrorMessage
            errors={form.formState.errors}
            name="value"
            render={({ message }) => <p>{message}</p>}
          />
          <div className="w-full flex justify-center items-center">
            <Button
              className="bg-indigo-600 font-semibold hover:bg-indigo-600 hover:bg-opacity-80"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </main>
  );
}
