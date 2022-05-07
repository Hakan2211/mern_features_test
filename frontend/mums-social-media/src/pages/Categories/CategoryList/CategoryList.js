import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchCategoriesAction,
  deleteCategoryAction,
} from "../../../redux/slices/categories/categoriesSlices";
import DateFormatter from "../../../utils/DateFormatter";
import Spinner from "../../../utils/Spinner";
import "./categoryList.scss";
import { MdOutlineModeEditOutline, MdDelete } from "react-icons/md";

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories);
  const { categoryList, loading, appError, serverError, isDeleted } =
    categories;

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    if (isDeleted) {
      navigate("/category-list", { replace: true });
    }
  }, [dispatch, isDeleted]);

  return (
    <div>
      <h2>Categories</h2>
      {loading ? (
        <Spinner />
      ) : appError || serverError ? (
        <h2>
          {serverError.message} - {appError}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2>No category was found</h2>
      ) : (
        categoryList?.map((category) => (
          <>
            <h2>{category.title}</h2>
            <p>
              <DateFormatter date={category.createdAt} />
            </p>

            <p>{category.user.name}</p>
            <Link to={`/update-category/${category?._id}`}>
              <MdOutlineModeEditOutline /> Update
            </Link>

            <img src={category?.image} alt="category_image" />

            <button
              onClick={() => dispatch(deleteCategoryAction(category._id))}
            >
              <MdDelete /> Delete
            </button>
          </>
        ))
      )}
    </div>
  );
};

export default CategoryList;
