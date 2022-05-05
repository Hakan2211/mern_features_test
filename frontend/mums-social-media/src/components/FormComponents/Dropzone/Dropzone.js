import React, { useEffect, useCallback } from "react";
import "./dropzone.scss";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { MdClose } from "react-icons/md";

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
    <>
      <label className=" " htmlFor={name}>
        {label}
      </label>
      <div
        {...getRootProps()}
        type="file"
        role="button"
        aria-label="File Upload"
        id={name}
      >
        <input {...props} {...getInputProps()} />
        <div
          style={{ width: "500px", border: "black solid 2px" }}
          className={" " + (isDragActive ? " " : " ")}
        >
          <p className=" ">Drop the files here ...</p>

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
    </>
  );
};

export default Dropzone;
