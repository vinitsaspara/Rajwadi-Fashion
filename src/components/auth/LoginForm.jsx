"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { toast } from "sonner";

import { loginUser } from "@/services/auth.service";
import { setUser } from "@/store/slices/authSlice";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password
    ) {
      toast.error(
        "Please fill all fields"
      );

      return;
    }

    try {
      setLoading(true);

      const response =
        await loginUser(
          formData
        );

      dispatch(
        setUser(
          response.user
        )
      );

      toast.success(
        response.message
      );

      router.push("/");
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-3xl font-bold">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-center">
            Login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label>
                Email
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>
                Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                <Input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="********"
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  className="pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </Button>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-primary hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}