"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
} from "lucide-react";

import { toast } from "sonner";

import { registerUser } from "@/services/auth.service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";

export default function SignupForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
    ) {
        toast.error(
            "Please fill all fields"
        );
        
        return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error(
        "Passwords do not match"
      );

      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        password:
          formData.password,
      };

      const response =
        await registerUser(
          payload
        );

      toast.success(
        response.message ||
          "Account created successfully"
      );

      router.push(
        "/login"
      );
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Create Account
          </CardTitle>

          <CardDescription className="text-center">
            Join Rajwadi Fashion
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4"
          >
            {/* Name */}

            <div className="space-y-2">
              <Label>
                Full Name
              </Label>

              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />

                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={
                    formData.name
                  }
                  onChange={
                    handleChange
                  }
                  className="pl-10"
                />
              </div>
            </div>

            {/* Email */}

            <div className="space-y-2">
              <Label>
                Email
              </Label>

              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />

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

            {/* Password */}

            <div className="space-y-2">
              <Label>
                Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />

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

            {/* Confirm Password */}

            <div className="space-y-2">
              <Label>
                Confirm
                Password
              </Label>

              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />

                <Input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="********"
                  value={
                    formData.confirmPassword
                  }
                  onChange={
                    handleChange
                  }
                  className="pl-10 pr-10"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  className="absolute right-3 top-3"
                >
                  {showConfirmPassword ? (
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
                ? "Creating Account..."
                : "Create Account"}
            </Button>

            <p className="text-center text-sm">
              Already have an
              account?{" "}
              <Link
                href="/login"
                className="font-medium text-primary hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}