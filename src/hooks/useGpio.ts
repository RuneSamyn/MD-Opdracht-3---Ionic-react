import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';

var mqtt    = require('mqtt');
var client  = mqtt.connect('wss://mqtt.wdaan.xyz');

// preciouschicken.com is the MQTT topic
client.on('connect', () => {
    client.subscribe('CHANGE_DETECTED');
});

export function useGpio() {
    const [GPIOs, setGPIOs] = useState<{[pin: number]: number}>({14: 0, 15: 0});
    
    // ask for the state of the outputs
    client.publish("GET_OUTPUT", [2, 3].toString());

    client.on('message', (topic: string, message: string) => {
        try{
            var data = JSON.parse(message);
        }
        catch {
            console.log(`message cannot be converted to JSON: ${message}`)
        }
        if(topic == "CHANGE_DETECTED") {
            var newGPIOs = GPIOs;
            newGPIOs[data["pin"]] = data["state"];
            setGPIOs(newGPIOs);
        }
        console.log(GPIOs);
    });

    const setGPIO = (pin: number, state: boolean) => {
        client.publish("SET_OUTPUT", JSON.stringify({"pin": pin, "state": state ? 1 : 0}));
    };

    return {
        setGPIO,
        GPIOs
    };
}