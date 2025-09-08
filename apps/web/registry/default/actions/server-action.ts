"use server";
import { actionClient } from "./safe-action";
import { formSchema } from "../lib/form-schema";

export const serverAction = actionClient
  .inputSchema(formSchema)
  .action(async ({ parsedInput }) => {
    // do something with the data
    console.log(parsedInput);
    return {
      success: true,
      message: "Form submitted successfully",
    };
  });
