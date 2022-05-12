import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { accountVerificationSendToken } from "../../redux/slices/accountVerification/accountVerificationSlices";
import "./accountVerification.scss";

const AccountVerification = () => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(accountVerificationSendToken())}>
      Verifify your account
    </button>
  );
};

export default AccountVerification;
