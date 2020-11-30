import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import GpioContainer from '../components/GpioContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GPIO controller</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <GpioContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
