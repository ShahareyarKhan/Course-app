import React, { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";

const CourseData = ({ course }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userId = user ? user.uid : null;

  const [likes, setLikes] = useState(course.likes || []);

  const handleClick = () => {
    if (likes.includes(userId)) {
      setLikes(likes.filter((id) => id !== userId));
    } else {
      setLikes([...likes, userId]);
    }
  };

  return (
    <div className="">
      <Card className="shadow-md shadow-gray-400 w-full max-w-md rounded bg-[#fff]">
        <img
          alt="Card Image"
          className=" rounded-t  h-[200px] w-full object-fill"
          src={course.thumbnail}
        />
        <CardContent className="p-4 space-y-4">
          <CardTitle className="text-xl lg:text-2xl font-bold text-black">
            {course.name.slice(0, 20)}...
          </CardTitle>
          <p className="text-gray-500 dark:text-gray-400">
            {course.description.slice(0, 50)}...
          </p>
          <div className="flex justify-center items-center gap-x-2">
            <button
              onClick={() => navigate(`/course/${course.id}`)}
              className="w-full rounded-lg p-2 bg-[#5932EA] text-[#fff]"
            >
              View Course
            </button>
            <div className="flex justify-center items-center gap-x-2">
              <FaHeart
                className={`h-10 w-10 border rounded-lg p-2 shadow-lg hover:cursor-pointer ${
                  likes.includes(userId) ? "text-red-500" : ""
                }`}
                onClick={handleClick}
              />
              <span>{likes.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseData;
