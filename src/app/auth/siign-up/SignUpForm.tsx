'use client';
import { SubmitRhkButton } from "@/components/form/Buttons";
import { FormInput } from "@/components/form/FormInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { SignUpInputs, SignUpSchema } from "@/utils/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaSchool } from "react-icons/fa";


export default function SignUpForm() {
  const form = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (data: SignUpInputs) => {
    console.log(data);
  };

  console.log(form.formState.isValid);

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-4">
        <CardTitle className="flex flex-col gap-2 justify-center items-center">
          <FaSchool className="text-3xl" />
          <div className="text-2xl">アカウント作成</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormInput form={form} type="text" name="email" label="Email" />
              <FormInput form={form} type="password" name="password" label="Password" />
              <FormInput form={form} type="password" name="confirmPassword" label="Passwordの確認" />
            </div>
            <SubmitRhkButton isValid={!form.formState.isValid} text="アカウント作成" className="w-full mt-5" />
            <p className="text-xs mt-3">アカウント登録済みの場合は
              <Link href='/auth/login' className=" text-primary font-semibold">ログインへ移動</Link>
            </p>
          </form>
        </Form>
      </CardContent>
    </Card >
  );
}