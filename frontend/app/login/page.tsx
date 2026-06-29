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
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldInput from "../../components/auth/field/FieldInput";
import { loginUser } from "./actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(data: LoginValues) {
    let isSuccess = false;
    try {
      isSuccess = await loginUser(data);
    } catch (error) {
      toast.error("Login failed", {
        description:
          "Invalid email or password. Please check your credentials and try again.",
      });
    }
    if (isSuccess) {
      redirect("/");
    }
  }

  return (
    <main>
      <div className="container flex min-h-screen items-center mt-3 justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your details to login</CardDescription>
          </CardHeader>

          <CardContent>
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                id="register-form"
                noValidate
              >
                <FieldGroup className="flex flex-col gap-4 lg:gap-5 2xl:gap-6">
                  <FieldInput<LoginValues>
                    name="email"
                    label="Email"
                    placeholder="Email"
                    type="email"
                  />

                  <FieldInput<LoginValues>
                    name="password"
                    label="Password"
                    placeholder="Password"
                    type="password"
                  />
                </FieldGroup>
              </form>
            </FormProvider>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" form="register-form">
              Login
            </Button>

            <OAuthButton />

            <div className="flex items-center muted-text">
              <p>Don&apos;t have an account?</p>
              <CardAction>
                <Button variant="link" className="font-semibold">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </CardAction>
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
