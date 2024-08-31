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

const courseModels = [
  {
    id: 1, // Unique identifier for the course
    name: 'Introduction to React Native',
    instructor: 'John Doe', // Name of the course instructor
    description: 'Learn the basics of React Native development and build your first mobile app.',
    enrollmentStatus: 'Open', // Can be 'Open', 'Closed', or 'In Progress'
    thumbnail: 'https://i.ytimg.com/vi/b9eMGE7QtTk/maxresdefault.jpg', // Link to the course thumbnail
    duration: '8 weeks', // Duration of the course
    schedule: 'Tuesdays and Thursdays, 6:00 PM-8:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to React Native',
        content: 'Overview of React Native, setting up your development environment.'
      },
      {
        week: 2,
        topic: 'Building Your First App',
        content: 'Creating a simple mobile app using React Native components.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 101,
        name: 'Alice Johnson',
        email: 'alice@example.com'
      },
      {
        id: 102,
        name: 'Bob Smith',
        email: 'bob@example.com'
      },
    ]
  },
  {
    id: 2,
    name: 'Advanced JavaScript',
    instructor: 'Jane Doe',
    description: 'Master the advanced concepts of JavaScript, including ES6+ features and asynchronous programming.',
    enrollmentStatus: 'Closed',
    thumbnail: 'https://i.ytimg.com/vi/0JZmqDseqHw/maxresdefault.jpg',
    duration: '6 weeks',
    schedule: 'Mondays and Wednesdays, 7:00 PM-9:00 PM',
    location: 'Online',
    prerequisites: ['Basic JavaScript knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Deep Dive into ES6+',
        content: 'Learn about the latest features in JavaScript, including let, const, and arrow functions.'
      },
      {
        week: 2,
        topic: 'Asynchronous Programming',
        content: 'Understanding promises, async/await, and working with APIs.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 201,
        name: 'Charlie Brown',
        email: 'charlie@example.com'
      },
      {
        id: 202,
        name: 'David Wilson',
        email: 'david@example.com'
      },
    ]
  },
  {
    id: 3,
    name: 'Full Stack Web Development',
    instructor: 'Michael Scott',
    description: 'Become a full-stack developer by learning both frontend and backend technologies.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://ittrainingclasses.in/images/1.png',
    duration: '12 weeks',
    schedule: 'Fridays, 6:00 PM-10:00 PM',
    location: 'Online',
    prerequisites: ['Basic HTML/CSS knowledge', 'JavaScript'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Full Stack Development',
        content: 'Understanding the stack, introduction to frontend and backend technologies.'
      },
      {
        week: 2,
        topic: 'Frontend Development',
        content: 'Building responsive UIs with HTML, CSS, and JavaScript.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 301,
        name: 'Emily Davis',
        email: 'emily@example.com'
      },
      {
        id: 302,
        name: 'Frank Harris',
        email: 'frank@example.com'
      },
    ]
  },
  {
    id: 4,
    name: 'Machine Learning Basics',
    instructor: 'Sarah Connor',
    description: 'Introduction to machine learning concepts, algorithms, and hands-on projects.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://th.bing.com/th/id/OIP.x7x00uSQKqQKlu3VpAnAOgHaEK?rs=1&pid=ImgDetMain',
    duration: '10 weeks',
    schedule: 'Wednesdays, 6:00 PM-9:00 PM',
    location: 'Online',
    prerequisites: ['Basic Python knowledge', 'Statistics'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Machine Learning',
        content: 'Overview of machine learning, types of learning, and setting up your environment.'
      },
      {
        week: 2,
        topic: 'Supervised Learning',
        content: 'Understanding supervised learning algorithms, including linear regression and decision trees.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 401,
        name: 'George King',
        email: 'george@example.com'
      },
      {
        id: 402,
        name: 'Helen White',
        email: 'helen@example.com'
      },
    ]
  },
  {
    id: 5,
    name: 'Data Structures and Algorithms',
    instructor: 'Alan Turing',
    description: 'Learn fundamental data structures and algorithms to ace coding interviews.',
    enrollmentStatus: 'In Progress',
    thumbnail: 'https://th.bing.com/th/id/OIP.w9HV-lTyk5CEtm6Qs7anMQHaH1?rs=1&pid=ImgDetMain',
    duration: '8 weeks',
    schedule: 'Tuesdays and Thursdays, 6:00 PM-8:00 PM',
    location: 'Online',
    prerequisites: ['Basic programming knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to Data Structures',
        content: 'Understanding arrays, linked lists, stacks, and queues.'
      },
      {
        week: 2,
        topic: 'Sorting and Searching Algorithms',
        content: 'Implementation and analysis of sorting algorithms like quicksort, mergesort, and binary search.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 501,
        name: 'Irene Walker',
        email: 'irene@example.com'
      },
      {
        id: 502,
        name: 'Jack Turner',
        email: 'jack@example.com'
      },
    ]
  },
  {
    id: 6,
    name: 'UI/UX Design Principles',
    instructor: 'Grace Hopper',
    description: 'Learn the principles of UI/UX design and create user-friendly interfaces.',
    enrollmentStatus: 'Open',
    thumbnail: 'https://blogct.creative-tim.com/blog/content/images/2022/07/UX-design-courses.jpg',
    duration: '5 weeks',
    schedule: 'Mondays, 5:00 PM-7:00 PM',
    location: 'Online',
    prerequisites: ['Basic design knowledge'],
    syllabus: [
      {
        week: 1,
        topic: 'Introduction to UI/UX Design',
        content: 'Understanding the importance of user experience and interface design.'
      },
      {
        week: 2,
        topic: 'Designing for Users',
        content: 'Creating user personas and wireframes, and understanding user journeys.'
      },
      // Additional weeks and topics...
    ],
    students: [
      {
        id: 601,
        name: 'Kevin Young',
        email: 'kevin@example.com'
      },
      {
        id: 602,
        name: 'Laura Moore',
        email: 'laura@example.com'
      },
    ]
  },
];

const CoursePage = () => {
  const params = useParams();
  console.log(params.id);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
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
      const crse = courseModels.find((course) => course.id === parseInt(params.id));
      setCourse(crse);
    } catch (err) {
      console.log("Error: ", err);
    }
  };


  const handleSubmit = async () => {
    try {
      // Find the index of the course the user is enrolling in
      const courseIndex = courseModels.findIndex((course) => course.id === parseInt(params.id));

      if (courseIndex !== -1) {
        // Get the latest student list from the course
        const latestStudents = courseModels[courseIndex].students || [];
        const latestStudent = latestStudents[latestStudents.length - 1];

        // Create a new ID for the new student, incrementing from the last student ID
        const newId = latestStudent ? latestStudent.id + 1 : 101;

        // Add the new student to the course's student list
        courseModels[courseIndex].students.push({
          id: newId,
          name: user.displayName,
          email: user.email,
        });

        // Update the local course state to reflect the new student
        setCourse({ ...courseModels[courseIndex] });

        // Retrieve any courses the user is already enrolled in from local storage
        let enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];

        // Add the new course ID to the list of enrolled courses
        enrolledCourses.push(courseModels[courseIndex].id);

        // Save the updated list of enrolled courses back to local storage
        localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));

        // Show a success message to the user
        toast.success("Enrolled to course successfully");

        // Navigate the user back to the homepage or another appropriate page
        navigate("/");
      }
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
    if (course.students.length > 0) {
      isEnrolled();
    }
  }, [course.students]);
  useEffect(() => {
    getCourse();
  }, []);

  return (
    <main className="flex p-8 flex-col md:flex-row">
      <div className="md:w-3/4 pr-4">
        <div className="text-3xl my-5 text-center py-3 font-semibold border-b-2 text-black">
          {course.name}
        </div>
        <Card className=" rounded-xl bg-[#fff] space-y-8">
          {/* Course Description */}
          <div className="">
            <h1 className="text-xl font-semibold text-[#5932EA]">
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
