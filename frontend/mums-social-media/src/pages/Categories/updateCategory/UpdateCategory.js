import React, { useEffect, useState } from "react";
import "./updateCategory.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryAction,
  updateCategoryAction,
} from "../../../redux/slices/categories/categoriesSlices";
import { useNavigate, useParams } from "react-router-dom";
import Dropzone from "../../../components/FormComponents/Dropzone/Dropzone";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state?.categories);
  const { loading, appError, serverError, category, isEdited } = categories;

  const [defaultValue, setDefaultValue] = useState("");

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
    if (category) {
      setDefaultValue(category?.title);
    }
    if (isEdited) {
      navigate("/category-list", { replace: true });
    }
  }, [dispatch, isEdited, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(updateCategoryAction({ title: data.title, id }));
  };
  return (
    <div className="update-category">
      <h1>Update Category</h1>
      <form className="update-category__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="text__container">
          <label>Update Category</label>
          <input
            name="title"
            ref={register}
            {...register("title", {
              required: "Please enter a new category.",
            })}
            type="text"
            defaultValue={defaultValue}
          />
        </div>
        {errors.title && (
          <span className="error-required-field">This field is required.</span>
        )}

        <Dropzone
          onSubmit={onSubmit}
          name="file alt text"
          label="File Upload"
        />

        {loading ? (
          <button disabled className="update-category__button">
            Loading...
          </button>
        ) : (
          <button className="update-category__button">Update Category</button>
        )}
      </form>

      {appError || serverError ? (
        <h2>
          {serverError.message} - {appError}
        </h2>
      ) : null}
    </div>
  );
};

export default UpdateCategory;
