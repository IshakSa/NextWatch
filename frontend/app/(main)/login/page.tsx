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
  CardTitle
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FieldInput from "../../../components/auth/field/FieldInput";
import { loginUser } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { RefreshCwIcon } from "lucide-react";
import posthog from "posthog-js";

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

  const router = useRouter();

  async function handleSubmit(data: LoginValues) {
    try {
      const { userId } = await loginUser(data);
      posthog.identify(userId, { email: data.email });
      posthog.capture("login_completed");
      router.push("/");
    } catch {
      toast.error("Login failed", {
        description: "Invalid email or password. Please check your credentials and try again.",
      });
    }
  }

  return (
    <main>
      <div className="container flex flex-col gap-5 min-h-screen items-center mt-3 justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>Enter your details to login</CardDescription>
          </CardHeader>

          <CardContent>
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} id="register-form" noValidate>
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
            <Button type="submit" className="w-full rounded-lg" form="register-form">
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

        <Card className="w-full max-w-xs">
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-semibold">Demo Account</span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <RefreshCwIcon className="h-2.5 w-2.5 animate-[spin_4s_linear_infinite]" />
                Resets daily
              </span>
            </div>

            <div className="space-y-1 text-xs">
              <div className="flex items-center">
                <span className="text-muted-foreground w-16 shrink-0">Email:</span>
                <span className="select-all text-foreground font-semibold">test@mail.com</span>
              </div>
              <div className="flex items-center">
                <span className="text-muted-foreground w-16 shrink-0">Password:</span>
                <span className="select-all text-foreground font-semibold">Test1234</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
