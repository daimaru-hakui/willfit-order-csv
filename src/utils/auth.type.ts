import z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "email形式で入力してください" }),
  password: z.string().min(8, { message: "8文字以上で登録をお願いします。" })
});
export type LoginInputs = z.infer<typeof LoginSchema>;


export const SignUpSchema = z.object({
  email: z.string().email({ message: "email形式で入力してください" }),
  password: z.string().min(8, { message: "8文字以上で登録をお願いします。" }),
  confirmPassword: z.string().min(8, { message: "8文字以上で登録をお願いします。" })
}).superRefine(({ password, confirmPassword }, ctx) => {
  if (password !== confirmPassword) {
    ctx.addIssue({
      path: ['confirmPassword'], code: 'custom', message: 'パスワードと確認パスワードが一致しません',
    });
  }
});
export type SignUpInputs = z.infer<typeof SignUpSchema>;