/* eslint-disable no-prototype-builtins */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import CourseData from "../components/course/CourseData";
import { useUserCourses } from "./userCourseData";
import { useSelector } from "react-redux";

const UserCourse = () => {

  const userCourses = useUserCourses();

  return (
    <div className="">
      <div className="max-w-[65rem] mt-10 mx-auto">
        <div className="text-[#5932EA] text-3xl font-bold mb-10 px-10 md:px-0">
          My Courses
        </div>
        {userCourses.length > 0 && (
          <div className="px-10 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-10">
            {userCourses.map((course) => (
              <CourseData key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCourse;
