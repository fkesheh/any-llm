"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.COHERE_LLM_LIST = void 0;
var _types = require("../util/types");
const COHERE_PLATFORM_LINK = 'https://docs.cohere.com/';

// Cohere Models (UPDATED 3/1624) -----------------------------
const COMMAND_LIGHT = {
  modelId: 'command-light',
  modelName: 'Command Light',
  provider: _types.ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4000,
  maxContextLength: 4000
};
const COMMAND_LIGHT_NIGHTLY = {
  modelId: 'command-light-nightly',
  modelName: 'Command Light Nightly',
  provider: _types.ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 8000,
  maxContextLength: 8000
};
const COMMAND = {
  modelId: 'command',
  modelName: 'Command',
  provider: _types.ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4000,
  maxContextLength: 4000
};
const COMMAND_NIGHTLY = {
  modelId: 'command-nightly',
  modelName: 'Command Nightly',
  provider: _types.ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 8000,
  maxContextLength: 8000
};
const COMMAND_R = {
  modelId: 'command-r',
  modelName: 'Command-R',
  provider: _types.ModelProvider.Cohere,
  platformLink: COHERE_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4000,
  maxContextLength: 128000
};
const COHERE_LLM_LIST = exports.COHERE_LLM_LIST = [COMMAND_LIGHT, COMMAND_LIGHT_NIGHTLY, COMMAND, COMMAND_NIGHTLY, COMMAND_R];