"use client";
import { SubmitRhkButton } from "@/components/form/Buttons";
import { FormInput } from "@/components/form/FormInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { auth } from "@/lib/firebase/client";
import { LoginInputs, LoginSchema } from "@/utils/auth.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaSchool } from "react-icons/fa";

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInputs) => {
    handleSignIn(data);
  };

  const handleSignIn = (data: LoginInputs) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <Card className="w-[350px]">
      <CardHeader className="pb-3">
        <CardTitle className="flex flex-col gap-2 justify-center items-center">
          <div className="text-3xl">login</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <FormInput
                form={form}
                type="text"
                name="email"
                label="Email"
              />
              <FormInput
                form={form}
                type="password"
                name="password"
                label="Password"
              />
            </div>
            <SubmitRhkButton
              isValid={!form.formState.isValid}
              text="ログイン"
              className="w-full mt-5"
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
