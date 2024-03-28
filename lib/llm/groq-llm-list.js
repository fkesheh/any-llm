"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GROQ_LLM_LIST = void 0;
var _types = require("../util/types");
const GROQ_PLATFORM_LINK = 'https://groq.com/';
const LLaMA2_70B = {
  modelId: 'llama2-70b-4096',
  modelName: 'LLaMA2-70b-chat',
  provider: _types.ModelProvider.Groq,
  platformLink: GROQ_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 4096
};
const MIXTRAL_8X7B = {
  modelId: 'mixtral-8x7b-32768',
  modelName: 'Mixtral-8x7b-Instruct-v0.1',
  provider: _types.ModelProvider.Groq,
  platformLink: GROQ_PLATFORM_LINK,
  imageInput: false,
  minTemperature: 0.0,
  maxTemperature: 1.0,
  maxTokenOutputLength: 4096,
  maxContextLength: 32768
};
const GROQ_LLM_LIST = exports.GROQ_LLM_LIST = [MIXTRAL_8X7B, LLaMA2_70B];