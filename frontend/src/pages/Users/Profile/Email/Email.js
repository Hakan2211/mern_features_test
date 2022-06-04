import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { sendEmailAction } from "../../../../redux/slices/email/emailSlices";
import "./email.scss";

const Email = () => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const navigate = useNavigate();

  const email = useSelector((state) => state.email);
  const { isMailSent } = email;

  const { register, handleSubmit } = useForm({
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
    <div className="send-mail">
      <div className="send-mail__container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="send-mail__container__form"
        >
          <h1 classname="send-mail__container__form__title">Send Email</h1>
          <div className="send-mail__container__form__text__container">
            <label>Recipient Email</label>
            <input
              name="email"
              ref={register}
              {...register("email")}
              type="email"
            />
          </div>

          <div className="send-mail__container__form__text__container">
            <label>Subject</label>
            <input
              name="subject"
              ref={register}
              {...register("subject")}
              type="text"
            />
          </div>

          <div className="send-mail__container__form__message__container">
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
          <button className="send-mail__container__form__button" type="submit">
            Send Message
          </button>
        </form>

        {/* {appError || serverError ? (
            <div>
              {serverError} - {appError}
            </div>
          ) : null} */}
      </div>
    </div>
  );
};

export default Email;
