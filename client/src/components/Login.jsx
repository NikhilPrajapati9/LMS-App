import { useLoginUserMutation } from "@/features/api/authApi";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useForm } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const [loginUser, { data: loginData, error, isLoading, isSuccess }] =
    useLoginUserMutation();

  const login = async (data) => {
    await loginUser({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isSuccess && loginData) {
      toast.success(loginData.message || "Login successful");
      navigate("/");
    }
  }, [isLoading, loginData, error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login your existing account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(login)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="xyz@gmail.com"
              required={true}
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Eg. abc"
              type="password"
              required={true}
              {...register("password", {
                required: true,
              })}
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            className="mt-5 cursor-pointer  w-full"
          >
            {isLoading ? <Loader className="animate-spin size-5" /> : "Login"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default Login;
