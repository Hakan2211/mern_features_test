import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Dropzone from "../../../../components/FormComponents/Dropzone/Dropzone";
import { uploadProfilePhotoAction } from "../../../../redux/slices/users/usersSlices";

const UploadPhoto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users);
  const { profilePhoto, loading, appError, serverError } = user;

  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    dispatch(uploadProfilePhotoAction(data));
  };

  useEffect(() => {
    if (profilePhoto) {
      navigate(-1);
    }
  }, [profilePhoto]);

  return (
    <div>
      <h1>UploadPhoto</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadPhoto;
