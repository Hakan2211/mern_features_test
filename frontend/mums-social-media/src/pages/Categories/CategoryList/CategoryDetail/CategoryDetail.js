import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostCard from "../../../Posts/PostList/PostCard/PostCard";
import "./categoryDetail.scss";

const CategoryDetail = () => {
  const { id } = useParams();

  const postList = useSelector((state) => state.posts.postLists);
  const categories = useSelector((state) => state.categories.categoryList);

  const postListId = postList?.map((post) => post._id);
  const categoriesId = categories?.map((category) => category._id);

  // ------------------------------------------------------------------------------------------------------------------------
  //  Looping over post and inside category // bad idea because time expensive image you are looping over a giant array
  // ---------------------------------------------------------------------------------------------------------------------------
  //  for (let i = 0; i < postList.length; i++) {
  //     for (let j = 0; j < categories[i].length; j++) {
  //       return postList._id === categories?._id;
  //     }
  //   }

  //return (
  //<div className="postList">

  const filteredPost = postList?.filter((post) => {
    console.log(post, "categorydetail");
    return post?._id === id;
  });
  console.log(filteredPost, "filtered");

  //   {
  //     {
  //       postList?.map((post) => {
  //         return (
  //           <div className="postCard">
  //             <PostCard key={post._id} post={post} />
  //           </div>
  //         );
  //       });
  //     }
  //     // </div>
};

export default CategoryDetail;
