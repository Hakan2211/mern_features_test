import React from "react";
import "./scss/main.scss";

import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";

import Header from "./components/Header/Header";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Gallery from "./pages/Gallery/Gallery";
import Footer from "./components/Footer/Footer";

//------------------------------
//Auth
//------------------------------
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";
import Logout from "./pages/Auth/Logout/Logout";
//------------------------------
//Category
//------------------------------
import AddCategory from "./pages/Categories/addCategory/AddCategory";
import CategoryList from "./pages/Categories/CategoryList/CategoryList";
import UpdateCategory from "./pages/Categories/updateCategory/UpdateCategory";
import CategoryDetail from "./pages/Categories/CategoryList/CategoryDetail/CategoryDetail";
//------------------------------
//ProtectedRoutes
//------------------------------
import ProtectedRoutes from "./components/Navigation/ProtectedRoutes/ProtectedRoutes";
import { useSelector } from "react-redux";
//------------------------------
//Posts
//------------------------------
import CreatePost from "./pages/Posts/createPost/createPost";
import PostList from "./pages/Posts/PostList/PostList";
import PostDetail from "./pages/Posts/PostList/PostDetail/PostDetail";
import UpdatePost from "./pages/Posts/PostList/UpdatePost/UpdatePost";
//------------------------------
//Comments
//------------------------------
import UpdateComment from "./components/Comments/UpdateComment";

//------------------------------
//Users
//------------------------------
import Profile from "./pages/Users/Profile/Profile";
import UploadPhoto from "./pages/Users/Profile/UploadPhoto/UploadPhoto";
import UpdateProfile from "./pages/Users/Profile/UpdateProfile/UpdateProfile";
import Email from "./pages/Users/Profile/Email/Email";
import AccountVerificationSuccess from "./components/Account Verification/AccountVerificationSuccess";
import UpdatePassword from "./pages/Auth/UpdatePassword/UpdatePassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import ResetPasswordToken from "./pages/Auth/ResetPassword/ResetPasswordToken";

const App = () => {
  const user = useSelector((state) => state.users);
  const { userAuth } = user;
  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* <Route
          element={
            <ProtectedRoutes isAllowed={!!userAuth} redirectPath={"/profile"} />
          }
        >
         
        </Route> */}
          <Route
            element={
              <ProtectedRoutes isAllowed={!!userAuth} redirectPath={"/"} />
            }
          >
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/send-email" element={<Email />} />
            <Route path="/update-password" element={<UpdatePassword />} />
            <Route path="/update-post/:id" element={<UpdatePost />} />
            <Route path="/update-comment/:id" element={<UpdateComment />} />
            <Route path="/upload-photo/:id" element={<UploadPhoto />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
            <Route
              path="/verify-account/:id"
              element={<AccountVerificationSuccess />}
            />
          </Route>

          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:id" element={<ResetPasswordToken />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/category-list" element={<CategoryList />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/update-category/:id" element={<UpdateCategory />} />
        </Routes>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default App;
