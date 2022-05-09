import React from "react";
import { useForm, Controller } from "react-hook-form";
import Dropzone from "../../../../components/FormComponents/Dropzone/Dropzone";

const UploadPhoto = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
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
