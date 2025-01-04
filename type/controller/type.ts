import z from "zod";

export const ControllerTestSchema = z.object({
  command: z.enum(["textarea", "list"]),
  value: z
    .string({
      required_error: "value is required",
      invalid_type_error: "value must be a string",
    })
    .min(1, { message: "한글자 이상 입력하세요." }),
});

export type ControllerTest = z.infer<typeof ControllerTestSchema>;
