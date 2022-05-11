import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { sendEmailAction } from "../../../../redux/slices/email/emailSlices";

const Email = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = useSelector((state) => state.email);
  const { isMailSent, loading, appError, serverError } = email;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: state.email, subject: "", message: "" },
  });
  const onSubmit = (data) => {
    // console.log(data);
    dispatch(sendEmailAction(data));
  };

  if (isMailSent) {
    navigate(`/profile/${state?.id}`);
  }
  return (
    <div className="register">
      <h1>Send Email</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <div className="text__container">
          <label>Recipient Email</label>
          <input
            name="email"
            ref={register}
            {...register("email")}
            type="email"
          />
        </div>

        <div className="text__container">
          <label>Subject</label>
          <input
            name="subject"
            ref={register}
            {...register("subject")}
            type="text"
          />
        </div>

        <div className="text__container">
          <label>Message</label>
          <input
            name="message"
            ref={register}
            {...register("message")}
            type="textarea"
          />
        </div>

        {/* Checking if loading */}
        {/* {loading ? (
              <button type="disabled">Loading...</button>
            ) : (
              <button type="submit">Submit</button>
            )} */}
        <button type="submit">Send Message</button>
      </form>

      {/* {appError || serverError ? (
            <div>
              {serverError} - {appError}
            </div>
          ) : null} */}
    </div>
  );
};

export default Email;
