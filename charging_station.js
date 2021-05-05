import awsIot from "aws-iot-device-sdk";
import ChargingStationEvents from "./station/charging_station_events.js";
import { logPrefixMessage } from "./logging/console_logging_helper.js";
import { v4 as uuidv4 } from "uuid";

export default class ChargingStation {
  constructor({
    keyPath = "./certificates/private.pem.key",
    certPath = "./certificates/certificate.pem.crt",
    caPath = "./certificates/root.pem",
    clientId = uuidv4(),
    host = "",
  }) {
    Object.assign(this, {
      keyPath: keyPath,
      certPath: certPath,
      caPath: caPath,
      clientId: clientId,
      host: host,
    });
  }

  /**
   * @method connect
   * @description Connect to the Charging Station and set up events
   * @returns {awsIot.device} Device that established connection
   */
  connect() {
    Object.assign(this, {
      device: awsIot.device({
        keyPath: this.keyPath,
        certPath: this.certPath,
        caPath: this.caPath,
        clientId: this.clientId,
        host: this.host,
      }),
    });

    this.events = new ChargingStationEvents(this.device, this.clientId);
    this.events.prepareConnectEvent();
    this.events.prepareDisconnectEvent();
    this.events.prepareErrorEvent();

    return this.device;
  }

  /**
   * @method disconnect
   * @description Disconnect from the Charging Station
   */
  disconnect() {
    this.device?.end(false, () => logPrefixMessage(`Successfully disconnected client id: ${this.clientId}`));
  }
}
