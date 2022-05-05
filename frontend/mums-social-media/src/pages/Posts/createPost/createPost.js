import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlices";
import { createPostAction } from "../../../redux/slices/posts/postSlices";
import "./createPost.scss";
import SelectDropdown from "../../../components/FormComponents/SelectDropdown/Select";
import Dropzone from "../../../components/FormComponents/Dropzone/Dropzone";
import { useNavigate } from "react-router-dom";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CreatePost = () => {
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categories);
  const post = useSelector((state) => state.posts);
  const { isCreated, loading, appError, serverError } = post;
  const { categoryList } = category;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
    if (isCreated) {
      navigate("/posts");
    }
  }, [dispatch, isCreated]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { title: "", description: "", image: null, categories: [] },
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUnregister: true,
  });

  //----------------------------------------------------------------
  // Fetching Categories from Redux Store
  //----------------------------------------------------------------
  const allCategories = categoryList?.map((categoryItem) => {
    return categoryItem.title;
  });

  useEffect(() => {
    (async () => {
      await sleep(50);
      setValue("categories", allCategories, { shouldValidate: true });
      reset({ categories: allCategories });
    })();
  }, []);

  const values = watch();
  console.log("form", values);
  const onSubmit = (data) => {
    const payload = {
      category: data?.categories?.value,
      title: data?.title,
      description: data?.description,
      image: data?.image,
    };
    console.log("on submit", payload);
    dispatch(createPostAction(payload));
  };

  return (
    <div className="create-post">
      <h1>Create a post</h1>
      <form className="create-post__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="text__container">
          <label>title</label>
          <input
            name="title"
            ref={register}
            {...register("title", {
              required: "Please enter a title.",
            })}
            type="text"
          />
        </div>
        {errors.title && (
          <span className="error-required-field">This field is required.</span>
        )}

        {/* //---------------------------------------------------------------- */}
        {/* // Category Dropdown */}
        {/* //---------------------------------------------------------------- */}

        <SelectDropdown
          name={"categories"}
          label={"Category"}
          control={control}
          values={allCategories}
        />

        <div className="text__container">
          <label>description</label>
          <input
            name="description"
            ref={register}
            {...register("description", {
              required: "Please enter your post description.",
            })}
            type="text"
          />
        </div>
        {errors.description && (
          <span className="error-required-field">This field is required.</span>
        )}

        {/* /------------------------------------------------ */}
        {/* /-------------------Image Upload----------------- */}
        {/* /------------------------------------------------ */}
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
          <button disabled className="create-post__button">
            Loading...
          </button>
        ) : (
          <button type="submit" className="create-post__button">
            Create Post
          </button>
        )}

        {appError || serverError ? (
          <p>
            {serverError} - {appError}
          </p>
        ) : null}
      </form>
    </div>
  );
};

export default CreatePost;
