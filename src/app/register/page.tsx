"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "team_member",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, role: e.target.value });
  };

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/signup", user);
      console.log("Signup success", response.data);
      toast({
        title: 'Sign up successful',
        description: 'Please login using the same credentials',
        variant: 'default', 
      });
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error);
      
      // Check if the error response is due to schema validation or other issues
      if (error.response) {
        if (error.response.status === 400) {
          // Check if the error is related to validation or duplicate email
          if (error.response.data.error === "User already exists") {
            toast({
              title: 'Error',
              description: 'Email already exists. Please use a different email.',
              variant: 'destructive',
            });
          } else {
            // Handle schema validation errors
            toast({
              title: 'Validation Error',
              description: 'Please ensure all fields are filled out correctly.',
              variant: 'destructive',
            });
          }
        } else {
          // Handle unexpected errors
          toast({
            title: 'Error',
            description: 'An unexpected error occurred. Please try again later.',
            variant: 'destructive',
          });
        }
      } else {
        // Network error or no response
        toast({
          title: 'Network Error',
          description: 'Unable to reach the server. Please check your connection and try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Enable button only if all fields are non-empty
    setButtonDisabled(
      !(user.email && user.password && user.role)
    );
  }, [user]);

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold">
        {loading ? "Processing" : "Signup"}
      </h1>
      <hr className="w-full my-4" />
      <div className="w-64">
        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <label
          htmlFor="password"
          className="block mb-1 font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="w-full px-4 py-2 mb-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select Role:
          </label>
          <div>
            <label className="inline-flex items-center mr-6">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="team_member"
                checked={user.role === "team_member"}
                onChange={handleRoleChange}
              />
              <span className="ml-2">Team Member</span>
            </label>
            <br />
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="role"
                value="admin"
                checked={user.role === "admin"}
                onChange={handleRoleChange}
              />
              <span className="ml-2">Admin</span>
            </label>
          </div>
        </div>

        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className={`w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none ${
            buttonDisabled ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Signing up…" : "Signup"}
        </button>
      </div>
      <Link href="/login" className="text-blue-500 hover:underline mt-4">
        Already registered? Log in here
      </Link>
    </div>
  );
}
