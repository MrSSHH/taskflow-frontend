import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonIcon,
} from "@ionic/react";
import React, { useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { chevronForwardOutline, checkmarkOutline } from "ionicons/icons";
import "swiper/css";
import "swiper/css/pagination";
import Intro1Img from "../assets/intro/intro-1.avif";
import Intro2Img from "../assets/intro/intro-2.jpg";
import Intro3Img from "../assets/intro/intro-3.jpg";
import "./intro.css";

interface ContainerProps {
  onFinish: () => void;
}

const SwiperButtonNext = ({ children, isLast = false }: any) => {
  const swiper = useSwiper();
  return (
    <IonButton
      className={isLast ? "finish-button" : "next-button"}
      onClick={() => swiper.slideNext()}
      size="large"
      expand="block"
    >
      {children}
      <IonIcon
        icon={isLast ? checkmarkOutline : chevronForwardOutline}
        slot="end"
      />
    </IonButton>
  );
};

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <IonPage className="intro-page">
      <div className="intro-background"></div>

      <IonContent className="intro-content">
        <div className="intro-container">
          {/* Skip button */}
          <div className="skip-button-container">
            <IonButton
              fill="clear"
              size="small"
              color="medium"
              onClick={onFinish}
              className="skip-button"
            >
              Skip
            </IonButton>
          </div>

          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              bulletActiveClass: "swiper-pagination-bullet-active-custom",
              bulletClass: "swiper-pagination-bullet-custom",
            }}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            className="intro-swiper"
          >
            {/* Slide 1 */}
            <SwiperSlide className="intro-slide">
              <div className="slide-content">
                <div className="image-container">
                  <img
                    src={Intro1Img}
                    alt="Organize tasks"
                    className="intro-image"
                  />
                  <div className="image-overlay"></div>
                </div>

                <div className="text-content">
                  <div className="slide-number">1 of 3</div>
                  <h2 className="slide-title">
                    Organize Your Day Effortlessly
                  </h2>
                  <p className="slide-description">
                    Manage all your tasks in one place and stay on top of what
                    matters most to you.
                  </p>
                </div>

                <div className="button-container">
                  <SwiperButtonNext>Next</SwiperButtonNext>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide className="intro-slide">
              <div className="slide-content">
                <div className="image-container">
                  <img
                    src={Intro2Img}
                    alt="Set priorities"
                    className="intro-image"
                  />
                  <div className="image-overlay"></div>
                </div>

                <div className="text-content">
                  <div className="slide-number">2 of 3</div>
                  <h2 className="slide-title">Set Priorities and Deadlines</h2>
                  <p className="slide-description">
                    Focus on what's important by assigning priorities and due
                    dates to your tasks.
                  </p>
                </div>

                <div className="button-container">
                  <SwiperButtonNext>Next</SwiperButtonNext>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide className="intro-slide">
              <div className="slide-content">
                <div className="image-container">
                  <img
                    src={Intro3Img}
                    alt="Track progress"
                    className="intro-image"
                  />
                  <div className="image-overlay"></div>
                </div>

                <div className="text-content">
                  <div className="slide-number">3 of 3</div>
                  <h2 className="slide-title">
                    Track Your Progress & Achieve Goals
                  </h2>
                  <p className="slide-description">
                    Visualize your accomplishments and stay motivated by
                    checking off completed tasks.
                  </p>
                </div>

                <div className="button-container">
                  <IonButton
                    className="finish-button"
                    onClick={onFinish}
                    size="large"
                    expand="block"
                  >
                    Get Started
                    <IonIcon icon={checkmarkOutline} slot="end" />
                  </IonButton>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Intro;
