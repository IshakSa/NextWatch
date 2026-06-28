"use client";

import OAuthButton from "@/components/auth/OAuthButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import Link from "next/link";
import { FormProvider, useForm, UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldInput from "../../components/auth/field/FieldInput";

const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters."),
    email: z.email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms and conditions.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type FormValues = z.infer<typeof registerSchema>;
export type FormType = UseFormReturn<FormValues>;
export type FieldNames = keyof FormValues;

export default function RegisterPage() {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  async function handleSubmit(data: z.infer<typeof registerSchema>) {
    console.log(data);
  }

  return (
    <main>
      <div className="container flex min-h-screen items-center mt-3 justify-center">
        <Card className="w-full max-w-sm md:max-w-md">
          <CardHeader>
            <CardTitle>Register to start discovering</CardTitle>
            <CardDescription>
              Enter your details to create your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                id="register-form"
                noValidate
              >
                <FieldGroup className="flex flex-col gap-4 lg:gap-5 2xl:gap-6">
                  <FieldInput
                    name="username"
                    label="Username"
                    placeholder="Username"
                    type="text"
                  />

                  <FieldInput
                    name="email"
                    label="Email"
                    placeholder="Email"
                    type="email"
                  />

                  <FieldInput
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />

                  <FieldInput
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Password"
                    type="password"
                  />

                  <FieldInput name="terms" label="" placeholder="" type="" />
                </FieldGroup>
              </form>
            </FormProvider>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" form="register-form">
              Register
            </Button>

            <OAuthButton />

            <div className="flex items-center muted-text">
              <p>Already have an account?</p>
              <CardAction>
                <Button variant="link" className="font-semibold">
                  <Link href="/login">Login</Link>
                </Button>
              </CardAction>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
