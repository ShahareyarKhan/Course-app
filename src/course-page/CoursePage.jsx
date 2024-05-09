/* eslint-disable no-undef */
/* eslint-disable no-const-assign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription } from "../components/ui/card";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../lib/firebase";
import { doc, getDoc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import CourseSyllabus from "../components/course/CourseSyllabus";
import CoursePrerequistes from "../components/course/CoursePrerequisties";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";

const CoursePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [user] = useAuthState(auth);
  const { user } = useSelector((state) => state.user)
  const [course, setCourse] = useState({
    id: "",
    name: "",
    instructor: "",
    location: "",
    description: "",
    duration: "",
    thumbnail: "",
    enrollmentStatus: "",
    schedule: "",
    prerequisites: [],
    students: [],
    syllabus: [],
  });
  const getCourse = async () => {
    try {
      const courseDocRef = doc(db, "courses", params.id);
      const courseSnapshot = await getDoc(courseDocRef);

      const courseData = courseSnapshot.data();
      setCourse({
        id: courseData.id,
        name: courseData.name,
        instructor: courseData.instructor,
        location: courseData.location,
        description: courseData.description,
        duration: courseData.duration,
        thumbnail: courseData.thumbnail,
        enrollmentStatus: courseData.enrollmentStatus,
        schedule: courseData.schedule,
        prerequisites: courseData.prerequisites,
        students: courseData.students,
        syllabus: courseData.syllabus,
      });
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  const handleSubmit = async () => {
    try {
      const courseDocRef = doc(db, "courses", params.id);
      const courseSnapshot = await getDoc(courseDocRef);
      const latestStudents = courseSnapshot.data().students;
      const latestStudent = latestStudents[latestStudents.length - 1];
      const id = latestStudent ? latestStudent.id + 1 : 101;
      await updateDoc(courseDocRef, {
        students: arrayUnion({
          id: id,
          name: user.displayName,
          email: user.email,
        }),
      });

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(
        userDocRef,
        {
          courses: arrayUnion(course.id),
        },
        { merge: true }
      );
      toast.success("Enrolled to course successfully");
      navigate("/");
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  function getStatusColorClass(status) {
    switch (status) {
      case "Open":
        return "text-green-500";
      case "Closed":
        return "text-red-500";
      case "In Progress":
        return "text-yellow-500";
      default:
        return "";
    }
  }

  const [enrolled, setEnrolled] = useState(false);

  const isEnrolled = async () => {
    try {
      const isEnrolled = course.students.some(
        (student) => student.email === user.email
      );
      setEnrolled(isEnrolled);
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  useEffect(() => {
    isEnrolled();
  }, [course.students]);

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <main className="flex p-8 flex-col md:flex-row">
      <div className="md:w-3/4 pr-4">
        <Card className="p-2 rounded-xl bg-[#fff] space-y-8">
          {/* Course Description */}
          <div className="">
            <h1 className="text-2xl font-semibold text-[#5932EA]">
              Description
            </h1>
            <li className="text-black">{course.description}</li>
          </div>
          <CoursePrerequistes prerequisites={course.prerequisites} />
          <CourseSyllabus syllabus={course.syllabus} course={course} />
        </Card>
      </div>
      <div className="md:w-1/2">
        <Card className="p-2 rounded-xl bg-[#fff]">
          <img
            src={course.thumbnail}
            alt="course image"
            className="rounded-xl p-1"
          />
          <div className="text-2xl pl-5 py-3 font-semibold border-b-2 text-black">
            {course.name}
          </div>
          <CardDescription className="grid grid-cols-1 md:grid-cols-2 pt-2">
            <CardContent className="space-y-4">
              <div className="">
                <p className="font-semibold text-black">Duration</p>
                {course.duration}
              </div>
              <div className="">
                <p className="font-semibold text-black">Enrollment Status</p>
                <span className={getStatusColorClass(course.enrollmentStatus)}>
                  {course.enrollmentStatus}
                </span>
              </div>
            </CardContent>
            <CardContent className="space-y-4">
              <div className="">
                <p className="font-semibold text-black">Instructor</p>
                {course.instructor}
              </div>
              <div className="">
                <p className="font-semibold text-black">Location</p>
                {course.location}
              </div>
            </CardContent>
          </CardDescription>
          <div className="pl-5 pb-5">
            <p className="font-semibold text-black">Schedule</p>
            {course.schedule}
          </div>
          {!enrolled && (
            <button
              className="w-full rounded-lg p-2 bg-[#5932EA] text-[#fff] hover:bg-[#5002EA]"
              onClick={handleSubmit}
            >
              Enroll now
            </button>
          )}
        </Card>
      </div>
    </main>
  );
};

export default CoursePage;
