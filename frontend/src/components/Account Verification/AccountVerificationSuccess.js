import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccountAction } from "../../redux/slices/accountVerification/accountVerificationSlices";
import "./accountVerficationSuccess.scss";

const AccountVerificationSuccess = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountVerification = useSelector((state) => state.accountVerification);
  const { isVerified } = accountVerification;
  const verifyId = useSelector((state) => state.users.userAuth);
  const { _id } = verifyId;

  useEffect(() => {
    dispatch(verifyAccountAction(id));
  }, [dispatch, id]);

  if (isVerified) {
    setTimeout(() => {
      navigate(`/profile/${_id}`);
    }, 2000);
  }

  return (
    <div className="verificationSuccess">
      <div className="verificationSuccess__container">
        <div className="verificationSuccess__container__text">
          Ihr Account wird verifiziert. Bitte warten...
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationSuccess;
