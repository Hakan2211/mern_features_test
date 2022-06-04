import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Dropzone from "../../../../components/FormComponents/Dropzone/Dropzone";
import { uploadProfilePhotoAction } from "../../../../redux/slices/users/usersSlices";
import "./uploadPhoto.scss";

const UploadPhoto = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users);
  const { profilePhoto } = user;

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
    <div className="upload-photo">
      <div className="upload-photo__container">
        <form
          className="upload-photo__container__form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="upload-photo__container__form__title">
            Profilbild hochladen
          </h1>
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
          <button
            className="upload-photo__container__form__button"
            type="submit"
          >
            Bestätigen
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPhoto;
