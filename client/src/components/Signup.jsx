import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";
import { useRegisterUserMutation } from "@/features/api/authApi";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [registerUser, { data: registerData, error, isLoading, isSuccess }] =
    useRegisterUserMutation();

  const signup = async (data) => {
    await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (isSuccess && registerData) {
      toast.success(registerData.message || "Signup successful");
      navigate("/");
    }
  }, [isLoading, registerData, error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(signup)}>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Eg. david"
              required={true}
              {...register("name", {
                required: true,
              })}
            />
          </div>
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
            <Label htmlFor="singupPassword">Password</Label>
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
            className="mt-5 cursor-pointer w-full"
          >
            {isLoading ? <Loader className="animate-spin size-5" /> : "Signup"}
          </Button>
        </CardContent>
      </form>
    </Card>
  );
};

export default Signup;
