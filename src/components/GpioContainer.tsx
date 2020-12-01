import { IonItem, IonLabel, IonList, IonToggle } from '@ionic/react';
import React, { useState } from 'react';
import { useGpio } from '../hooks/useGpio';
import './GpioContainer.css';

var mqtt    = require('mqtt');
var client  = mqtt.connect('wss://mqtt.wdaan.xyz');

// preciouschicken.com is the MQTT topic
client.on('connect', () => {
    client.subscribe('CHANGE_DETECTED');
});

interface ContainerProps { }

const GpioContainer: React.FC<ContainerProps> = () => {

  const { setGPIO, in1, in2, out1, out2 } = useGpio();

  return (
    <div className="container">
      <div className="">
        <strong>Outputs</strong>
        <IonList>
          <IonItem>
            <IonLabel>GPIO 2</IonLabel>
            <IonToggle title="gpio2" checked={out1 === 1} onIonChange={(e => setGPIO(2, e.detail.checked))}>GPIO 2</IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>GPIO 3</IonLabel>
            <IonToggle title="gpio3" checked={out2 === 1} onIonChange={(e => setGPIO(3, e.detail.checked))}>GPIO 3</IonToggle>
          </IonItem>
        </IonList>
      </div>
      <div className="">
        <strong>Inputs</strong>
        <IonList>
          <IonItem>
            <IonLabel>GPIO 14</IonLabel>
            <IonToggle title="gpio14" checked={in1 === 1} disabled>GPIO 14</IonToggle>
          </IonItem>
          <IonItem>
            <IonLabel>GPIO 15</IonLabel>
            <IonToggle title="gpio15" checked={in2 === 1} disabled>GPIO 15</IonToggle>
          </IonItem>
        </IonList>
      </div>
    </div>
  );
};

export default GpioContainer;
