import { validatePayload } from "../payload/validator/payload_validator.js";
import { logPrefixMessage } from "../logging/console_logging_helper.js";

export default class ChargingStationCommands {
  constructor(device) {
    this.device = device;
  }

  /**
   * @method publish
   * @description Publish the payload to the charging station with proper contract structure
   * @param {*} object Contains information about topic, payload data and contract
   * @param {*} callback Function that use single parameter payload
   */
  async publish({ topic = "", payload = { message: "" }, contract = { message: String } }, callback = undefined) {
    if (validatePayload(contract, payload, true)) {
      this.device.publish(topic, JSON.stringify(payload));
    }

    if (callback && typeof callback === "function") {
      callback(payload);
    }
  }

  /**
   * @method subscribe
   * @description Subscribe to the provided topic
   * @param {*} object Contains information about topic and contract
   * @param {*} callback Function that use single parameter payload
   */
  async subscribe({ topic = "", contract = { message: String } }, callback = undefined) {
    this.device.subscribe(topic);

    this.device?.on("message", (messageTopic, messageData) => {
      try {
        const payload = JSON.parse(messageData);

        if (
          validatePayload(contract, payload, true) &&
          topic === messageTopic &&
          callback &&
          typeof callback === "function"
        ) {
          callback(payload);
        }
      } catch (error) {
        logPrefixMessage(`Unable to parse payload data. ${error}`);
      }
    });
  }

  /**
   * @method unsubscribe
   * @description Unsubscribe to the provided topic
   * @param {*} object Contains topic to unsubscribe
   * @param {*} callback Function
   */
  async unsubscribe({ topic = "" }, callback = undefined) {
    this.device.unsubscribe(topic);

    if (callback && typeof callback === "function") {
      callback();
    }
  }
}
