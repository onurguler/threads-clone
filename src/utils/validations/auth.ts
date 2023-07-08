import * as z from "zod";

export const signinSchema = z.object({
  username: z.string().min(3).max(32),
  password: z.string().min(6).max(100),
});

export const signupSchema = signinSchema
  .extend({
    name: z.string().max(128).nonempty(),
    email: z.string().email(),
    confirmPassword: z.string().min(6).max(100),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export type ILogin = z.infer<typeof signinSchema>;
export type ISignUp = z.infer<typeof signupSchema>;
