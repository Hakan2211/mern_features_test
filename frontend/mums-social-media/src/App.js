import React from "react";
import "./scss/main.scss";

import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage/LandingPage";

import Header from "./components/Header/Header";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import Gallery from "./pages/Gallery/Gallery";
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

const App = () => {
  const user = useSelector((state) => state.users);
  const { userAuth } = user;
  return (
    <div className="app grid">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          element={
            <ProtectedRoutes isAllowed={!!userAuth} redirectPath={"/"} />
          }
        >
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
        </Route>
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/update-category/:id" element={<UpdateCategory />} />
      </Routes>
    </div>
  );
};

export default App;
