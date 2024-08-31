/* eslint-disable no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getAuth, updateProfile } from "firebase/auth";
import { app } from "../lib/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

const Profile = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = () => {
      const currentUser = auth.currentUser;
      console.log(currentUser);
      if (currentUser) {
        setUser(currentUser);
        setDisplayName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
        setLoading(false);

      } else {
        navigate("/login");
      }
    };
    fetchUser();
  }, [auth, navigate]);


  if (loading) return <p>Loading...</p>;

  return (
    <main className="flex justify-center items-center h-screen ">
      <div className="w-5/6 md:w-3/4 max-w-[500px] py-2 lg:py-4 rounded-xl ">
        <h1 className="text-[#5932EA] text-center text-3xl mb-6 font-semibold">Profile</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label htmlFor="displayName" className="text-[#5932EA]">Username</label>
            <div id="displayName">
                {displayName}
            </div>
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="email" className="text-[#5932EA]">Email</label>
            <div>
                {email}
            </div>

          </div>
          <Link to="/" className="text-center py-9">Home</Link>
          
        </div>
      </div>
    </main>
  );
};

export default Profile;
