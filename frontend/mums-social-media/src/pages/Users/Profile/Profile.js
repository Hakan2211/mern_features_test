import React, { useEffect } from "react";
import "./profile.scss";
import { userProfileAction } from "../../../redux/slices/users/usersSlices";
import { useDispatch, useSelector } from "react-redux";
import DateFormmater from "../../../utils/DateFormatter";
import { Link, useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.users);
  const { profile, loading, appError, serverError } = user;

  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [dispatch, id]);
  return (
    <>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : appError || serverError ? (
          <h1>
            {serverError} - {appError}
          </h1>
        ) : (
          <div className="profile-page__container">
            <div className="profile-page__header">
              <div className="profile-page__header__info">
                <div className="profile-page__header__info__picture">
                  <img src={profile?.profilePicture} alt="profile_image" />
                </div>
                <div className="profile-page__header__info__name">
                  {profile?.name}
                </div>
                <div className="profile-page__header__info__joined">
                  Joined: <DateFormmater date={profile?.createdAt} />
                </div>
                <div className="profile-page__header__info__followers">
                  Followers:{profile?.followers.length}
                </div>
                <div className="profile-page__header__info__following">
                  Following:{profile?.following.length}
                </div>
                {profile?.isAccountVerified ? (
                  <span>Verified</span>
                ) : (
                  <span>Unverified</span>
                )}
              </div>
              <div className="profile-page__header__options">
                <div className="profile-page__header__options__list">
                  <ul className="profile-page__header__options__list__items">
                    <li>
                      <button>Follow</button>
                    </li>
                    <li>
                      <button>Unfollow</button>
                    </li>
                    <li>
                      <button>Send Message</button>
                    </li>
                    <li>
                      <Link to={`/upload-photo/${profile?._id}`}>
                        <button>Upload Photo</button>
                      </Link>
                    </li>
                    <li>
                      <Link to={`/update-profile/${profile?._id}`}>
                        <button>Update Profile</button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="profile-page__main">
              <div className="profile-page__main__posts">
                <h1>
                  {profile?.name}{" "}
                  {profile?.posts.length === 1
                    ? "Post"
                    : profile?.posts.length === 0
                    ? "No Post was found"
                    : "Posts"}
                </h1>
                {profile?.posts.map((post) => {
                  return (
                    <div className="profile-post__image__container">
                      <img src={post?.image} alt="" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
