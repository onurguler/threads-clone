import { z } from "zod";

export const newThreadSchema = z.object({
  bodyText: z.string().max(280).nonempty(),
});

export type NewThread = z.infer<typeof newThreadSchema>;
