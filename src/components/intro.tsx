import { IonButton, IonContent, IonHeader, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css'
import Intro1Img from '../assets/intro/intro-1.avif'
import Intro2Img from '../assets/intro/intro-2.jpg'
import Intro3Img from '../assets/intro/intro-3.jpg'

import './intro.css'
interface ContainerProps {
    onFinish: () => void;
}

const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper();
    return <IonButton onClick={() => swiper.slideNext()}>{children}</IonButton>
}

const Intro: React.FC<ContainerProps> = ({ onFinish }) => {
    return (
        <Swiper>
            <SwiperSlide>
                <img src={Intro1Img} alt='Intro 1' />
                <IonText>
                    <h2>Organize Your Day Effortlessly</h2>
                    <p>Manage all your tasks in one place and stay on top of what matters.</p>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={Intro2Img} alt='Intro 2' />
                <IonText>
                    <h2>Set Priorities and Deadlines</h2>
                    <p>Focus on what’s important by assigning priorities and due dates to your tasks.</p>
                </IonText>
                <SwiperButtonNext>Next</SwiperButtonNext>
            </SwiperSlide>

            <SwiperSlide>
                <img src={Intro3Img} alt='Intro 3' />
                <IonText>
                    <h3>Track Your Progress & Achieve Goals</h3>
                    <p>Visualize your accomplishments and stay motivated by checking off completed tasks.</p>
                </IonText>
                <IonButton onClick={() => onFinish()}>Finish</IonButton>
            </SwiperSlide>

        </Swiper>
    );
};

export default Intro;