"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadApiKeyValuesFromEnvironment = void 0;
var _dotenv = _interopRequireDefault(require("dotenv"));
var _types = require("./types");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const loadApiKeyValuesFromEnvironment = () => {
  const loadedApiKeys = {};
  Object.values(_types.VALID_ENV_KEYS).forEach(key => {
    const value = process.env[key];
    if (value) {
      loadedApiKeys[key] = value;
    }
  });
  return loadedApiKeys;
};
exports.loadApiKeyValuesFromEnvironment = loadApiKeyValuesFromEnvironment;