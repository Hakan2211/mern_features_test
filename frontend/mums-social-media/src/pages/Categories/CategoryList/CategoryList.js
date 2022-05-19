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
import "./categoryList.scss";

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
    <div className="category">
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
                <div className="category-list__card__header__userinfo__options">
                  <Link to={`/update-category/${category?._id}`}>
                    <MdOutlineModeEditOutline className="category-list__card__header__userinfo__options__update-icon" />
                  </Link>
                  <button
                    onClick={() => dispatch(deleteCategoryAction(category._id))}
                  >
                    <MdDelete className="category-list__card__header__userinfo__options__delete-icon" />{" "}
                  </button>
                </div>
              </div>

              <div className="category-list__card__image-container">
                <img src={category?.image} alt="category_image" />
              </div>
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
