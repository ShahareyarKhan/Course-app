import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../redux/slices/courseSlice";
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

export const useUserCourses = () => {
  const { user } = useSelector((state) => state.user);
  const userId = user?.uid;

  const [userCourses, setUserCourses] = useState([]);
  const dispatch = useDispatch();

  const getUserCourses = () => {
    try {
      // Fetch enrolled courses from local storage
      const enrolledCourses = JSON.parse(localStorage.getItem("enrolledCourses")) || [];
      
      // Filter courses that are in the enrolledCourses list
      const userCoursesData = courseModels.filter((course) => enrolledCourses.includes(course.id));

      // Set state with filtered courses
      setUserCourses(userCoursesData);

      // Optionally dispatch to Redux store
      dispatch(addCourse({ courses: userCoursesData }));
    } catch (err) {
      console.log("Error fetching user courses:", err);
    }
  };

  useEffect(() => {
    getUserCourses();
  }, [userId]); // Depend on userId to refetch if userId changes

  console.log(userCourses);
  return userCourses;
};