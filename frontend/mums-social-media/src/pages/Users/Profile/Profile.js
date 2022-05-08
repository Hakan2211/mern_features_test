import React from "react";
import "./profile.scss";
const Profile = () => {
  return (
    <div className="profile-page__container">
      <div className="profile-page__header">
        <div className="profile-page__header__info">
          <div className="profile-page__header__info__picture">
            <img
              src="https://cdn.pixabay.com/photo/2021/06/15/16/11/man-6339003_960_720.jpg"
              alt="profile_image"
            />
          </div>
          <div className="profile-page__header__info__name">John</div>
          <div className="profile-page__header__info__joined">
            Joined: 24 May 2022
          </div>
          <div className="profile-page__header__info__followers">
            Followers:510
          </div>
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
            </ul>
          </div>
        </div>
      </div>
      <div className="profile-page__main">
        <div className="profile-page__main__posts">Posts</div>
      </div>
    </div>
  );
};

export default Profile;
