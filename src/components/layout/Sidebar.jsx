import React from "react";
import { LuLogOut } from "react-icons/lu";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { SiCoursera } from "react-icons/si";
// components

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const { course } = useSelector((state) => state);

  const name = localStorage.getItem("name");
  const username = JSON.parse(name);

  const handleLogout = async () => {
    try {
      localStorage.setItem("courses", JSON.stringify(course));
      localStorage.clear();
      const response = await signOut(auth);
      toast.success("User logged out successfully!");
      navigate("/login");
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <div>
      <div
        className="md:hidden fixed top-0 right-0 z-50 mr-3 mt-3"
        onClick={toggleSidebar}
      >
        <div className="w-6 h-6 relative">
          <RxHamburgerMenu className="h-6 w-6 text-black absolute top-3 left-0" />
        </div>
      </div>

      <div
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed inset-y-0 left-0 z-40 transition duration-300 ease-in-out 
        bg-[#cdced3] overflow-y-auto p-2 w-1/2 max-w-[20rem]  flex flex-col justify-start items-center min-h-screen`}
      >
        <div className=" w-full  flex justify-center items-center flex-col rounded-xl">
        <SiCoursera  className="text-5xl text-[#00067c] my-5"/>
        <h1 className="text-xl font-thin text-[#2f2e2e]">Online Course</h1>
        </div>
        <div className="flex flex-col justify-center space-y-8  font-semibold  text-center pt-10 w-full items-center" style={{transition: "all 1s ease"}}>
          <Link to="/" className="text-[#000000] hover:bg-gray-300 rounded block w-[90%] p-2">
            Home
          </Link>
          <Link to="/user/course/" className="text-[#000000] hover:bg-gray-300 rounded block w-[90%] p-2">
            My Courses
          </Link>
          <Link to="/profile" className="text-[#000000] hover:bg-gray-300 rounded block w-[90%] p-2">
            Profile
          </Link>
          
          <div className="flex absolute bottom-9 gap-3 hover:bg-gray-300 rounded  justify-center w-[90%] p-2" onClick={handleLogout}>
            Logout
            <LuLogOut
              
              className="h-6 text-black w-6 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
