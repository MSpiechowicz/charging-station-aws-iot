import validateTypes from "validate-types";
import { logPrefixMessage } from "../../logging/console_logging_helper.js";

/**
 * @method validatePayload
 * @description Validate the payload against the contract between the server and client
 * @param {*} contract
 * @param {*} payload
 * @param {*} log
 * @returns {boolean} True if the contract is fulfilled, False otherwise
 */
function validatePayload(contract, payload, log = false) {
  const result = validateTypes(contract, payload);

  if (result.hasErrors || result.hasUndeclaredFields) {
    if (log) {
      const violationPayload = JSON.stringify(payload);
      const violationReason = JSON.stringify(result.errors.length > 0 ? result.errors : result.undeclaredFields);

      logPrefixMessage("Violation of contract for payload: " + violationPayload);
      logPrefixMessage("Violation reason: " + violationReason);
    }

    return false;
  }

  return true;
}

export { validatePayload };
