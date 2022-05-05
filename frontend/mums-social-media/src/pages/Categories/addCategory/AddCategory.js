import React from "react";
import "./addCategory.scss";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../../redux/slices/categories/categoriesSlices";
import { useNavigate } from "react-router-dom";
import Dropzone from "../../../components/FormComponents/Dropzone/Dropzone";

const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const category = useSelector((state) => state?.categories);
  const { loading, appError, serverError, isCreated } = category;

  if (isCreated) {
    navigate("/category-list", { replace: true });
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("submit", data);
    dispatch(createCategoryAction(data));
  };
  return (
    <div className="add-category">
      <h1>Add Category</h1>
      <form className="add-category__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="text__container">
          <label>Add Category</label>
          <input
            name="title"
            ref={register}
            {...register("title", {
              required: "Please enter a new category.",
            })}
            type="text"
          />
        </div>
        {errors.title && (
          <span className="error-required-field">This field is required.</span>
        )}
        {/* //---------------------------------------------------------------- */}
        {/* //-----------------------------Dropzone---------------------------- */}
        {/* //---------------------------------------------------------------- */}

        <Controller
          name="image"
          control={control}
          render={({ field }) => {
            return (
              <Dropzone
                onChange={(files) => field.onChange(files?.[0])}
                name="file alt text"
                label="File Upload"
                files={field.value ? [field.value] : []}
              />
            );
          }}
        />
        {loading ? (
          <button disabled className="add-category__button">
            Loading...
          </button>
        ) : (
          <button className="add-category__button">Add Category</button>
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

export default AddCategory;
