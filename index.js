import awsIot from 'aws-iot-device-sdk';
import { v4 as uuidv4 } from 'uuid'

var device = awsIot.device({
  keyPath: "./certificates/private.pem.key",
  certPath: "./certificates/certificate.pem.crt",
  caPath: "./certificates/root.pem",
  clientId: uuidv4(),
  host: ""
});

device
  .on('connect', function () {
    console.log('connect');
    device.subscribe('topic_1');
    device.publish('topic_2', JSON.stringify({ test_data: 1 }));
  });

device
  .on('message', function (topic, payload) {
    console.log('message', topic, payload.toString());
  });