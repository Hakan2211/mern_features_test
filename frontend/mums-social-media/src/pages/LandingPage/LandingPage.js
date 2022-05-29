import React, { useEffect, useState } from "react";
import "./landingPage.scss";
import Video from "../../assets/video/background_landing.mp4";
import FundaImage from "../../assets/img/LandingPage_Funda.png";

const LandingPage = () => {
  // const [video, setVideo] = useState(null);

  // useEffect(() => {
  //   setVideo(Video);
  // }, []);
  return (
    <div className="landing">
      <div className="landing__container">
        <div className="landing__container__video">
          <video id="video" autoPlay loop muted>
            <source src={Video} type="video/mp4" />
          </video>
        </div>
        <div className="landing__container__content">
          <div className="landing__container__content__text">
            <div className="landing__container__content__text__main">
              <div className="landing__container__content__text__main__title">
                Fundavoll
              </div>
              <div className="landing__container__content__text__main__one">
                Unsere soziale Plattform
              </div>
              <div className="landing__container__content__text__main__two">
                für unsere Projekte.
              </div>
              <div className="landing__container__content__text__main__three">
                Zeig, was Du machst.
              </div>
            </div>
          </div>
          <div className="landing__container__content__images">
            <div className="landing__container__content__images__container">
              <div className="landing__container__content__images__container__image">
                <img src={FundaImage} alt="funda" />
              </div>

              {/* <div className="landing__container__content__images__container__image">
                <img
                  classname="landing__container__content__images__container__image__image1"
                  src="https://images.pexels.com/photos/7507115/pexels-photo-7507115.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="landing__container__content__images__container__image">
                <img
                  classname="landing__container__content__images__container__image__image2"
                  src="https://images.pexels.com/photos/2762930/pexels-photo-2762930.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div>
              <div className="landing__container__content__images__container__image">
                <img
                  classname="landing__container__content__images__container__image__image3"
                  src="https://images.pexels.com/photos/159984/pexels-photo-159984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt=""
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
