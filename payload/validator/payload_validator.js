import validateTypes from "validate-types";
import { logPrefixMessage } from "../../logging/console_logging_helper.js";

/**
 * @method validatePayload
 * @description Validate the payload against the contract between the server and client
 * @param {*} contract
 * @param {*} payload
 * @param {*} log Console log information about contract violation
 * @returns {boolean} True if the contract is fulfilled, False otherwise
 */
function validatePayload(contract, payload, log = false) {
  const result = validateTypes(contract, payload);

  if (result.hasErrors || result.hasUndeclaredFields) {
    if (log) {
      logPrefixMessage(`Violation of contract for payload: ${payload}`);
    }
    
    return false;
  }

  return true;
}

export { validatePayload };
