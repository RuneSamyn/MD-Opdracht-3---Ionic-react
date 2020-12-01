import { useState } from "react";

var mqtt    = require('mqtt');
var client  = mqtt.connect('wss://mqtt.wdaan.xyz');

// preciouschicken.com is the MQTT topic
client.on('connect', () => {
    client.subscribe('CHANGE_DETECTED');
});

export function useGpio() {
    const [in1, setIn1] = useState<number>(0);
    const [in2, setIn2] = useState<number>(0);
    const [out1, setOut1] = useState<number>(0);
    const [out2, setOut2] = useState<number>(0);
    
    // ask for the state of the outputs
    client.publish("GET_OUTPUT", [2, 3].toString());

    client.on('message', (topic: string, message: string) => {
        try{
            var data = JSON.parse(message);
        }
        catch {
            console.log(`message cannot be converted to JSON: ${message}`)
        }
        if(topic === "CHANGE_DETECTED") {
            switch(data["pin"]) {
                case 2:
                    setOut1(data["state"]);
                break;
                case 3:
                    setOut2(data["state"]);
                break;
                case 14:
                    setIn1(data["state"]);
                break;
                case 15:
                    setIn2(data["state"]);
                break;
            }
        }
    });

    const setGPIO = (pin: number, state: boolean) => {
        client.publish("SET_OUTPUT", JSON.stringify({"pin": pin, "state": state ? 1 : 0}));
    };

    return {
        setGPIO,
        in1, in2, out1, out2
    };
}