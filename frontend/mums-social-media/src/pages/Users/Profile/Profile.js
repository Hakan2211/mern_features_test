import React, { useEffect } from "react";
import "./profile.scss";
import {
  followUserAction,
  unfollowUserAction,
  userProfileAction,
} from "../../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormmater from "../../../utils/DateFormatter";
import { Link, useNavigate, useParams } from "react-router-dom";
import AccountVerification from "../../../components/Account Verification/AccountVerification";
import AccountVerificationSuccess from "../../../components/Account Verification/AccountVerificationSuccess";
import {
  IoCheckmarkCircle,
  IoCloseCircle,
  IoMailOutline,
} from "react-icons/io5";
import { MdFileUpload } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import PostCard from "../../Posts/PostList/PostCard/PostCard";

const Profile = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users);
  const {
    profile,
    loading,
    appError,
    serverError,
    userAuth,
    followed,
    unfollowed,
  } = user;

  const account = useSelector((state) => state?.accountVerification);
  const {
    loading: verificationLoading,
    appError: verificationAppError,
    serverError: verificationServerError,
    token,
  } = account;

  const sendMailHandler = () => {
    navigate("/send-email", {
      state: { email: profile?.email, id: profile?._id },
    });
  };

  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [dispatch, id, followed, unfollowed]);

  const isLoginUser = userAuth?._id === profile?._id;
  console.log(isLoginUser);
  return (
    <div className="userprofile">
      <div className="userprofile__container">
        {loading ? (
          <h1>Loading...</h1>
        ) : appError || serverError ? (
          <h1>
            {serverError} - {appError}
          </h1>
        ) : (
          <>
            <div className="userprofile__container__header">
              <div className="userprofile__container__header__picture">
                <img src={profile?.profilePicture} alt="profilePicture" />
                {isLoginUser ? (
                  <Link to={`/upload-photo/${profile?._id}`}>
                    <div className="userprofile__container__header__picture__upload">
                      <MdFileUpload className="userprofile__container__header__picture__upload__icon" />

                      {/* <button className="userprofile__container__header__picture__upload__button">
                        Upload Photo
                      </button> */}
                    </div>{" "}
                  </Link>
                ) : null}
                {isLoginUser ? (
                  <Link to={`/update-profile/${profile?._id}`}>
                    <div className="userprofile__container__header__picture__update">
                      <MdOutlineModeEditOutline className="userprofile__container__header__picture__update__icon" />

                      {/* <button className="userprofile__container__header__picture__upload__button">
                        Upload Photo
                      </button> */}
                    </div>
                  </Link>
                ) : null}
              </div>
              <div className="userprofile__container__header__info">
                <div className="userprofile__container__header__info__verification">
                  <div className="userprofile__container__header__info__verification__info">
                    {profile?.isAccountVerified ? (
                      <div className="userprofile__container__header__info__verification__info__container">
                        <div className="userprofile__container__header__info__verification__info__container__icon-verified">
                          <IoCheckmarkCircle />
                        </div>
                        <div className="userprofile__container__header__info__verification__info__container__text-verified">
                          Verified
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="userprofile__container__header__info__verification__info__container__icon-unverified">
                          <IoCloseCircle />
                        </div>
                        <div className="userprofile__container__header__info__verification__info__container__text-unverified">
                          Unverified
                        </div>
                      </>
                    )}
                  </div>
                  {!profile?.isAccountVerified && isLoginUser ? (
                    <div className="userprofile__container__header__info__verification__button__container">
                      <button className="userprofile__container__header__info__verification__button">
                        Verify your Account
                      </button>
                    </div>
                  ) : null}
                </div>
                <div className="userprofile__container__header__info__data">
                  <div className="userprofile__container__header__info__data__name">
                    {profile?.name}
                  </div>
                  <div className="userprofile__container__header__info__data__joined">
                    Joined since: <DateFormmater date={profile?.createdAt} />
                  </div>
                </div>
                <div className="userprofile__container__header__info__follow-container">
                  {!isLoginUser && profile?.isFollowing ? (
                    <div
                      classname="userprofile__container__header__info__follow-container__unfollow"
                      onClick={() => dispatch(unfollowUserAction(id))}
                    >
                      <div className="userprofile__container__header__info__follow-container__unfollow__icon">
                        <RiUserUnfollowLine />
                      </div>

                      <div className="userprofile__container__header__info__follow-container__unfollow__text">
                        Unfollow
                      </div>
                    </div>
                  ) : (
                    <div
                      classname="userprofile__container__header__info__follow-container__follow"
                      onClick={() => dispatch(followUserAction(id))}
                    >
                      <div className="userprofile__container__header__info__follow-container__follow__icon">
                        <RiUserFollowLine />
                      </div>

                      <div className="userprofile__container__header__info__follow-container__follow__text">
                        Follow
                      </div>
                    </div>
                  )}
                </div>
                <div className="userprofile__container__header__info__message-container">
                  <div className="userprofile__container__header__info__message-container__icon">
                    <IoMailOutline />
                  </div>
                  <div
                    className="userprofile__container__header__info__message-container__button"
                    onClick={sendMailHandler}
                  >
                    <div className="userprofile__container__header__info__message-container__button__text">
                      Send Message
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="userprofile__container__posts">
          <h1 className="userprofile__container__posts__title">
            {profile?.posts.length === 1
              ? "Post"
              : profile?.posts.length === 0
              ? "No Post was found"
              : "My Gallery"}
          </h1>
          <div className="userprofile__container__posts__container">
            {profile?.posts.map((post) => {
              return <PostCard post={post} />;
            })}
          </div>
        </div>
      </div>
      <div className="userprofile__followers__container">
        <div className="userprofile__followers__container__followers"></div>
        <div className="userprofile__followers__container__following"></div>
      </div>
    </div>
  );
};

export default Profile;
