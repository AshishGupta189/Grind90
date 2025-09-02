import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncupdateuser,
  asyncdeleteuser,
  asynclogoutuser
} from "../features/actions/userAction";

const ProfileUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducer);

  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    username: user?.username || "No user",
    email: user?.email || "abcd@example",
    password: "",
    image:
      user?.image || "https://www.freepik.com/free-photos-vectors/default-user",
  });
  console.log(userData);

  const fileInputRef = useRef(null);

  // File ko base64 me convert karne ka function
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setUserData({ ...userData, image: base64 });
    }
  };

  const handleSave = () => {
    let payload = {
      username: userData.username,
      email: userData.email,
      image: userData.image, // already base64
    };
    if (userData.password.trim() !== "") {
      payload.password = userData.password;
    }
    dispatch(asyncupdateuser(user.id, payload));
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your profile?")) {
      dispatch(asyncdeleteuser(user.id));
    }
  };

  return (
    <div className="w-screen mt-15 absolute z-2 min-h-[50vh] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-purple-500 to-pink-500 relative">
          <div className="relative w-28 h-28">
            <img
              className="w-full h-full object-cover rounded-full border-4 border-white shadow-md"
              src={userData.image}
              alt="profile"
            />
            {isEditing && (
              <>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow hover:scale-110 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5 text-purple-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 text-white">
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="bg-white text-black rounded px-2 py-1 w-full mb-2 focus:outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="bg-white text-black rounded px-2 py-1 w-full mb-2 focus:outline-none"
                />
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="bg-white text-black rounded px-2 py-1 w-full focus:outline-none"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{userData.username}</h2>
                <p className="opacity-90">{userData.email}</p>
                <p className="opacity-75">•••••••</p>
              </>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 p-6 bg-gray-50">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Edit Profile
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Delete Profile
              </button>
            </>
          )}
          <button
            onClick={() => dispatch(asynclogoutuser(user.id))}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
