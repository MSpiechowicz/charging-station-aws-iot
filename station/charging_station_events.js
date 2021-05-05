import { logPrefixMessage } from "../logging/console_logging_helper.js";

export default class ChargingStationEvents {
  constructor(device, clientId) {
    this.device = device;
    this.clientId = clientId;
  }

  prepareConnectEvent() {
    this.device?.on("connect", () => logPrefixMessage(`Successfully connected client: ${this.clientId}`));
  }

  prepareDisconnectEvent() {
    this.device?.on("disconnect", () => logPrefixMessage(`Successfully disconnected client: ${this.clientId}`));
  }

  prepareErrorEvent() {
    this.device?.on("error", (error) => logPrefixMessage(`Received error: ${error}`));
  }
}
