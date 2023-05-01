import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Analytics } from "@vercel/analytics/react";
import { PostDetail, CreatePost, Home, Profile, Login, Register, Logout } from "./pages";
import { Sidebar, Navbar } from "./components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post-detail/:id" element={<PostDetail />} />
          {/* <Route path="/" element={isAuth ? <HomePage /> : <LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              /> */}
        </Routes>
      </div>
      
      {/* notification */}
      <ToastContainer />

      {/* vercel analytics */}
      <Analytics />
    </div>
  );
}

export default App;
