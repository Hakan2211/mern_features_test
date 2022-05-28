import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostCard from "../../../Posts/PostList/PostCard/PostCard";
import "./categoryDetail.scss";

const CategoryDetail = () => {
  const { id } = useParams();

  const postList = useSelector((state) => state.posts.postLists);
  const categories = useSelector((state) => state.categories.categoryList);

  const category = categories?.filter((c) => c._id === id);

  const filteredPostByCategoryTitle = postList?.filter(
    (post) => post?.category === category[0]?.title
  );

  return (
    <div className="postList">
      {filteredPostByCategoryTitle?.map((post) => {
        return (
          <div className="postCard">
            <PostCard key={post._id} post={post} />
          </div>
        );
      })}
    </div>
  );
};

export default CategoryDetail;
