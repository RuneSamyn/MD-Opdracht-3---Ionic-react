import { IonItem, IonLabel, IonList, IonToggle } from '@ionic/react';
import React from 'react';
import { useGpio } from '../hooks/useGpio';
import './GpioContainer.css';

interface ContainerProps { }

const GpioContainer: React.FC<ContainerProps> = () => {

  const { setGPIO, GPIOs } = useGpio();

  return (
    <div className="container">
      <div className="">
        <strong>Outputs</strong>
        <IonList>
          <IonItem>
            <IonLabel>GPIO 2</IonLabel>
            <IonToggle title="gpio2" checked={GPIOs[2] == 1} onIonChange={(e => setGPIO(2, e.detail.checked))}>GPIO 2</IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>GPIO 3</IonLabel>
            <IonToggle title="gpio3" checked={GPIOs[3] == 1} onIonChange={(e => setGPIO(3, e.detail.checked))}>GPIO 3</IonToggle>
          </IonItem>
        </IonList>
      </div>
      <div className="">
        <strong>Inputs</strong>
        <IonList>
          <IonItem>
            <IonLabel>GPIO 14</IonLabel>
            <IonToggle title="gpio14" checked={GPIOs[14] == 1} disabled>GPIO 14</IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>GPIO 15</IonLabel>
            <IonToggle title="gpio15" checked={GPIOs[15] == 1} disabled>GPIO 15</IonToggle>
          </IonItem>
        </IonList>
      </div>
    </div>
  );
};

export default GpioContainer;
