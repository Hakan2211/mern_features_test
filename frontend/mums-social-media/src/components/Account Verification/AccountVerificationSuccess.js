import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyAccountAction } from "../../redux/slices/accountVerification/accountVerificationSlices";

const AccountVerificationSuccess = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accountVerification = useSelector((state) => state.accountVerification);
  const {
    loading,
    appError,
    serverError,
    isVerified,
    // verified: { _id },
  } = accountVerification;
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

  return <div>AccountVerificationSuccess</div>;
};

export default AccountVerificationSuccess;
