var mqtt = require('mqtt');
var Gpio = require('onoff').Gpio;

var client  = mqtt.connect('wss://mqtt.wdaan.xyz')

const output1 = new Gpio(2, 'out');
const output2 = new Gpio(3, 'out');
const input1 = new Gpio(14, 'in', 'both', {debounceTimeout: 1000});
const input2 = new Gpio(15, 'in', 'both', {debounceTimeout: 1000});

client.on('connect', () => {
  client.subscribe('SET_OUTPUT', err => { 
      if(err) 
        console.log(err)
    });
  client.subscribe('GET_OUTPUT', err => {
    if(err)
      console.log(err)
    });
});

client.on('message', (topic, message) => {
    try{
        var data = JSON.parse(message);
        console.log(data);
    }
    catch {
        console.log(`message cannot be converted to JSON: ${message}`)
    }
    if(topic == "SET_OUTPUT") {
      switch(data["pin"])
      {
          case 2:
              output1.writeSync(data["state"]);
              console.log(`set output1/pin${data["pin"]} to ${data["state"]}`);
          break;
          case 3:
              output2.writeSync(data["state"]);
              console.log(`set output2/pin${data["pin"]} to ${data["state"]}`);
          break;
      }
    }
    else if(topic == "GET_OUTPUT"){
      client.publish('CHANGE_DETECTED', `{"pin": 2, "state": ${output1.readSync()}}`);
      client.publish('CHANGE_DETECTED', `{"pin": 3, "state": ${output2.readSync()}}`);
    }
})


input1.watch((err, value) => {
    client.publish('CHANGE_DETECTED', `{"pin": 14, "state": ${input1.readSync()}}`);
    console.log(`input1: ${input1.readSync()}`);
});

input2.watch((err, value) => {
    client.publish('CHANGE_DETECTED', `{"pin": 15, "state": ${input2.readSync()}}`);
    console.log(`input2: ${input2.readSync()}`);
});
