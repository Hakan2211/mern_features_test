import React from "react";
import "./addCategory.scss";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../../redux/slices/categories/categoriesSlices";
import { useNavigate } from "react-router-dom";
import Dropzone from "../../../components/FormComponents/Dropzone/Dropzone";
import Spinner from "../../../components/Spinner/Spinner";

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
    dispatch(createCategoryAction(data));
  };
  return (
    <div className="add-category">
      <div className="add-category__container">
        <form
          className="add-category__container__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1>Kategorie hinzufügen</h1>
          <div className="add-category__container__form__text__container">
            <label>Kategorietitel</label>
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
            <span className="error-required-field">
              This field is required.
            </span>
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
                  label="Bild hochladen"
                  files={field.value ? [field.value] : []}
                />
              );
            }}
          />
          {loading ? (
            <button disabled className="add-category__button">
              <Spinner />
            </button>
          ) : (
            <button className="add-category__button">
              Kategorie bestätigen
            </button>
          )}
        </form>
      </div>

      {appError || serverError ? (
        <h2>
          {serverError.message} - {appError}
        </h2>
      ) : null}
    </div>
  );
};

export default AddCategory;
