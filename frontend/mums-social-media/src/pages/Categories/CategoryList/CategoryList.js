import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, Navigate } from "react-router-dom";
import {
  fetchCategoriesAction,
  deleteCategoryAction,
} from "../../../redux/slices/categories/categoriesSlices";
import DateFormatter from "../../../utils/DateFormatter";
import Spinner from "../../../utils/Spinner";
import "./categoryList.scss";
import {
  MdOutlineModeEditOutline,
  MdDelete,
  MdAddCircle,
} from "react-icons/md";
import "./categoryList.scss";
import { fetchPostsAction } from "../../../redux/slices/posts/postSlices";

const CategoryList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories);
  const { categoryList, loading, appError, serverError, isDeleted } =
    categories;

  const user = useSelector((state) => state.users);
  const { userAuth } = user;

  const isLoginUser = userAuth?._id;

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    dispatch(fetchPostsAction());
    if (isDeleted) {
      navigate("/category-list", { replace: true });
    }
  }, [dispatch, isDeleted]);

  return (
    <div className="category">
      <Link className="category__cta__add" to="/add-category">
        <MdAddCircle className="category__cta__add__icon" />
        <span className="category__cta__add__text">Add Category</span>
      </Link>
      {loading ? (
        <Spinner />
      ) : appError || serverError ? (
        <h2>
          {serverError.message} - {appError}
        </h2>
      ) : categoryList?.length <= 0 ? (
        <h2>No category was found</h2>
      ) : (
        <div className="category-list__container">
          {categoryList?.map((category) => (
            <div className="category-list__card">
              <div className="category-list__card__header">
                <div className="category-list__card__header__userinfo">
                  <div className="category-list__card__header__userinfo__image-container">
                    <Link to={`/profile/${category?.user?._id}`}>
                      <img
                        className="category-list__card__header__userinfo__image-container__image"
                        src={category?.user?.profilePicture}
                        alt="category user"
                      />
                    </Link>
                  </div>
                  <div className="category-list__card__header__userinfo__right">
                    <div className="category-list__card__header__userinfo__name">
                      <p>{category?.user?.name}</p>
                    </div>
                    <DateFormatter date={category.createdAt} />
                  </div>
                </div>
                {isLoginUser === category?.user?._id ? (
                  <div className="category-list__card__header__userinfo__options">
                    <Link to={`/update-category/${category?._id}`}>
                      <MdOutlineModeEditOutline className="category-list__card__header__userinfo__options__update-icon" />
                    </Link>
                    <button
                      onClick={() =>
                        dispatch(deleteCategoryAction(category._id))
                      }
                    >
                      <MdDelete className="category-list__card__header__userinfo__options__delete-icon" />{" "}
                    </button>
                  </div>
                ) : null}
              </div>
              <Link to={`/category/${category._id}`}>
                <div className="category-list__card__image-container">
                  <img src={category?.image} alt="category_image" />
                </div>
              </Link>

              <div className="category-list__card__title">
                <h2>{category.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
