/* eslint-disable no-unused-vars */
"use client";

import { toast } from "sonner";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { addCourse } from "../redux/slices/courseSlice";

const Login = () => {
  const dispatch = useDispatch()
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = userData.email;
    const password = userData.password;

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const storedUserCourses = localStorage.getItem('courses');
      if (storedUserCourses) {
        // Parse stored data and initialize Redux state with it
        dispatch(addCourse(JSON.parse(storedUserCourses)));
      }
      toast.success("User logged in successfully!");
      navigate('/');
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen bg-[#fff]">
      <Card className="w-3/4 sm:w-1/3 py-2 lg:py-4 rounded-xl text-white  shadow-2xl flex justify-center items-center">
        <div className="">
          <CardHeader className="lg:mb-5 flex justify-center items-center ">
            <CardTitle className="mb-2 text-[#5932EA]">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="text-[#5932EA] lg:w-[25rem] grid items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col">
                    <label htmlFor="name">Email</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Email address"
                      className="mt-2 rounded-lg border border-zinc-500 p-2"
                      value={userData.email}
                      onChange={(e) => setUserData({...userData, email: e.target.value})}
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
                      onChange={(e) => setUserData({...userData, password: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className=" flex flex-col space-y-2 justify-center items-center">
            <button
              onClick={handleSubmit}
              className="w-full rounded-lg p-2 bg-[#5932EA] text-[#fff]"
            >
              Login
            </button>
            <p className="text-xs text-[#5932EA]">
              Don&apos;t have an account?{" "}
              <span className="text-[#5932EA]">
                <Link to="/register">Register</Link>
              </span>
            </p>
          </CardFooter>
        </div>
      </Card>
    </main>
  );
};

export default Login;
