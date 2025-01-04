"use client";

import { ControllerTest } from "@/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<ControllerTest, "value">;
};

export default function ValueSelectbox({ field }: Props) {
  console.log("field value : ", field.value);

  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={"Select Value"} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="back">Back</SelectItem>
        <SelectItem value="home">Home</SelectItem>
      </SelectContent>
    </Select>
  );
}
