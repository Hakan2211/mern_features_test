import React from "react";
import "./dropzone.scss";

import { useDropzone } from "react-dropzone";
import { MdFileUpload } from "react-icons/md";
import "./dropzone.scss";

const Dropzone = (props) => {
  const { name, label, files = [], onChange } = props;
  // const {
  //   register,
  //   unregister,

  //   setValue,
  //   watch,
  //   formState: { errors },
  // } = useForm();

  // const files = watch(name);

  // const onDrop = useCallback(
  //   (droppedFiles) => {
  //     setValue(name, droppedFiles, { shouldValidate: true });
  //   },
  //   [setValue, name]
  // );

  const onDrop = (files) => {
    console.log("on drop", files);
    onChange(files);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
      "image/gif": [],
    },
  });
  // useEffect(() => {
  //   register(name);
  //   return () => {
  //     unregister(name);
  //   };
  // }, [register, unregister, name]);

  return (
    <div className="dropzone">
      <label className="dropzone__label" htmlFor={name}>
        {label}
      </label>
      <div
        {...getRootProps()}
        type="file"
        role="button"
        aria-label="File Upload"
        id={name}
        className="dropzone__area"
      >
        <input {...props} {...getInputProps()} />
        <div className={"dropzone__input" + (isDragActive ? " active " : " ")}>
          <MdFileUpload className="dropzone__input__icon" />
          <p className="dropzone__input__text">
            Bild kleiner als 5MB hochladen
          </p>

          {!!files?.length && (
            <div className=" ">
              {files.map((file) => {
                return (
                  <div key={file.name}>
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      style={{
                        height: "200px",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;
