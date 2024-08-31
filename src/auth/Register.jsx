/* eslint-disable no-unused-vars */
"use client";
import { toast } from "sonner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../lib/firebase"; // Import the auth instance

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password } = userData;

    if (!username || !email || !password) {
      toast.error("All fields are required");
      return; // Prevent further execution
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return; // Prevent further execution
    }

    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(response.user, { displayName: username });
      toast.success("User created successfully!");
      navigate("/login");
    } catch (err) {
      console.log("Error: ", err);
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-[#fff]">
      <Card className="w-5/6 md:w-3/4 max-w-[500px] py-2 lg:py-4 rounded-xl text-white  flex justify-center items-center">
        <div className="w-full">
          <CardHeader className="lg:mb-5 flex justify-center items-center w-full">
            <CardTitle className="mb-2 text-[#5932EA] w-full text-center">Register</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center w-full">
              <div className="text-[#5932EA] grid items-center w-full gap-4">
                <div className="flex flex-col w-full space-y-2">
                  <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input
                      id="username"
                      type="text"
                      placeholder="Username"
                      className="mt-2 rounded-lg border border-zinc-500 p-2"
                      value={userData.username}
                      onChange={(e) =>
                        setUserData({ ...userData, username: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="text"
                      placeholder="Email address"
                      className="mt-2 rounded-lg border border-zinc-500 p-2"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Password"
                      className="mt-2 rounded-lg border border-zinc-500 p-2"
                      value={userData.password}
                      onChange={(e) =>
                        setUserData({ ...userData, password: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-[10rem] sm:w-full mt-6 rounded-lg p-2 bg-[#5932EA] text-[#fff]"
              >
                Register
              </button>
              <p className="text-xs text-center pt-2 text-[#5932EA]">
                Already have an account?{" "}
                <span className="text-[#5932EA]">
                  <Link to="/login">Login</Link>
                </span>
              </p>
            </form>
          </CardContent>
        </div>
      </Card>
    </main>
  );
};

export default Register;
